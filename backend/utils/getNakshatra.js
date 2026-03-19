import { NAKSHATRA_NAMES, NAKSHATRA_LORDS } from "../constants/names.js";
export function getNakshatra(longitude) {
  const nakIndex = Math.floor(longitude / 13.333333);

  const pada = Math.floor((longitude % 13.333333) / 3.333333) + 1;

  return {
    name: NAKSHATRA_NAMES[nakIndex],
    index: nakIndex,
    lord: NAKSHATRA_LORDS[nakIndex % 9],
    pada,
  };
}
