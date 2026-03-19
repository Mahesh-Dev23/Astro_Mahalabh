import swisseph from "swisseph-wasm";
// import { getSunLongitude } from "../backend2/utils/sunPosition.js";
// import { getDateClean } from "./utils/getDateClean.js";
// import { getSwe } from "./utils/swe.js";
// import { getJulianDay } from "./core/julian.js";
import { getCompleteData } from "./core/getCompleteData.js";
// import { getLocalDate } from "./utils/getLocalDate.js";

export async function getPanchang({ date, time, tz, lat, lon }) {
  console.log(
    "Step 3 ...... Data received in Panchang.js",
    date,
    time,
    tz,
    lat,
    lon,
  );

  // function run ------------------------------------
  async function run({ date, time, tz, lat, lon }) {
    console.log(
      "Step 4 ...... Data received in run fuction of Panchang.js",
      date,
      time,
      tz,
      lat,
      lon,
    );
    const swe = new swisseph(); // Await initialization

    await swe.initSwissEph();
    swe.set_sid_mode(swe.SE_SIDM_LAHIRI, 0, 0);

    return new Promise((resolve) => {
      setTimeout(() => {
        // console.log("Promise function");

        const completeDataReturned = getCompleteData({
          swe,
          date,
          time,
          tz,
          lat,
          lon,
        });
        // console.log("resolved", completeDataReturned);
        resolve(completeDataReturned);
      }, 100);
    });
  }
  return run({ date, time, tz, lat, lon });
}
