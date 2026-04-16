import { PLANETS } from "../constants/names.js";
import { getRashi } from "./getRashi.js";
import { getNakshatra } from "./getNakshatra.js";
import { isCombust } from "./isCombust.js";
import { getPlanetStatus } from "./getPlanetStatus.js";
import { getAvastha } from "./getAvastha.js";

export function getPlanets(jd, swe, lat, long, housesFromLagna) {
  const kendra = [1, 4, 7, 10];
  const trikon = [1, 5, 9];
  const trik = [6, 8, 12];
  const marak = [2];
  const upachay = [3, 11];
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
  // console.log("get planet", jd);
  const AYANAMSA_CORRECTION = 0; //0.0333 // 0.0009
  const planetIds = [
    [swe.SE_SUN, "Sun", 0.05, 22],
    [swe.SE_MOON, "Moon", 0.09, 24],
    [swe.SE_MARS, "Mars", 0.26, 28],
    [swe.SE_MERCURY, "Mercury", 0.27, 32],
    [swe.SE_JUPITER, "Jupiter", 0.07, 16],
    [swe.SE_VENUS, "Venus", 0.12, 25],
    [swe.SE_SATURN, "Saturn", 0, 36],
    [swe.SE_MEAN_NODE, "Rahu", 0.19, 42], //not MEAN node
    // swe.SE_URANUS,
    // swe.SE_NEPTUNE,
    // swe.SE_PLUTO,
  ];
  const planets = {};

  let sunLon = 0;
  const flags =
    swe.SEFLG_SWIEPH | // Swiss Ephemeris
    swe.SEFLG_SIDEREAL | // VERY IMPORTANT
    swe.SEFLG_SPEED;
  // swe.SEFLG_TOPOCTR;

  // swe.set_topo(long, lat, 0);

  for (const p of planetIds) {
    const res = swe.calc_ut(jd, p[0], flags); // flags instead on number 65536

    const lon = res[0] - p[2]; // degree rectification
    const lat = res[1];
    const speed = res[3];

    // console.log("deg corrections", res[0] - 0.19);
    if (p[0] === swe.SE_SUN) sunLon = lon;
    // console.log("sunlon", sunLon);

    planets[p[1]] = {
      longitude: lon,
      latitude: lat,
      speed,
      maturity: p[3],
    };
  }
  const resKetu = swe.calc_ut(jd, swe.SE_MEAN_NODE, flags);
  planets["Ketu"] = {
    longitude: ((resKetu[0] + 180) % 360) - 0.19 - AYANAMSA_CORRECTION,
    latitude: resKetu[1],
    speed: resKetu[3],
    maturity: 47,
  };

  // add derived attributes
  for (const name in planets) {
    let p = planets[name];

    const rashi = getRashi(p.longitude);
    const nak = getNakshatra(p.longitude);
    const houseNumber = housesFromLagna.indexOf(rashi.rashi) + 1;
    const house = hName[houseNumber - 1];
    planets[name] = {
      ...p,
      rashiName: rashi.name,
      rashi: rashi.rashi,
      degree: rashi.degree,
      nakshatra: nak.name,
      nakShatraLord: nak.lord,
      pada: nak.pada,
      houseNumber,
      house,
      houseName: kendra.includes(houseNumber)
        ? "Kendra"
        : trikon.includes(houseNumber)
          ? "Trikon"
          : trik.includes(houseNumber)
            ? "Trik"
            : upachay.includes(houseNumber)
              ? "Upachay"
              : "Marak",
      combust: isCombust(name, p.longitude, sunLon),
      dignity: getPlanetStatus(name, p.longitude), // exhalted or debilated or normal
      avastha: getAvastha(rashi.rashi, rashi.degree),
    };
  }

  // console.log(planets);
  return planets;
}
