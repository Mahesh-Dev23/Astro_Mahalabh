import { rashiLords } from "../../../constant/names.js";
export const getNichbhang = (
  planets,
  planetNames,
  nichRashi,
  nichRashilord,
  uchaRashi,
) => {
  // console.log("nichbhang");
  let nichbhang = null;
  let nichbhang2;
  planetNames.map((p, i) => {
    if (p === "rahu" || p === "ketu") return;
    nichbhang =
      planets[p].rashi == nichRashi[i] &&
      planets[planetNames[nichRashilord[i]]].rashi ===
        uchaRashi[nichRashilord[i]] &&
      `Nichbhang Raj Yog ${planets[p].name}'s rashi lord ${planets[planetNames[nichRashilord[i]]].name} is exhalted in ${planets[planetNames[nichRashilord[i]]].houseNumber} house.`;
    // check swa rashi of nich rashi lord

    nichbhang =
      planets[p].rashi == nichRashi[i] &&
      planets[planetNames[nichRashilord[i]]].name ===
        rashiLords[planets[planetNames[nichRashilord[i]]].rashi - 1] &&
      `Nichbhang Raj Yog ${planets[p].name}'s rashi lord ${planets[planetNames[nichRashilord[i]]].name} is in his own rashi ${rashiLords[planets[planetNames[nichRashilord[i]]].rashi - 1]}.`;
  });
  // console.log("Nichbhang Calculated");
  return nichbhang && { Nichbhang_Raj_Yog: nichbhang };
};
