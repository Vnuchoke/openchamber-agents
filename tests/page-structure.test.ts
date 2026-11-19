import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

for (const [file, heading] of [
  ['panel/index.html', 'AGENTS.md Manager'],
  ['panel/section.html', 'Global Rules'],
  ['scripts/preview.html', 'AGENTS.md Manager · Synthetic data preview'],
]) {
  test(`${file} exposes its main landmark and page heading without JavaScript`, () => {
    const html = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
    assert.equal([...html.matchAll(/<main\b/g)].length, 1);
    assert.deepEqual([...html.matchAll(/<h1\b[^>]*>([^<]+)<\/h1>/g)].map(match => match[1]), [heading]);
  });
}
