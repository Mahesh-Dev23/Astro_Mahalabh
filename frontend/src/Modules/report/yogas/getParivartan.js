import { rashiLords } from "../../../constant/names.js";
export const getParivartan = (planets) => {
  let parivartan = [];
  let consideredPlanet = "";
  Object.keys(planets).map((p) => {
    let pl = planets[p.toLowerCase()].name;

    let rashilord = rashiLords[planets[p.toLowerCase()].rashi - 1];
    let rashiLordRashi = planets[rashilord.toLowerCase()].rashi;
    let rashiLordsRashiLord = rashiLords[rashiLordRashi - 1];
    // console.log(rashilord);
    if (consideredPlanet !== "" && consideredPlanet === pl) return;
    if (pl !== rashilord && pl === rashiLordsRashiLord) {
      consideredPlanet = rashilord;

      parivartan.push(`Parivartan yog between ${pl} and ${rashilord}`);
    }
  });
  // console.log("consideredPlanet", consideredPlanet);
  return parivartan.length > 0 && { Parivartan_Yog: parivartan.join() };
};
