import test from 'node:test';
import assert from 'node:assert/strict';
import { createI18n, languageOf } from '../src/shared/i18n.ts';

test('resolves Chinese locales to zh and everything else to en', () => {
  assert.equal(languageOf('zh-CN'), 'zh');
  assert.equal(languageOf('zh-TW'), 'zh');
  assert.equal(languageOf('en-US'), 'en');
  assert.equal(languageOf('ja-JP'), 'en');
  assert.equal(languageOf(null), 'en');
});

test('keeps Chinese source copy and switches to the English table', () => {
  const i18n = createI18n({ '刷新': 'Refresh', '已用 {percent}%': 'Used {percent}%' }, 'zh-CN');
  const { t } = i18n;
  assert.equal(t('刷新'), '刷新');
  assert.equal(t('已用 {percent}%', { percent: 42 }), '已用 42%');
  assert.equal(i18n.setLocale('en-US'), true);
  assert.equal(t('刷新'), 'Refresh');
  assert.equal(t('已用 {percent}%', { percent: 42 }), 'Used 42%');
  assert.equal(i18n.setLocale('en-GB'), false);
});

test('falls back to the Chinese source when a translation is missing', () => {
  const { t } = createI18n({}, 'en-US');
  assert.equal(t('未翻译的文案'), '未翻译的文案');
});
