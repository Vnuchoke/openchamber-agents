import type { HostClient } from '@openchamber/sdk';
import { DATA_DIR, GLOBAL_PATH, LIBRARY_PATH, type Files } from '../core/types.ts';

const errorCode = (error: unknown): unknown => error && typeof error === 'object' && 'code' in error ? error.code : undefined;
type Operation = 'read' | 'write' | 'list';
const targetLabel = (path: string, operation: Operation): string => {
  if (path === GLOBAL_PATH) return 'global rules';
  if (path === LIBRARY_PATH) return 'profile library';
  if (path === `${DATA_DIR}/backups` && operation === 'list') return 'backup list';
  if (path.startsWith(`${DATA_DIR}/backups/`)) return 'backup file';
  if (path.startsWith(`${DATA_DIR}/exports/`)) return 'export file';
  return operation === 'list' ? 'file list' : 'file';
};
const hostErrorMessage = (error: unknown, nonLatinDirectory = false): string => {
  const code = errorCode(error);
  if (code === 'NOT_GRANTED') return 'In Settings → Extensions, allow AGENTS.md Manager to access its declared rules file and profile directory.';
  if (code === 'DENIED') return 'Insufficient file permissions. Check permissions on the rules file or profile directory.';
  if (code === 'HOST_TIMEOUT') return 'The host timed out. Refresh to confirm the actual file state before continuing.';
  if (code === 'BAD_PATH') return 'The target path is outside the granted scope, or a symbolic link points to another directory.';
  if (code === 'HOST_REJECTED') {
    const message = error instanceof Error ? error.message : '';
    // 2.4.0 puts the current directory into a Headers value before its try/catch,
    // including for global files. Only diagnose that case for its exact fallback.
    if (nonLatinDirectory && message === 'Extension operation failed.') {
      return 'The current directory contains characters outside Latin-1, triggering an OpenChamber file API compatibility issue. As a workaround, open AGENTS.md Manager from the right sidebar in a session without a project.';
    }
    if (!message || message === 'Extension operation failed.' || message === 'File operation failed.') {
      return 'The OpenChamber file API failed without a specific reason. Refresh; if it keeps failing, reload the panel.';
    }
  }
  return error instanceof Error ? error.message : 'The operation did not complete. Try again.';
};

export class FileOperationError extends Error {
  readonly code: unknown;
  constructor(operation: Operation, path: string, cause: unknown, nonLatinDirectory: boolean) {
    const action = operation === 'write' ? 'write' : 'read';
    super(`Failed to ${action} ${targetLabel(path, operation)}: ${hostErrorMessage(cause, nonLatinDirectory)}${operation === 'write' ? ' The write result is unconfirmed. Refresh to check the actual state. Do not repeat the write without checking.' : ''}`, { cause });
    this.name = 'FileOperationError';
    this.code = errorCode(cause);
  }
}

export const hostFiles = (host: HostClient): Files => {
  // Keep only the property needed for diagnostics; never log the directory or rules.
  let nonLatinDirectory = false;
  const updateDirectory = (directory: string | null) => { nonLatinDirectory = /[^\u0000-\u00ff]/.test(directory ?? ''); };
  host.onReady(context => updateDirectory(context.directory));
  host.onDirectory(updateDirectory);
  return {
    async read(path) {
      const directoryAtRequest = nonLatinDirectory;
      try { return (await host.readFile(path)).content; }
      catch (error) { if (errorCode(error) === 'NOT_FOUND') return null; throw new FileOperationError('read', path, error, directoryAtRequest); }
    },
    async write(path, content) {
      const directoryAtRequest = nonLatinDirectory;
      try { await host.writeFile(path, content); }
      catch (error) { throw new FileOperationError('write', path, error, directoryAtRequest); }
    },
    async list(path) {
      const directoryAtRequest = nonLatinDirectory;
      try { return (await host.listDir(path)).entries.filter(entry => entry.kind === 'file').map(entry => entry.name); }
      catch (error) { if (errorCode(error) === 'NOT_FOUND') return []; throw new FileOperationError('list', path, error, directoryAtRequest); }
    },
  };
};
export const explainError = (error: unknown): string => error instanceof FileOperationError ? error.message : hostErrorMessage(error);
