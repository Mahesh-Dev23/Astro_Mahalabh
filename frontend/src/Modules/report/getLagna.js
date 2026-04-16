import { rashiLords } from "../../constant/names.js";

export function getLagna(data) {
  const planets = data.planets;
  const hName = [
    "First",
    "Second",
    "Third",
    "Forth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Nineth",
    "Tenth",
    "Eleventh",
    "Twelth",
  ];
  // console.log("sun");
  // sun condition
  let sun = "";
  let sunYUti = [];
  let sunDrushti = [];
  const sunRashi = planets[0].houseNumber;

  sun = sun.dignity === "Debilitated" ? `${sun} Sun is debilitated.` : "";

  sunRashi === planets[6].houseNumber && sunYUti.push(planets[6].name);
  sunRashi === planets[7].houseNumber && sunYUti.push(planets[7].name);
  sunRashi === planets[8].houseNumber && sunYUti.push(planets[8].name);

  sun = sunYUti.length > 0 ? `${sun} Sun yuti with ${sunYUti.join()}.` : "";

  planets[6].drushtiOnHouse.includes(sunRashi) &&
    sunDrushti.push(planets[6].name);
  planets[7].drushtiOnHouse.includes(sunRashi) &&
    sunDrushti.push(planets[7].name);
  planets[8].drushtiOnHouse.includes(sunRashi) &&
    sunDrushti.push(planets[8].name);

  sun =
    sunDrushti.length != 0 ? `${sun} ${sunDrushti.join()} drushti on Sun.` : "";

  // Lagna Star
  const lagnaStar = rashiLords[data.lagna - 1];

  const planetIndex = [
    "Sun",
    "Moon",
    "Mars",
    "Mercury",
    "Jupiter",
    "Venus",
    "Saturn",
  ];
  let drushtiOnLagnastar = [];

  let lagnastarHouse = "";
  if (
    planetIndex !== 6 &&
    planets[6].drushtiOnHouse.includes(
      planets[planetIndex.indexOf(lagnaStar)].houseNumber,
    )
  )
    drushtiOnLagnastar.push(planets[6].name);

  if (
    planets[7].drushtiOnHouse.includes(
      planets[planetIndex.indexOf(lagnaStar)].houseNumber,
    )
  )
    drushtiOnLagnastar.push(planets[7].name);
  if (
    planets[8].drushtiOnHouse.includes(
      planets[planetIndex.indexOf(lagnaStar)].houseNumber,
    )
  )
    drushtiOnLagnastar.push(planets[8].name);
  let lagnaStarStat = "";
  lagnaStarStat =
    drushtiOnLagnastar.length > 0
      ? `${drushtiOnLagnastar.join(" ")} has drushti on Lagna Lord ${lagnaStar}.`
      : "";
  lagnaStarStat =
    planets[planetIndex.indexOf(lagnaStar)]?.houseName === "Trik" &&
    `${lagnaStarStat} Lagna lord is in ${hName[planets[planetIndex.indexOf(lagnaStar)]?.houseNumber - 1]} house.`;
  // Lagna drusti of for weak lagna
  let lagnaDrushti = [];
  if (planets[6].drushtiOnHouse.includes(data.lagna))
    lagnaDrushti.push(planets[6].name);
  if (planets[7].drushtiOnHouse.includes(data.lagna))
    lagnaDrushti.push(planets[7].name);
  if (planets[8].drushtiOnHouse.includes(data.lagna))
    lagnaDrushti.push(planets[8].name);
  let weakLagna =
    lagnaDrushti.length > 0
      ? `${lagnaDrushti.join(" ")} has drushti on Lagna.`
      : "";

  // Lagna Star Yuti
  let lagnaSYuti = [];
  if (
    lagnaStar !== "Saturn" &&
    planets[6].houseNumber ===
      planets[planetIndex.indexOf(lagnaStar)].houseNumber
  )
    lagnaSYuti.push(planets[6].name);
  if (
    planets[7].houseNumber ===
    planets[planetIndex.indexOf(lagnaStar)].houseNumber
  )
    lagnaSYuti.push(planets[7].name);
  if (
    planets[8].houseNumber ===
    planets[planetIndex.indexOf(lagnaStar)].houseNumber
  )
    lagnaSYuti.push(planets[8].name);
  let lagnLordYuti =
    lagnaSYuti.length > 0
      ? `${lagnaSYuti.join(" ")} has yuti with Lagna Lord ${lagnaStar}.`
      : "";
  // console.log(lagnaStarStat);
  return { sun, lagnLordYuti, weakLagna, lagnaStarStat };
}
