import { getKartariYog } from "./yogas/getKartariYog";
export function getPlanetStatus(index, planets) {
  // console.log(planets[index]);
  // planet houses -------------------------------
  const sunHouse = planets[0].rashi;
  const moonHouse = planets[1].rashi;
  const marsHouse = planets[2].rashi;
  const mercuryHouse = planets[3].rashi;
  const jupiterHouse = planets[4].rashi;
  const venusHouse = planets[5].rashi;
  const saturnHouse = planets[6].rashi;
  const rahuHouse = planets[7].rashi;
  const ketuHouse = planets[8].rashi;
  // Planet Drushtis -----------------------------
  const sunDrushti = planets[0].drushtiOnRashi;
  const moonDrushti = planets[1].drushtiOnRashi;
  const marsDrushti = planets[2].drushtiOnRashi;
  const mercuryDrushti = planets[3].drushtiOnRashi;
  const jupiterDrushti = planets[4].drushtiOnRashi;
  const venusDrushti = planets[5].drushtiOnRashi;
  const saturnDrushti = planets[6].drushtiOnRashi;
  const rahuDrushti = planets[7].drushtiOnRashi;
  const ketuDrushti = planets[8].drushtiOnRashi;

  // find kartari yog ----------------------------
  // const previousRashi =
  //   planets[index].rashi - 1 === 0 ? 12 : planets[index].rashi - 1;
  // const nextRashi =
  //   planets[index].rashi + 1 === 0 ? 12 : planets[index].rashi + 1;
  const kartari = getKartariYog(planets[index], planets);

  // console.log(planets[index].name, previousRashi, nextRashi);

  // console.log(saturnHouse, rahuHouse, ketuHouse);
  let yutis = [];
  //drusti on planet 05
  let drushti = [];

  // yutis ----------------------------------------------------------
  if (planets[index].name !== "Sun" && planets[index].rashi === sunHouse)
    yutis.push("Sun");
  if (planets[index].name !== "Moon" && planets[index].rashi === moonHouse)
    yutis.push("Moon");
  if (planets[index].name !== "Mars" && planets[index].rashi === marsHouse)
    yutis.push("Mars");
  if (
    planets[index].name !== "Mercury" &&
    planets[index].rashi === mercuryHouse
  )
    yutis.push("Mercury");
  if (
    planets[index].name !== "Jupiter" &&
    planets[index].rashi === jupiterHouse
  )
    yutis.push("Jupiter");
  if (planets[index].name !== "Venus" && planets[index].rashi === venusHouse)
    yutis.push("Venus");
  if (planets[index].name !== "Saturn" && planets[index].rashi === saturnHouse)
    yutis.push("Saturn");
  if (planets[index].name !== "Rahu" && planets[index].rashi === rahuHouse)
    yutis.push("Rahu");
  if (planets[index].name !== "Ketu" && planets[index].rashi === ketuHouse)
    yutis.push("Ketu");

  // drustis --------------------------------------------
  if (sunDrushti.includes(planets[index].rashi)) drushti.push("Sun");
  if (moonDrushti.includes(planets[index].rashi)) drushti.push("Moon");
  if (marsDrushti.includes(planets[index].rashi)) drushti.push("Mars");
  if (mercuryDrushti.includes(planets[index].rashi)) drushti.push("Mercury");
  if (jupiterDrushti.includes(planets[index].rashi)) drushti.push("Jupiter");
  if (venusDrushti.includes(planets[index].rashi)) drushti.push("Venus");
  if (saturnDrushti.includes(planets[index].rashi)) drushti.push("Saturn");
  if (
    planets[index].name !== "Ketu" &&
    rahuDrushti.includes(planets[index].rashi)
  )
    drushti.push("Rahu");
  if (
    planets[index].name !== "Rahu" &&
    ketuDrushti.includes(planets[index].rashi)
  )
    drushti.push("Ketu");

  // console.log(planets[index].name, "Yuti", yutis);
  // console.log(planets[index].name, "Drushti", drushti);
  let krur = ["Saturn", "Rahu", "Ketu"];
  let stat = "clean";
  krur.map((k, i) => {
    if (yutis.includes(k) || drushti.includes(k)) stat = "affected";
  });
  // which rashi, which nackshatra, which house, which bhav, what avastha, yuti, drushti, dignity, retro, combust
  // console.log(planets[index].name, "Drushti", drushti, stat);
  return { ...planets[index], yutis, drushti, stat, kartari };
}
