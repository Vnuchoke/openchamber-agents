import test from 'node:test';
import assert from 'node:assert/strict';
import { uniqueDraftName } from '../src/panel/draft-name.ts';

test('an imported name that truncates to a saved name plus whitespace gets a suffix', () => {
  const saved = '规'.repeat(59);
  assert.equal(uniqueDraftName(`${saved} 文`, [saved], 'New profile'), `${saved.slice(0, 58)} 2`);
});
