import { minutesToTime } from "../utils/minutesToTime.js";
import { timeToMinutes } from "../utils/timeToMinutes.js";
export function getRahuKaal(sunrise, sunset, date) {
  // console.log("Rahukal", sunrise);

  const day = new Date(date).getDay();

  const rahuIndex = [8, 2, 7, 5, 6, 4, 3];

  const sr = timeToMinutes(sunrise);
  const ss = timeToMinutes(sunset);

  const segment = (ss - sr) / 8;

  const rahuStart = sr + segment * (rahuIndex[day] - 1);
  const rahuEnd = rahuStart + segment;

  return {
    start: minutesToTime(rahuStart),
    end: minutesToTime(rahuEnd),
  };
}
