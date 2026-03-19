const EXALTATION = {
  Sun: 10,
  Moon: 33,
  Mars: 298,
  Mercury: 165,
  Jupiter: 95,
  Venus: 357,
  Saturn: 200,
};

export function getPlanetStatus(name, lon) {
  const ex = EXALTATION[name];

  if (!ex) return "Normal";

  const deb = (ex + 180) % 360;

  const diffEx = Math.abs(lon - ex);
  const diffDeb = Math.abs(lon - deb);

  if (diffEx < 1) return "Exalted";

  if (diffDeb < 1) return "Debilitated";

  return "Normal";
}
