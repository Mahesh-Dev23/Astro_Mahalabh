// const { SwissEph } = require("swisseph-wasm/dist/index.cjs");
// const path = require("path");
// const { SwissEph } = require(
//   path.join(process.cwd(), "node_modules/swisseph-wasm/dist/index.cjs"),
// );
import SwissEph from "swisseph-wasm";
// const { getUTCData } = require("./timezoneService");
import { getUTCData } from "./timezoneService.js";

export async function calculateFullChart(birthData) {
  const { localDate, lat, lon } = birthData;

  // A. Fix the Timezone
  const { utcDate } = await getUTCData(localDate, lat, lon);

  // B. Init Ephemeris
  const swe = new SwissEph();
  await swe.initSwissEph();
  swe.set_sid_mode(swe.SE_SIDM_LAHIRI, 0, 0);

  const year = utcDate.getUTCFullYear();
  const month = utcDate.getUTCMonth() + 1;
  const day = utcDate.getUTCDate();
  const hour = utcDate.getUTCHours() + utcDate.getUTCMinutes() / 60;

  const jd = swe.julday(year, month, day, hour, swe.SE_GREG_CAL);

  // C. Get Lagna & Planets
  const houses = swe.houses_ex(jd, 65536, lat, lon, "W");
  const moon = swe.calc_ut(jd, swe.SE_MOON, 65536);

  // D. Return combined data
  return {
    utcTime: utcDate,
    lagna: houses.ascmc[0] / 30 + 1,
    moonLongitude: moon.res[0],
    // ... other planets
  };
}

// module.exports = { calculateFullChart };
// exports.default = { calculateFullChart };
