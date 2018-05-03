export function formatDuration(duration: number): string {
  const s = Math.floor(duration / 1000) % 60;
  const m = Math.floor(duration / 1000 / 60) % 60;
  const h = Math.floor(duration / 1000 / 60 / 60);

  const seconds = s.toString().padStart(2, '0');
  const minutes = m.toString().padStart(2, '0');
  const hours = h.toString().padStart(2, '0');

  return `${hours}h ${minutes}m ${seconds}s`;
}

export function calculateQuota([hits, misses]: [number, number]):
  | number
  | null {
  const tries = hits + misses;
  return tries === 0 ? null : hits / tries;
}
