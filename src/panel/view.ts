import { mountButton, mountSelect, mountTabs, mountTextField, type ButtonHandle, type ButtonVariant } from '@openchamber/sdk/ui';
import { diffLines } from '../core/diff.ts';
import { GLOBAL_PATH, matchedProfile, type Backup, type Loaded, type Review } from '../core/types.ts';

export type Draft = { id?: string; name: string; content: string };
export type State = {
  loaded: Loaded | null; draft: Draft; dirty: boolean; busy: boolean; tab: 'profiles' | 'backups';
  showArchived: boolean; review: Review | null; reviewInvalid: boolean; pending: boolean;
  backups: string[]; backup: Backup | null; message: string; tone: 'info' | 'success' | 'error' | 'warning';
};
export type Action = 'refresh' | 'new' | 'copy' | 'import' | 'save' | 'preview' | 'export' | 'archive' | 'archives' | 'guardSave' | 'guardDiscard' | 'guardCancel' | 'back' | 'apply' | 'restore';
export const el = <K extends keyof HTMLElementTagNameMap>(tag: K, className = '', text?: string): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag); node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
export const currentLabel = (loaded: Loaded): string => matchedProfile(loaded)?.name ?? (loaded.global.exists ? (loaded.global.content ? 'No matching saved profile' : 'Global rules are empty') : 'No global rules file');

