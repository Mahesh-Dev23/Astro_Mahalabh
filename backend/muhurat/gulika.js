import { minutesToTime } from "../utils/minutesToTime.js";
import { timeToMinutes } from "../utils/timeToMinutes.js";

const gulikaMap = [7, 6, 5, 4, 3, 2, 1];

export function getGulikaKaal(sunrise, sunset, weekday) {
  const sr = timeToMinutes(sunrise);
  const ss = timeToMinutes(sunset);

  const segment = (ss - sr) / 8;

  const gulikaStart = Number(sr) + Number(segment) * (gulikaMap[weekday] - 1);
  const gulikaEnd = Number(gulikaStart) + Number(segment);

  return {
    start: minutesToTime(gulikaStart),
    end: minutesToTime(gulikaEnd),
  };
}
