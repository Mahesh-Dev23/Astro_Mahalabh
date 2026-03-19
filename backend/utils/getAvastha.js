import { PLANET_Avastha } from "../constants/names.js";
export const getAvastha = (rashi, degree) => {
  //   console.log(rashi, degree);
  let avastha = "";
  const evenOdd = rashi % 2;
  let index = PLANET_Avastha.findIndex((p) => degree <= p.deg);
  let reverseIndex = 0;
  //   index = evenOdd === 0 ? 5 - index : index;
  reverseIndex = evenOdd == 0 && 4 - index;
  //   console.log(reverseIndex);

  return PLANET_Avastha[evenOdd == 1 ? index : reverseIndex]?.avastha;
};
