import {
  rashiNames,
  rashiLords,
  gana,
  nadi,
  yoni,
  NAKSHATRA_NAMES,
} from "../constants/names.js";

export function getAvakhada(moon, lagna, jd, sun) {
  // console.log("avakahada", moon);

  const rashiIndex = Math.floor(moon.longitude / 30);
  const nakshatraIndex = NAKSHATRA_NAMES.indexOf(moon.nakshatra);
  const LagnaLord = rashiLords[lagna - 1];

  return {
    // paya: "",
    varna: ["Brahmin", "Kshatriya", "Vaishya", "Shudra"][rashiIndex % 4],
    yoni: yoni[nakshatraIndex % 12],
    gana: gana[nakshatraIndex % 3],
    vasya: ["Chatushpada", "Manava", "Jalachara", "Vanachara"][rashiIndex % 4],
    nadi: nadi[nakshatraIndex % 3],
    lagna,
    LagnaLord,
    rashi: rashiNames[rashiIndex],
    rahsiStar: rashiLords[rashiIndex],
    nakshatra: moon.nakshatra,
    nakshatraStar: moon.nakShatraLord,
    nakshttraPada: moon.nakshttraPada,
    sunSign: sun.rashiName,
    JulianDay: jd.toString().split(".")[0],
  };
}
