import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import { createRepository, validateDraft } from '../core/repository.ts';
import { ConflictError, MAX_CONTENT, matchedProfile, type Profile } from '../core/types.ts';
import { explainError, hostFiles } from '../platform/host-files.ts';
import { mountView, type Action, type Draft, type State } from './view.ts';
import native from '../../ui/native.css';
import layout from './styles/layout.css';
import components from './styles/components.css';

const style = document.createElement('style'); style.textContent = native + layout + components; document.head.append(style);
const host = connectHost({ requestTimeoutMs: 20_000 }); const repo = createRepository(hostFiles(host));
const state: State = { loaded: null, draft: { name: '', content: '' }, dirty: false, busy: false, tab: 'profiles', showArchived: false, review: null, reviewInvalid: false, pending: false, backups: [], backup: null, message: '', tone: 'info' };
let baseline: Draft = { ...state.draft }; let pending: (() => void) | null = null; let initialized = false;
const render = () => view.render(state);
const notice = (message: string, tone: State['tone'] = 'info') => { state.message = message; state.tone = tone; };
const useDraft = (draft: Draft, isNew = false) => {
  state.draft = { ...draft }; baseline = isNew ? { name: '', content: '' } : { ...draft };
  state.dirty = isNew; state.review = null; state.tab = 'profiles'; notice(''); render();
};
const run = async (work: () => Promise<void>) => {
  if (state.busy) return;
  state.busy = true; notice(''); render();
  try { await work(); } catch (error) {
    notice(explainError(error), 'error');
    if (error instanceof ConflictError && state.review) state.reviewInvalid = true;
  } finally { state.busy = false; render(); }
};
const guard = (work: () => void) => {
  if (state.busy || state.pending) return;
  if (!state.dirty) work(); else { pending = work; state.pending = true; render(); }
};
const save = async () => {
  if (!state.loaded) return;
  state.loaded = await repo.save(state.loaded, state.draft);
  const saved = state.loaded.library.profiles.find(item => item.id === state.draft.id) ?? state.loaded.library.profiles.at(-1)!;
  state.draft = { id: saved.id, name: saved.name, content: saved.content }; baseline = { ...state.draft }; state.dirty = false;
  notice('Profile saved. The global file was not changed.', 'success');
};
const refresh = async () => {
  const keepDraft = state.dirty;
  try { state.loaded = await repo.load(true); }
  catch (error) {
    if (state.review) state.reviewInvalid = true;
    if (state.loaded) throw new Error(`${explainError(error)} Still showing the last read result.${keepDraft ? ' Your unsaved draft has been kept.' : ''}`, { cause: error });
    throw error;
  }
  if (!keepDraft) {
    const selected = state.loaded.library.profiles.find(item => item.id === state.draft.id) ?? matchedProfile(state.loaded) ?? state.loaded.library.profiles.find(item => !item.archived);
    if (selected) { if (selected.archived) state.showArchived = true; useDraft(selected); }
    else useDraft({ name: '', content: '' });
  }
  state.review = null; state.reviewInvalid = false;
  state.backups = await repo.listBackups();
  notice(keepDraft ? 'Disk state refreshed. Your draft has been kept. Saving will use the refreshed profile library.' : 'Global file and profile library loaded.', 'info');
};
const select = (id: string) => guard(() => { const profile = state.loaded?.library.profiles.find(item => item.id === id); if (profile) useDraft(profile); });
const actions: Record<Action, () => void> = {
  refresh: () => { void run(refresh); },
  new: () => guard(() => { useDraft({ name: 'New profile', content: '' }, true); view.focusName(); }),
  copy: () => guard(() => { useDraft({ name: `${state.draft.name.slice(0, 55)} Copy`, content: state.draft.content }, true); view.focusName(); }),
  import: () => guard(() => view.pickFile()),
  save: () => { void run(save); },
  preview: () => { void run(async () => { if (!state.loaded || !state.draft.id || state.dirty) return; state.review = await repo.reviewProfile(state.loaded, state.draft.id); state.reviewInvalid = false; }); },
  export: () => { void run(async () => { const profile = state.loaded?.library.profiles.find(item => item.id === state.draft.id); if (profile) notice(`Exported on the connected server: ${await repo.exportProfile(profile)}`, 'success'); }); },
  archive: () => { void run(async () => { const profile = state.loaded?.library.profiles.find(item => item.id === state.draft.id); if (!state.loaded || !profile) return; state.loaded = await repo.archive(state.loaded, profile.id, !profile.archived); state.showArchived = true; notice(profile.archived ? 'Profile unarchived.' : 'Profile archived. You can unarchive it at any time.', 'success'); }); },
  archives: () => guard(() => { state.showArchived = !state.showArchived; if (!state.showArchived && state.loaded?.library.profiles.find(item => item.id === state.draft.id)?.archived) { const next = state.loaded.library.profiles.find(item => !item.archived); useDraft(next ?? { name: '', content: '' }); } render(); }),
  guardSave: () => { void run(async () => { await save(); const next = pending; pending = null; state.pending = false; next?.(); }); },
  guardDiscard: () => { state.draft = { ...baseline }; state.dirty = false; const next = pending; pending = null; state.pending = false; next?.(); render(); },
  guardCancel: () => { pending = null; state.pending = false; render(); },
  back: () => { state.review = null; state.reviewInvalid = false; notice(''); render(); },
  apply: () => { void run(async () => {
    if (!state.loaded || !state.review || state.reviewInvalid) return;
    try {
      const result = await repo.apply(state.loaded, state.review); state.loaded.global = result.global; state.review = null;
      notice(result.backup ? 'Global file updated. Original content backed up. Confirm rule loading in a new session.' : 'Global file confirmed. Check rule loading in a new session.', 'success');
      try { state.backups = await repo.listBackups(); } catch { notice('Global file updated, but the backup list could not be read. Click Refresh.', 'warning'); }
    } catch (error) {
      // A timeout can occur after a successful write. Never encourage a blind retry.
      state.reviewInvalid = true;
      try { state.loaded.global = await repo.readGlobal(); } catch { /* Keep last observed state; error remains visible. */ }
      throw error;
    }
  }); },
  restore: () => { void run(async () => { if (state.backup) { state.review = await repo.reviewBackup(state.backup.id); state.reviewInvalid = false; } }); },
};
const view = mountView(document.querySelector<HTMLElement>('#root')!, {
  action: action => { if (!state.busy) actions[action](); },
  change: (field, value) => { state.draft[field] = value; state.dirty = state.draft.name !== baseline.name || state.draft.content !== baseline.content; render(); },
  select,
  tab: id => { if (state.busy || state.pending) return; state.tab = id === 'backups' ? 'backups' : 'profiles'; render(); if (id === 'backups') void run(async () => { state.backups = await repo.listBackups(); }); },
  backup: id => { void run(async () => { state.backup = await repo.readBackup(id); }); },
  file: file => { void run(async () => {
    if (file.size > MAX_CONTENT * 4) throw new Error('The import file is too large. Use a rules file with no more than 100,000 characters.');
    const content = await file.text(); const name = file.name.replace(/\.(md|txt)$/i, '').slice(0, 60) || 'Imported profile'; validateDraft(name, content);
    useDraft({ name, content }, true); notice('Imported as a draft. Save it to preview activation.');
  }); },
});
document.addEventListener('keydown', event => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') { event.preventDefault(); if (state.dirty && !state.pending && !state.review) actions.save(); } });
window.addEventListener('beforeunload', event => { if (state.dirty) { event.preventDefault(); event.returnValue = ''; } });
host.onReady(context => { applyHostReady(context, document.documentElement); if (!initialized) { initialized = true; void run(refresh); } });
render();
