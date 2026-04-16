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

  const exh = lon % 30;
  const preRashi = Math.trunc(ex / 30); // for exhalted
  const deb = (ex + 180) % 360;
  const preDebRashi = Math.trunc(deb / 30); // for debilited
  const exhDegree = ex - preRashi * 30;

  // const diffEx = Math.abs(lon - ex);
  const diffEx = lon - preRashi * 30;
  // const diffDeb = Math.abs(lon - deb);
  const diffDeb = lon - preDebRashi * 30;

  // console.log(
  //   "debiliation",
  //   name,
  //   preDebRashi * 30,

  //   (preDebRashi + 1) * 30,
  //   lon,
  // );

  if (lon > preRashi * 30 && diffEx < exhDegree) return "Exalted";

  // if (diffDeb > 1) return "Debilitated";
  if (lon > preDebRashi * 30 && lon < (preDebRashi + 1) * 30)
    return "Debilitated";

  return "Normal";
}
