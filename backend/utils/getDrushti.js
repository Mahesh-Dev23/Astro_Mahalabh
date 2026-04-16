export function getDrushti(planet, rashi) {
  let drushtis = [];
  drushtis = planet.drushti.map((d) =>
    (d + rashi) % 12 == 0 ? 12 : (d + rashi) % 12,
  );
  return drushtis;
}
