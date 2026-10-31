import { connectHost } from '@openchamber/sdk';
import { applyHostReady, mountButton } from '@openchamber/sdk/ui';
import { createRepository } from '../core/repository.ts';
import { explainError, hostFiles } from '../platform/host-files.ts';
import { currentLabel, el } from './view.ts';
import native from '../../ui/native.css';
import layout from './styles/layout.css';
import components from './styles/components.css';
import { openManager } from '../../ui/navigation.ts';

const style = document.createElement('style'); style.textContent = native + layout + components; document.head.append(style);
const host = connectHost(); const repo = createRepository(hostFiles(host));
const app = el('section', 'ext ag-section'); const title = el('p', 'ag-status-value', 'Reading…');
title.setAttribute('role', 'status');
const row = el('div', 'ag-status-row'); row.append(el('span', 'ag-status-label', 'Current profile'), title);
const note = el('p', 'ext-muted', 'Global AGENTS.md'); const message = el('p', 'ext-notice');
note.title = 'Shows file state on the connected server, not whether existing sessions have loaded the rules.';
message.hidden = true; message.setAttribute('role', 'status');
const footer = el('div', 'ag-status-footer'); const actions = el('div', 'ext-actions');
footer.append(note, actions); app.append(row, footer, message); document.querySelector('#root')!.append(app);
let busy = false; let initialized = false;
const refresh = async () => {
  if (busy) return; busy = true; button.update({ loading: true });
  try { title.textContent = currentLabel(await repo.load(false)); title.title = title.textContent; note.textContent = `Read at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`; message.hidden = true; }
  catch (error) { title.textContent = 'Not read'; note.textContent = 'Global AGENTS.md'; message.textContent = explainError(error); message.dataset.tone = 'error'; message.hidden = false; }
  finally { busy = false; button.update({ loading: false }); }
};
const button = mountButton(actions, { label: 'Refresh', size: 'sm', variant: 'ghost', onClick: () => { void refresh(); } });
mountButton(actions, { label: 'Manage', size: 'sm', variant: 'ghost', onClick: () => {
  void openManager(host, { id: 'agents-manager', name: 'AGENTS.md Manager' }).catch(error => {
    message.hidden = false; message.dataset.tone = 'error'; message.textContent = explainError(error);
  });
} });
actions.lastElementChild!.setAttribute('aria-label', 'Manage rule profiles');
new ResizeObserver(() => { void host.setHeight(Math.ceil(app.getBoundingClientRect().height)).catch(() => {}); }).observe(app);
host.onReady(context => { applyHostReady(context, document.documentElement); if (!initialized) { initialized = true; void refresh(); } });
