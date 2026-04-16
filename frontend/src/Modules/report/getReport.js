import { getYogas } from "./yogas.js";
import { getDoshas } from "./doshas.js";
import { getAge } from "./getAge.js";
import { getLagna } from "./getLagna.js";
import { getPlanetStatus } from "./getPlanetStatus.js";
export function getReport(data, dob) {
  const age = getAge(dob);
  const lagna = getLagna(data.chart);
  const sun = getPlanetStatus(0, data.chart.planets);
  const moon = getPlanetStatus(1, data.chart.planets);
  const mars = getPlanetStatus(2, data.chart.planets);
  const mercury = getPlanetStatus(3, data.chart.planets);
  const jupiter = getPlanetStatus(4, data.chart.planets);
  const venus = getPlanetStatus(5, data.chart.planets);
  const saturn = getPlanetStatus(6, data.chart.planets);
  const rahu = getPlanetStatus(7, data.chart.planets);
  const ketu = getPlanetStatus(8, data.chart.planets);
  // console.log(saturn);
  let planets = {
    sun,
    moon,
    mars,
    mercury,
    jupiter,
    venus,
    saturn,
    rahu,
    ketu,
  };
  const yogas = data && getYogas(planets, data.chart.lagna, lagna);
  const doshas = data && getDoshas(planets, data.chart.lagna, lagna);
  let exhalted = [];
  let debiliated = [];
  let combust = [];
  let retro = [];
  data.chart.planets.map((p) => {
    p.retrograde && retro.push(p);
    p.combust && combust.push(p);
    p.dignity === "Exalted" && exhalted.push(p);
    p.dignity === "Debilitated" && debiliated.push(p);
  });
  let report = {
    age,
    lagna,
    exhalted,
    debiliated,
    combust,
    retro,
    yogas,
    doshas,
    planets,
  };
  // console.log(report);
  return report;
}