export const mountView = (root: HTMLElement, callbacks: {
  action: (action: Action) => void; change: (field: 'name' | 'content', value: string) => void;
  select: (id: string) => void; tab: (id: string) => void; backup: (id: string) => void; file: (file: File) => void;
}) => {
  const app = el('main', 'ext ag');
  const header = el('header', 'ag-header'); const heading = el('div', 'ag-heading');
  const status = el('div'); const title = el('h1', 'ag-title', 'Connecting to OpenChamber…');
  status.append(el('p', 'ext-muted', 'Current global file'), title);
  status.firstElementChild!.classList.add('ag-scope');
  const refreshSlot = el('div'); heading.append(status, refreshSlot);
  const tabsSlot = el('div', 'ag-tabs');
  header.append(heading, el('p', 'ext-muted ag-scope', 'Connected OpenCode · Global'), tabsSlot);
  const scroll = el('div', 'ag-scroll'); const message = el('p', 'ext-notice ag-message');
  message.setAttribute('role', 'status'); message.setAttribute('aria-live', 'polite');
  const guard = el('div', 'ag-guard ag-message'); guard.setAttribute('role', 'group'); guard.setAttribute('aria-label', 'Unsaved draft actions');
  guard.append(el('p', '', 'You have unsaved changes. How would you like to continue?'));
  const guardActions = el('div', 'ext-actions'); guard.append(guardActions);
  const profiles = el('section', 'ag-stack'); profiles.setAttribute('aria-label', 'Rule profile editor');
  const selectSlot = el('div'); const tools = el('div', 'ext-actions');
  const nameSlot = el('div', 'ag-field'); const editorSlot = el('div', 'ag-field ag-editor');
  const more = el('details', 'ag-details'); more.append(el('summary', '', 'Profile management'));
  const moreActions = el('div', 'ext-actions'); more.append(moreActions);
  const foot = el('footer', 'ag-footer'); const saveNote = el('p', 'ext-muted'); const saveActions = el('div', 'ext-actions'); foot.append(saveNote, saveActions);
  profiles.append(selectSlot, tools, nameSlot, editorSlot, more, foot);
  const backups = el('section', 'ag-stack'); backups.setAttribute('aria-label', 'Global rules backups');
  const backupSelectSlot = el('div'); const backupNote = el('p', 'ext-muted'); const backupText = el('pre', 'ag-preview'); backupText.tabIndex = 0; backupText.setAttribute('aria-label', 'Backup content');
  const backupActions = el('div', 'ext-actions'); backups.append(backupNote, backupSelectSlot, backupText, backupActions);
  const review = el('section', 'ag-stack'); review.setAttribute('aria-label', 'Activation changes preview');
  const reviewTitle = el('h2', 'ag-review-title'); reviewTitle.tabIndex = -1;
  const reviewNote = el('p', 'ext-notice'); const summary = el('p', 'ext-muted');
  const diff = el('div', 'ag-diff'); diff.tabIndex = 0; diff.setAttribute('aria-label', 'Rule changes: old line numbers on the left, new line numbers on the right');
  const reviewActions = el('div', 'ext-actions');
  review.append(reviewTitle, reviewNote, summary, diff, el('p', 'ext-muted', 'The current file is backed up before writing. OpenCode controls whether existing sessions reload rules. Confirm rule loading in a new session.'), reviewActions);
  const path = el('p', 'ext-muted ag-path', GLOBAL_PATH);
  scroll.append(message, guard, profiles, backups, review, path); app.append(header, scroll); root.append(app);
  const buttons = new Map<Action, ButtonHandle>();
  const button = (slot: HTMLElement, action: Action, label: string, variant: ButtonVariant = 'ghost') => {
    const handle = mountButton(slot, { label, size: 'sm', variant, onClick: () => callbacks.action(action) }); buttons.set(action, handle);
  };
  button(refreshSlot, 'refresh', 'Refresh'); button(tools, 'new', 'New'); button(tools, 'copy', 'Copy'); button(tools, 'import', 'Import');
  button(moreActions, 'export', 'Export file'); button(moreActions, 'archive', 'Archive'); button(moreActions, 'archives', 'Show archived');
  button(saveActions, 'save', 'Save profile', 'outline'); button(saveActions, 'preview', 'Preview activation', 'default');
  button(guardActions, 'guardSave', 'Save and continue', 'outline'); button(guardActions, 'guardDiscard', 'Discard changes'); button(guardActions, 'guardCancel', 'Keep editing');
  button(reviewActions, 'back', 'Back to editor', 'outline'); button(reviewActions, 'apply', 'Confirm activation', 'default');
  button(backupActions, 'restore', 'Preview restore', 'outline');
  const tabs = mountTabs(tabsSlot, { items: [{ id: 'profiles', label: 'Profiles' }, { id: 'backups', label: 'Backups' }], activeId: 'profiles', onChange: callbacks.tab });
  const select = mountSelect(selectSlot, { label: 'Rule profile', value: null, options: [], searchable: true, searchPlaceholder: 'Search profiles…', placeholder: 'New profile', onChange: callbacks.select });
  const name = mountTextField(nameSlot, { label: 'Profile name', value: '', placeholder: 'For example: Daily development', onChange: value => callbacks.change('name', value) });
  const editor = mountTextField(editorSlot, { label: 'Rules · Markdown', value: '', mono: true, multiline: true, rows: 12, placeholder: '# Development conventions\n\nWrite your global working rules here…', onChange: value => callbacks.change('content', value) });
  const backupSelect = mountSelect(backupSelectSlot, { label: 'Backup time', value: null, options: [], searchable: true, searchPlaceholder: 'Search times…', placeholder: 'Select a backup', onChange: callbacks.backup });
  const input = el('input'); input.type = 'file'; input.accept = '.md,.txt,text/plain,text/markdown'; input.hidden = true; app.append(input);
  input.addEventListener('change', () => { if (input.files?.[0]) callbacks.file(input.files[0]); input.value = ''; });
  // Associate kit notes explicitly; the kit's wrapping label provides the visible label.
  for (const [slot, id] of [[nameSlot, 'name-note'], [editorSlot, 'content-note']] as const) {
    slot.querySelector('.oc-sdk-field-note')!.id = id;
    slot.querySelector('input,textarea')!.setAttribute('aria-describedby', id);
  }
  nameSlot.querySelector('input')!.maxLength = 60;
  editorSlot.querySelector('textarea')!.spellcheck = false;
  let lastTab = 'profiles'; let lastReview: Review | null = null; let lastMessage = ''; let lastPending = false;
  const paintReview = (item: Review) => {
    const result = diffLines(item.before.content, item.content); diff.replaceChildren();
    reviewTitle.textContent = `${item.source === 'backup' ? 'Restore backup' : 'Activate profile'}: ${item.name}`;
    reviewNote.textContent = item.content === '' ? 'This will clear the contents of the global AGENTS.md.' : 'This will replace the connected OpenCode global AGENTS.md, affecting projects that share this file.';
    reviewNote.dataset.tone = item.content === '' ? 'warning' : 'info';
    summary.textContent = `Lines added: ${result.added} · Lines removed: ${result.removed}${result.coarse ? ' · Large changes shown as blocks' : ''}${item.before.content !== item.content && !result.added && !result.removed ? ' · Line endings only' : ''}${!item.before.exists ? ' · File will be created' : ''}`;
    if (item.before.exists && item.before.content === item.content) summary.textContent += ' · Identical content; no write needed';
    let shown = 0, skipped = 0;
    const gap = () => { if (skipped) { diff.append(el('p', 'ag-diff-gap', `${skipped} unchanged lines omitted`)); skipped = 0; } };
    for (let i = 0; i < result.lines.length; i++) {
      const line = result.lines[i];
      if (line.kind === 'same' && i > 2 && i < result.lines.length - 3 && result.lines.slice(Math.max(0, i - 3), i + 4).every(row => row.kind === 'same')) { skipped++; continue; }
      if (shown >= 400) { gap(); diff.append(el('p', 'ag-diff-gap', 'Preview limited to 400 lines. Further changes are not shown. Return to the editor or backup content to check the full text.')); break; }
      gap(); shown++;
      const row = el('div', 'ag-diff-line'); row.dataset.kind = line.kind;
      row.append(el('span', '', String(line.oldLine ?? '')), el('span', '', String(line.newLine ?? '')), el('span', '', line.kind === 'add' ? '+' : line.kind === 'remove' ? '−' : ' '), el('code', '', line.text)); diff.append(row);
    }
    gap(); if (!result.lines.length) diff.append(el('p', 'ag-diff-gap', 'File content is empty'));
  };
  return {
    pickFile: () => input.click(),
    focusName: () => nameSlot.querySelector('input')!.focus(),
    render(state: State) {
      const loaded = state.loaded; const selected = loaded?.library.profiles.find(item => item.id === state.draft.id);
      const archived = Boolean(selected?.archived); const blocked = state.busy || !loaded || state.pending;
      title.textContent = loaded ? currentLabel(loaded) : state.busy ? 'Reading rules…' : 'Rules not loaded';
      message.hidden = !state.message; message.textContent = state.message; message.dataset.tone = state.tone;
      guard.hidden = !state.pending;
      if ((state.message !== lastMessage && state.tone === 'error') || (state.pending && !lastPending)) scroll.scrollTop = 0;
      lastMessage = state.message; lastPending = state.pending;
      profiles.hidden = !loaded || Boolean(state.review) || state.tab !== 'profiles';
      backups.hidden = !loaded || Boolean(state.review) || state.tab !== 'backups';
      review.hidden = !state.review;
      tabsSlot.hidden = Boolean(state.review);
      if (state.tab !== lastTab) { tabs.update({ activeId: state.tab }); lastTab = state.tab; }
      select.update({ value: state.draft.id ?? null, disabled: blocked, options: (loaded?.library.profiles ?? []).filter(item => state.showArchived || !item.archived).map(item => ({ id: item.id, label: item.name, hint: item.archived ? 'Archived' : loaded?.global.exists && item.content === loaded.global.content ? 'Matches global file' : undefined })) });
      name.update({ value: state.draft.name, disabled: blocked || archived });
      editor.update({ value: state.draft.content, disabled: blocked || archived, helper: `Characters: ${state.draft.content.length.toLocaleString('en-US')} · Lines: ${state.draft.content ? state.draft.content.split('\n').length : 0}${state.dirty || !selected ? ' · Unsaved' : archived ? ' · Archived, read-only' : ' · Saved'}` });
      saveNote.textContent = state.dirty ? 'Saving only updates the library. Save to preview activation.' : archived ? 'Unarchive to edit and activate this profile.' : selected ? 'Selecting a profile does not change global rules.' : 'Write or import rules to save your first profile.';
      for (const handle of buttons.values()) handle.update({ disabled: blocked });
      buttons.get('refresh')!.update({ disabled: state.busy || state.pending, loading: state.busy && !loaded });
      for (const action of ['guardSave', 'guardDiscard', 'guardCancel'] as const) buttons.get(action)!.update({ disabled: state.busy });
      buttons.get('save')!.update({ disabled: blocked || archived || !state.dirty });
      buttons.get('preview')!.update({ disabled: blocked || archived || !selected || state.dirty });
      buttons.get('copy')!.update({ disabled: blocked || !state.draft.name });
      buttons.get('export')!.update({ disabled: blocked || !selected || state.dirty });
      buttons.get('archive')!.update({ label: archived ? 'Unarchive' : 'Archive', disabled: blocked || !selected || state.dirty });
      buttons.get('archives')!.update({ label: state.showArchived ? 'Hide archived' : 'Show archived' });
      backupSelect.update({ value: state.backup?.id ?? null, disabled: blocked, options: state.backups.map(id => ({ id, label: new Date(Number(id.split('-')[0])).toLocaleString('en-US'), hint: id.slice(-4) })) });
      backupNote.textContent = state.backups.length ? `Showing the latest ${state.backups.length} backups. The current file is also backed up before restoring.` : 'No backups yet. One is created when an existing global file is first replaced.';
      backupText.hidden = !state.backup;
      backupText.textContent = state.backup?.content ?? '';
      backupText.setAttribute('aria-label', state.backup?.label ?? 'Backup content');
      buttons.get('restore')!.update({ disabled: blocked || !state.backup });
      buttons.get('back')!.update({ label: state.review?.source === 'backup' ? 'Back to backups' : 'Back to editor', disabled: state.busy });
      buttons.get('apply')!.update({ label: state.review?.source === 'backup' ? 'Confirm restore' : 'Confirm activation', disabled: state.busy || state.reviewInvalid || !state.review || (state.review.before.exists && state.review.before.content === state.review.content), loading: state.busy && Boolean(state.review) });
      if (state.review !== lastReview) { lastReview = state.review; if (state.review) { paintReview(state.review); scroll.scrollTop = 0; reviewTitle.focus(); } }
    },
  };
};
