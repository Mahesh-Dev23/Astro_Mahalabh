export function getTaraScore(boyNak, girlNak) {
  const count = (girlNak - boyNak + 27) % 27;

  const tara = count % 9;

  if (tara === 0 || tara === 3 || tara === 5 || tara === 7) return 3;

  return 1.5;
}
