import test from 'node:test';
import assert from 'node:assert/strict';
import { currentLabel } from '../src/panel/view.ts';
import type { Loaded } from '../src/core/types.ts';

test('fallback statuses are English while saved profile names remain untouched', () => {
  const loaded: Loaded = { raw: null, library: { version: 1, profiles: [] }, global: { exists: false, content: '' } };
  assert.equal(currentLabel(loaded), 'No global rules file');
  loaded.global.exists = true;
  assert.equal(currentLabel(loaded), 'Global rules are empty');
  loaded.global.content = '规则';
  assert.equal(currentLabel(loaded), 'No matching saved profile');
  loaded.library.profiles.push({ id: 'fixture', name: '我的规则', content: '规则', createdAt: 0, updatedAt: 0, archived: false });
  assert.equal(currentLabel(loaded), '我的规则');
});
