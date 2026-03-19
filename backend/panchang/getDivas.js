import { getTithi } from "./tithi.js";
import { calculateYoga } from "./yoga.js";
import { calculateKarana } from "./karana.js";
import {
  days,
  TITHI_NAMES,
  YOGA_NAMES,
  KARANA_NAMES,
} from "../constants/names.js";
export function getDivas({
  sunLon,
  moonLon,
  weekday,
  lat,
  lon,
  date,
  time,
  sunrise,
  sunset,
}) {
  const tithi = getTithi(sunLon, moonLon);
  // const nakshatra = calculateNakshatra(moonLon);
  const yoga = calculateYoga(sunLon, moonLon);
  const karana = calculateKarana(tithi);
  const vaar = days[weekday];
  const paksha = tithi < 15 ? "Shukla" : "Krishna";
  return {
    // sex,
    BirthDay: date,
    BirthTime: time,
    // BirthPlace: "",
    Latitude: lat,
    Longitude: lon,
    vaar,
    tithi: TITHI_NAMES[tithi - 1],
    paksha,
    yoga: YOGA_NAMES[yoga - 1],
    karana: KARANA_NAMES[karana],
    sunrise,
    sunset,
  };
}
