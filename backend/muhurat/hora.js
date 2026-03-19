import { timeToMinutes } from "../utils/timeToMinutes.js";
import { minutesToTime } from "../utils/minutesToTime.js";

export function getHora(sunrise, weekday) {
  const planets = [
    "Saturn",
    "Jupiter",
    "Mars",
    "Sun",
    "Venus",
    "Mercury",
    "Moon",
  ];

  const weekdayLords = [
    "Sun",
    "Moon",
    "Mars",
    "Mercury",
    "Jupiter",
    "Venus",
    "Saturn",
  ];

  const dayLord = weekdayLords[weekday];

  let startIndex = planets.indexOf(dayLord);

  const sr = timeToMinutes(sunrise);

  const horas = [];

  for (let i = 0; i < 24; i++) {
    const planet = planets[(startIndex + i) % 7];

    const start = sr + i * 60;
    const end = start + 60;

    horas.push({
      hour: i + 1,
      planet,
      start: minutesToTime(start),
      end: minutesToTime(end),
    });
  }

  return horas;
}
