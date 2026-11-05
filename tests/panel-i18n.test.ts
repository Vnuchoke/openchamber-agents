import test from 'node:test';
import assert from 'node:assert/strict';

test('extension starts in en-US even when the browser is Chinese, retaining local English copy', async () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { language: 'zh-CN' } });
  try {
    const { i18n } = await import('../src/panel/i18n.ts');
    assert.equal(i18n.locale, 'en-US');
    for (const [source, english] of [
      ['规则方案', 'AGENTS.md Manager'], ['重新读取', 'Refresh'], ['复制', 'Copy'],
      ['确认启用', 'Confirm activation'], ['确认恢复', 'Confirm restore'],
      [' 副本', ' Copy'], ['未匹配已保存方案', 'No matching saved profile'],
      ['尚无全局规则文件', 'No global rules file'],
    ]) assert.equal(i18n.t(source), english);
    assert.equal(i18n.t('{action}：{name}', { action: 'Activate profile', name: '我的规则' }), 'Activate profile: 我的规则');
  } finally {
    if (original) Object.defineProperty(globalThis, 'navigator', original);
    else Reflect.deleteProperty(globalThis, 'navigator');
  }
});
