import { RASHI_NAMES } from "../constants/names.js";
export function getRashi(longitude) {
  const index = Math.floor(longitude / 30) + 1;
  // console.log(RASHI_NAMES[index]);

  return {
    name: RASHI_NAMES[index - 1],
    degree: longitude % 30,
    rashi: index == 0 ? 12 : index,
  };
}
