// const { SwissEph } = require("swisseph-wasm/dist/index.cjs");
// const path = require("path");
import path from "path";
// const { SwissEph } = require(
//   path.join(process.cwd(), "node_modules/swisseph-wasm/dist/index.cjs"),
// );

import SwissEph from "swisseph-wasm";
import { calculateNavamsa } from "./navmansha.js";

export async function getKundliData(utcDate, lat, lon) {
  // console.log(utcDate, lat, lon); //ok
  const swe = new SwissEph();
  await swe.initSwissEph();

  // Set Vedic Mode (Lahiri Ayanamsa)
  swe.set_sid_mode(swe.SE_SIDM_LAHIRI, 0, 0);

  const year = utcDate.getUTCFullYear();
  const month = utcDate.getUTCMonth() + 1;
  const day = utcDate.getUTCDate();
  const hour = utcDate.getUTCHours() + utcDate.getUTCMinutes() / 60;
  // console.log(year, month, day, hour); //ok
  const jd = swe.julday(year, month, day, hour, swe.SE_GREG_CAL);
  // console.log(jd);

  // const navmansha = calculateNavamsa(day, month, year, hour, lat, lon);
  // console.log("nav", navmansha);

  // 1. Calculate Lagna and Houses (Whole Sign System)
  const houses = swe.houses_ex(jd, 65536, lat, lon, "W");
  const lagnaDegree = houses.ascmc[0];
  const lagna = Math.floor(lagnaDegree / 30) + 1;
  // console.log(houses, lagnaDegree, lagnaRashi);ok

  // 2. Calculate Planets
  const planetIds = [
    swe.SE_SUN,
    swe.SE_MOON,
    swe.SE_MARS,
    swe.SE_MERCURY,
    swe.SE_JUPITER,
    swe.SE_VENUS,
    swe.SE_SATURN,
    swe.SE_MEAN_NODE,
    swe.SE_URANUS,
    swe.SE_NEPTUNE,
    swe.SE_PLUTO,
  ];
  const planetNames = [
    "Sun",
    "Moon",
    "Mars",
    "Mercury",
    "Jupiter",
    "Venus",
    "Saturn",
    "Rahu",

    "Uranus",
    "Neptune",
    "Pluto",
    "ketu",
  ];

  const planets = planetIds.map((id, i) => {
    const res = swe.calc_ut(jd, id, 65536);

    const degree = res[0];
    // console.log(planetNames[i], res[0]);
    return {
      name: planetNames[i],
      rashi: Math.floor(degree / 30) + 1,
      degreeInRashi: degree % 30,
    };
  });
  planets.push({
    name: "Ketu",
    rashi: ((planets[7] + 5) % 12) + 1,
    degreeInRashi: planets[7].degreeInRashi,
  });

  return {
    lagna,
    lagnaDegree,
    planets,
    moonLongitude: planets[1].degreeInRashi + (planets[1].rashi - 1) * 30,
  };
}

// module.exports = { getKundliData };
