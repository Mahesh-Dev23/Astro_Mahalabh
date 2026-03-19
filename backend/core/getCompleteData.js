import { getJulianDay } from "./julian.js";

import { getPlanets } from "../utils/getPlanets.js";
import { getNavamshaSign } from "../utils/dNine.js";
import { getFullDashaTimeline } from "../utils/dasha.js";
import { getLocalDate } from "../utils/getLocalDate.js";
import { getSunriseSunset } from "../utils/sunrise.js";
import { getHora } from "../muhurat/hora.js";
import { getMuhurat } from "../muhurat/getMuhurat.js";

import { hourToTime } from "../utils/hourToTime.js";
import { getAvakhada } from "../avakhada/avakhada.js";
import { getGhatak } from "../avakhada/ghatak.js";

import { getDivas } from "../panchang/getDivas.js";
// import { gunaMilan } from "../matchmaking/gunaMilan.js";

export async function getCompleteData({ swe, date, time, tz, lat, lon }) {
  console.log(
    "step 5 Data received through promise function ",
    lat,
    lon,
    date,
    time,
    tz,
  );
  //   const newDate = new Date(date);
  const year = date.split("-")[0];
  const month = date.split("-")[1];
  const day = date.split("-")[2];
  const hour = time.split(":")[0];
  const minutes = time.split(":")[1];
  const second = time.split(":")[2] ? time.split(":")[2] : 0;

  const newDate = new Date(date);
  //   const tz = 5.5;
  const currentTime = getLocalDate(new Date());
  const weekday = new Date(year, month - 1, day).getDay();

  console.log(
    "step 6 for Jd ",
    // newDate,
    year,
    month,
    day,
    weekday,
    hour,
    minutes,
    second,
    tz,
  );

  if (!swe) return;
  //   const hourUT = localTimeToUT(hour, minutes, second, tz); // remove time.js
  const jd = await getJulianDay(swe, date, time, tz);
  console.log("Step 8 Julian day converted from newDate with UTC method", jd);

  // 1. Calculate Lagna and Houses (Whole Sign System)
  const houses = swe.houses_ex(jd, 65536, lat, lon, "W");
  const lagnaLongitude = houses.ascmc[0];
  const lagnaDegree = (lagnaLongitude % 30).toFixed(2);
  const lagna = Math.floor(lagnaLongitude / 30) + 1;
  let housesFromLagna = [];
  const housescount = (h, lagna) => {
    return housesFromLagna.push((h + lagna) % 12 == 0 ? 12 : (h + lagna) % 12);
  };
  for (let h = 0; h < 12; h++) {
    housescount(h, lagna);
  }
  // 2 get planet details
  const receivedPlanets = getPlanets(jd, swe);
  if (!receivedPlanets) return;
  let planetKeys = Object.keys(receivedPlanets);
  const planets = [];
  planetKeys.map((name) => planets.push({ name, ...receivedPlanets[name] }));

  const sunLon = planets[0].longitude;
  const moonLon = planets[1].longitude;

  //Navmansh ---------------------------------------------------
  const navmansha = getNavamshaSign(lagnaLongitude, planets);

  // Dahsha ----------------------------------------------------
  const dasha = getFullDashaTimeline(
    planets[1].longitude,
    `${year}-${month}-${day}`,
  );

  // sunrise - sunset ----------------------------
  if (!jd || !swe) return;
  const sun = await getSunriseSunset({
    lat,
    lon,
    sunLon,
  });

  // function hourToTime(h) {
  //   // convert UT → IST
  //   // h = h + 5.5;

  //   // if (h >= 24) h -= 24;

  //   if (h < 0) h += 24;
  //   if (h >= 24) h -= 24;

  //   const hour = Math.floor(h);
  //   const min = Math.floor((h - hour) * 60);
  //   const sec = Math.floor(((h - hour) * 60 - min) * 60);

  //   console.log(
  //     `${hour.toString().padStart(2, "0")}:${min
  //       .toString()
  //       .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`,
  //   );
  //   return `${hour.toString().padStart(2, "0")}:${min
  //     .toString()
  //     .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  // }

  // converting sunrise sunset times to 24 hrs style --------

  const sunrise = hourToTime(sun.sunrise);
  const sunset = hourToTime(sun.sunset);

  // Muhurat details ---------------------------------------
  const horas = getHora(sunrise, weekday);
  const muhurat = getMuhurat({ horas, sunrise, sunset, weekday, newDate });

  // Panchang details --------------------------------------
  const divas = getDivas({
    sunLon,
    moonLon,
    weekday,
    lat,
    lon,
    date,
    time,
    sunrise,
    sunset,
  });

  // Avakhadaha ------------------------------------------
  const avakhdaha = getAvakhada(planets[1], lagna, jd, planets[0]);

  // Ghatak ----------------------------------------------
  const ghatak = getGhatak(weekday, divas.tithi, planets[1]);

  let panchang = { divas, muhurat, avakhdaha, ghatak };

  // Matchmaking shifting this to frontend ----------------------------------------
  // const match = gunaMilan(planets[1], planets[0]);

  return {
    lagna,
    lagnaDegree,
    lagnaLongitude,
    housesFromLagna,
    navmanshaLagna: navmansha.lagna,
    navmanshaPlanets: navmansha.planets,
    moonLongitude: moonLon,
    sunLongitude: sunLon,
    dasha,
    panchang,
    planets,
    currentTime: currentTime.split(" ")[0],
    horas,
  };
}
