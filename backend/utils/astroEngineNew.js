import { SwissEph } from "swisseph-wasm";

export async function getKundliData(utcDate, lat, lon) {
  const swe = new SwissEph();
  await swe.initSwissEph();

  swe.set_sid_mode(swe.SE_SIDM_LAHIRI, 0, 0);

  const year = utcDate.getUTCFullYear();
  const month = utcDate.getUTCMonth() + 1;
  const day = utcDate.getUTCDate();
  const hour = utcDate.getUTCHours() + utcDate.getUTCMinutes() / 60;
  const jd = swe.julday(year, month, day, hour, swe.SE_GREG_CAL);

  // 1. Lagna and Houses
  const houses = swe.houses_ex(jd, 65536, lat, lon, "W");
  const lagnaDegree = houses.ascmc[0];
  const lagnaRashi = Math.floor(lagnaDegree / 30) + 1;

  // 2. Planets (Sun to Saturn)
  const planetIds = [0, 1, 2, 3, 4, 5, 6];
  const planetNames = [
    "Sun",
    "Moon",
    "Mars",
    "Mercury",
    "Jupiter",
    "Venus",
    "Saturn",
  ];

  const planets = planetIds.map((id, i) => {
    const res = swe.calc_ut(jd, id, 65536);
    const degree = res.res[0];
    const speed = res.res[3];
    return {
      name: planetNames[i],
      rashi: Math.floor(degree / 30) + 1,
      degreeInRashi: (degree % 30).toFixed(2),
      isRetro: speed < 0,
    };
  });

  return {
    lagna: { rashi: lagnaRashi, degree: (lagnaDegree % 30).toFixed(2) },
    planets,
    moonLongitude: planets[1].degreeInRashi + (planets[1].rashi - 1) * 30,
  };
}
