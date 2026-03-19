import { getLocalDate } from "../utils/getLocalDate.js";
import { minutesToTime } from "../utils/minutesToTime.js";
import { timeToMinutes } from "../utils/timeToMinutes.js";
export function getAbhijitMuhurat(sunrise, sunset) {
  // console.log("abhjat", sunrise, sunset);
  const rise = timeToMinutes(sunrise);
  const set = timeToMinutes(sunset);
  // const midday = (sunrise + sunset) / 2;

  // const dur = (sunset - sunrise) / 15;
  const midday = (rise + set) / 2;

  const dur = (set - rise) / 15;

  const start = new Date(midday - dur / 2);
  const end = new Date(midday + dur / 2);

  // console.log("abhjat", midday);
  return {
    start: getLocalDate(start.getTime()),
    end: getLocalDate(end.getTime()),
    // start: minutesToTime(start.getTime()),
    // end: minutesToTime(end.getTime()),
  };
}
