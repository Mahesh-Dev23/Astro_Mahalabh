const DOSHA = [
  [2, 12],
  [12, 2],
  [5, 9],
  [9, 5],
  [6, 8],
  [8, 6],
];

export function getBhakootScore(boy, girl) {
  for (const d of DOSHA) {
    if (d[0] === boy && d[1] === girl) {
      return 0;
    }
  }

  return 7;
}
