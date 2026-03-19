import { PLANETS } from "../constants/names.js";
import { getRashi } from "./getRashi.js";
import { getNakshatra } from "./getNakshatra.js";
import { isCombust } from "./isCombust.js";
import { getPlanetStatus } from "./getPlanetStatus.js";
import { getAvastha } from "./getAvastha.js";

export function getPlanets(jd, swe) {
  console.log("get planet", jd);
  const planets = {};

  let sunLon = 0;

  for (const p of PLANETS) {
    const res = swe.calc_ut(jd, p.id, 65536);

    const lon = res[0];
    const lat = res[1];
    const speed = res[3];

    if (p.name === "Sun") sunLon = lon;

    // const rashi = getRashi(p.longitude);
    if (p.name == "Ketu") {
      planets["Ketu"] = {
        longitude: (lon + 180) % 360,
        latitude: lat,
        speed,
      };
    } else {
      planets[p.name] = {
        longitude: lon,
        latitude: lat,
        speed,
      };
    }
  }

  // add derived attributes
  for (const name in planets) {
    let p = planets[name];

    const rashi = getRashi(p.longitude);
    const nak = getNakshatra(p.longitude);

    planets[name] = {
      ...p,
      rashiName: rashi.name,
      rashi: rashi.rashi,
      degree: rashi.degree,
      nakshatra: nak.name,
      nakShatraLord: nak.lord,
      pada: nak.pada,
      retrograde: p.speed < 0,
      combust: isCombust(name, p.longitude, sunLon),
      dignity: getPlanetStatus(name, p.longitude),
      avastha: getAvastha(rashi.rashi, rashi.degree),
    };
  }

  // console.log(planets);
  return planets;
}
