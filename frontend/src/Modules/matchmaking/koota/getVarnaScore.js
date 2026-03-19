import { VARNA_Scores } from "../../../constant/names.js";
export function getVarnaScore(boyRashi, girlRashi) {
  const varnaOrder = {
    Brahmin: 4,
    Kshatriya: 3,
    Vaishya: 2,
    Shudra: 1,
  };

  const boy = varnaOrder[VARNA_Scores[boyRashi]];
  const girl = varnaOrder[VARNA_Scores[girlRashi]];

  return boy >= girl ? 1 : 0;
}
