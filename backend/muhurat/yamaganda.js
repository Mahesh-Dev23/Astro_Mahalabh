import { getLocalDate } from "../utils/getLocalDate.js";
import { minutesToTime } from "../utils/minutesToTime.js";
import { timeToMinutes } from "../utils/timeToMinutes.js";
const yamMap = [5, 4, 3, 2, 1, 7, 6];

export function getYamaganda(sunrise, sunset, weekday) {
  const rise = timeToMinutes(sunrise);
  const set = timeToMinutes(sunset);
  const dur = (set - rise) / 8;

  const seg = yamMap[weekday];
  const start = new Date(rise + (seg - 1) * dur);
  const end = new Date(rise + seg * dur);

  return {
    start: minutesToTime(start.getTime()),
    end: minutesToTime(end.getTime()),
  };
}
