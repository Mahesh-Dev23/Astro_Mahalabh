// const { SwissEph } = require("swisseph-wasm/dist/index.cjs");
// const path = require("path");
import path from "path";
// const { SwissEph } = require(
//   path.join(process.cwd(), "node_modules/swisseph-wasm/dist/index.cjs"),
// );

import SwissEph from "swisseph-wasm";
import { calculateNavamsa } from "./navmansha.js";
import { getNavamshaSign } from "./dNine.js";
import { calculateSAVForSign } from "./ashtak.js";
import { getNakshtra } from "./nakshtra.js";
import { getFullDashaTimeline } from "./dasha.js";

export async function getKundliData(utcDate, lat, lon) {
  // console.log(typeof utcDate, lat, lon); //ok
  console.log(typeof utcDate);
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
      longitude: degree,
      nakshtra: getNakshtra(degree),
    };
  });
  planets.push({
    name: "Ketu",
    rashi: ((planets[7].rashi + 5) % 12) + 1,
    degreeInRashi: planets[7].degreeInRashi,
    longitude: (180 + planets[7].longitude) % 360,
    nakshtra: getNakshtra((180 + planets[7].longitude) % 360),
  });

  const navmansha = getNavamshaSign(lagnaDegree, planets);
  const dasha = getFullDashaTimeline(
    planets[1].longitude,
    `${year}-${month}-${day}`,
  );

  // let planetPosition = {};
  // const planetAshtak = planets.map((p, i) => {
  //   planetAshtak[p.name] = p.rashi;
  // });
  // console.log("planetPos", planetAshtak);
  // console.log("planets ", planets[1]);
  return {
    lagna,
    lagnaDegree,
    planets,
    moonLongitude: planets[1].degreeInRashi + (planets[1].rashi - 1) * 30,
    navmanshaLagna: navmansha.lagna,
    navmanshaPlanets: navmansha.planets,
    dasha,
  };
}

// module.exports = { getKundliData };
