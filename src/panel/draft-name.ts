export const truncateName = (name: string, limit: number): string => name.slice(0, limit).replace(/[\uD800-\uDBFF]$/, '');

export const uniqueDraftName = (base: string, names: string[], fallback: string): string => {
  const existing = new Set(names);
  const trimmed = truncateName(base.trim(), 60).trimEnd() || fallback;
  if (!existing.has(trimmed)) return trimmed;
  for (let index = 2; index <= 99; index += 1) {
    const suffix = ` ${index}`;
    const candidate = `${truncateName(trimmed, 60 - suffix.length)}${suffix}`;
    if (!existing.has(candidate)) return candidate;
  }
  return trimmed;
};
