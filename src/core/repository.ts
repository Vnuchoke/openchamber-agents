import { ConflictError, DATA_DIR, GLOBAL_PATH, LIBRARY_PATH, MAX_CONTENT, MAX_PROFILES, sameSnapshot, type Backup, type Files, type Library, type Loaded, type Profile, type Review, type Snapshot } from './types.ts';

const validId = (value: unknown): value is string => typeof value === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(value);
export const validateDraft = (name: string, content: string): void => {
  if (!name.trim() || name.trim().length > 60) throw new Error('Profile name must contain 1-60 characters.');
  if (content.length > MAX_CONTENT) throw new Error('Rules cannot exceed 100,000 characters.');
  if (content.includes('\0')) throw new Error('Use plain text rules without null bytes.');
};
export const parseLibrary = (raw: string): Library => {
  try {
    const data = JSON.parse(raw) as Library;
    if (data.version !== 1 || !Array.isArray(data.profiles) || data.profiles.length > MAX_PROFILES) throw new Error();
    const ids = new Set<string>();
    for (const profile of data.profiles) {
      if (!profile || !validId(profile.id) || ids.has(profile.id) || typeof profile.name !== 'string' || typeof profile.content !== 'string' || typeof profile.archived !== 'boolean' || !Number.isFinite(profile.createdAt) || !Number.isFinite(profile.updatedAt)) throw new Error();
      validateDraft(profile.name, profile.content);
      ids.add(profile.id);
    }
    return data;
  } catch { throw new Error('Invalid profile library. The existing file was not changed. Repair library.json or restore its backup first.'); }
};
const sameRaw = async (files: Files, expected: string | null): Promise<void> => {
  if (await files.read(LIBRARY_PATH) !== expected) throw new ConflictError('Another window changed the profile library. Refresh first; your current draft will be kept.');
};
export const createRepository = (files: Files, now = Date.now, uuid: () => string = () => crypto.randomUUID()) => {
  const readGlobal = async (): Promise<Snapshot> => {
    const content = await files.read(GLOBAL_PATH);
    return { exists: content !== null, content: content ?? '' };
  };
  const writeLibrary = async (library: Library, expected: string | null): Promise<string> => {
    const raw = JSON.stringify(library, null, 2);
    if (raw.length > 1_500_000) throw new Error('The profile library has reached its size limit. Export and reduce its contents first.');
    await sameRaw(files, expected);
    await files.write(LIBRARY_PATH, raw);
    if (await files.read(LIBRARY_PATH) !== raw) throw new ConflictError('The profile library changed again after saving. Refresh; do not overwrite it again.');
    return raw;
  };
  const load = async (initialize = false): Promise<Loaded> => {
    const [raw, global] = await Promise.all([files.read(LIBRARY_PATH), readGlobal()]);
    if (raw !== null) return { raw, library: parseLibrary(raw), global };
    const library: Library = { version: 1, profiles: [] };
    if (initialize && global.exists) {
      validateDraft('Existing global rules', global.content);
      const stamp = now();
      library.profiles.push({ id: uuid(), name: 'Existing global rules', content: global.content, archived: false, createdAt: stamp, updatedAt: stamp });
    }
    return { raw: initialize ? await writeLibrary(library, null) : null, library, global };
  };
  const save = async (loaded: Loaded, draft: { id?: string; name: string; content: string }): Promise<Loaded> => {
    validateDraft(draft.name, draft.content);
    const library = structuredClone(loaded.library);
    const existing = draft.id ? library.profiles.find(profile => profile.id === draft.id) : undefined;
    if (draft.id && !existing) throw new ConflictError('This profile is no longer in the library. Refresh first.');
    if (existing?.archived) throw new Error('Unarchive this profile before editing.');
    if (library.profiles.some(profile => profile.id !== draft.id && profile.name === draft.name.trim())) throw new Error('A profile with the same name already exists. Choose a different name.');
    if (existing) Object.assign(existing, { name: draft.name.trim(), content: draft.content, updatedAt: now() });
    else {
      if (library.profiles.length >= MAX_PROFILES) throw new Error('You can save up to 100 profiles, including archived profiles.');
      library.profiles.push({ id: uuid(), name: draft.name.trim(), content: draft.content, createdAt: now(), updatedAt: now(), archived: false });
    }
    const raw = await writeLibrary(library, loaded.raw);
    return { library, raw, global: loaded.global };
  };
  const archive = async (loaded: Loaded, id: string, archived: boolean): Promise<Loaded> => {
    const library = structuredClone(loaded.library);
    const profile = library.profiles.find(item => item.id === id);
    if (!profile) throw new ConflictError('This profile no longer exists. Refresh first.');
    const global = await readGlobal();
    if (archived && global.exists && profile.content === global.content) throw new Error('This profile matches the current global file. Activate another profile before archiving it.');
    profile.archived = archived;
    profile.updatedAt = now();
    return { library, raw: await writeLibrary(library, loaded.raw), global };
  };
  const reviewProfile = async (loaded: Loaded, id: string): Promise<Review> => {
    await sameRaw(files, loaded.raw);
    const profile = loaded.library.profiles.find(item => item.id === id && !item.archived);
    if (!profile) throw new Error('Select a saved, unarchived profile.');
    return { name: profile.name, content: profile.content, before: await readGlobal(), source: 'profile', profileId: profile.id };
  };
  const apply = async (loaded: Loaded, review: Review): Promise<{ global: Snapshot; backup: string | null }> => {
    if (review.source === 'profile') {
      await sameRaw(files, loaded.raw);
      const profile = loaded.library.profiles.find(item => item.id === review.profileId && !item.archived);
      if (!profile || profile.content !== review.content) throw new ConflictError('The profile changed. Preview it again.');
    }
    let current = await readGlobal();
    if (!sameSnapshot(current, review.before)) throw new ConflictError('The global file changed after preview. Nothing was written. Go back and preview the changes again.');
    if (current.exists && current.content === review.content) return { global: current, backup: null };
    let backup: string | null = null;
    if (current.exists) {
      const stamp = now();
      backup = `${stamp}-${uuid()}`;
      const item: Backup = { version: 1, id: backup, createdAt: stamp, label: `Before ${review.source === 'backup' ? 'restoring' : 'activating'} "${review.name}"`, content: current.content };
      const path = `${DATA_DIR}/backups/${backup}.json`;
      const raw = JSON.stringify(item, null, 2);
      // Backup failure or a changed file aborts before touching the global rules.
      await files.write(path, raw);
      if (await files.read(path) !== raw) throw new Error('Backup verification failed. The global file was not changed.');
    }
    if (review.source === 'profile') await sameRaw(files, loaded.raw);
    current = await readGlobal();
    if (!sameSnapshot(current, review.before)) throw new ConflictError('The global file changed before writing. Nothing was written. Preview again.');
    await files.write(GLOBAL_PATH, review.content);
    const result = await readGlobal();
    if (!result.exists || result.content !== review.content) throw new ConflictError('File content after writing does not match the profile. Another editor may have written concurrently. Refresh; the backup from before this change is still available.');
    return { global: result, backup };
  };
  const listBackups = async (): Promise<string[]> => (await files.list(`${DATA_DIR}/backups`)).filter(name => /^\d{13}-[a-f0-9-]{36}\.json$/.test(name)).sort().reverse().slice(0, 50).map(name => name.slice(0, -5));
  const readBackup = async (id: string): Promise<Backup> => {
    if (!/^\d{13}-[a-f0-9-]{36}$/.test(id)) throw new Error('Invalid backup ID.');
    const raw = await files.read(`${DATA_DIR}/backups/${id}.json`);
    try {
      const data = JSON.parse(raw ?? '') as Backup;
      if (data.version !== 1 || data.id !== id || !Number.isFinite(data.createdAt) || typeof data.label !== 'string' || typeof data.content !== 'string') throw new Error();
      return data;
    } catch { throw new Error('The backup is missing or invalid. The global file was not changed.'); }
  };
  const reviewBackup = async (id: string): Promise<Review> => {
    const backup = await readBackup(id);
    return { source: 'backup', name: new Date(backup.createdAt).toLocaleString('en-US'), content: backup.content, before: await readGlobal() };
  };
  const exportProfile = async (profile: Profile): Promise<string> => {
    if (!validId(profile.id)) throw new Error('Invalid profile ID.');
    const path = `${DATA_DIR}/exports/${profile.id}.md`;
    await files.write(path, profile.content);
    return path;
  };
  return { load, readGlobal, save, archive, reviewProfile, apply, listBackups, readBackup, reviewBackup, exportProfile };
};
export type Repository = ReturnType<typeof createRepository>;
