import { nadi } from "../../constants/names.js";
export function getNadiScore(boyRashi, girlRashi) {
  if (nadi[boyRashi] === nadi[girlRashi]) {
    return 0;
  }

  return 8;
}
