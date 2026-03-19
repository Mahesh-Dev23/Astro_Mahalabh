import { NAKSHATRA_NAMES } from "../constants/names.js";
import { getNadiScore } from "./koota/getNadiScore.js";
import { getBhakootScore } from "./koota/getBhakootScore.js";
import { getGanaScore } from "./koota/getGanaScore.js";
import { getGrahaMaitriScore } from "./koota/getGrahaMaitriScore.js";
import { getYoniScore } from "./koota/getYoniScore.js";
import { getTaraScore } from "./koota/getTaraScore.js";
import { getVashyaScore } from "./koota/getVashyaScore.js";
import { getVarnaScore } from "./koota/getVarnaScore.js";
export function gunaMilan(jatak, partner) {
  const jatakRashi = jatak.rashi;
  const partnerRashi = partner.rashi;

  const jatakNak = NAKSHATRA_NAMES.indexOf(jatak.nakshatra);
  const partnerNak = NAKSHATRA_NAMES.indexOf(partner.nakshatra);

  const varna = getVarnaScore(jatakRashi, partnerRashi);
  const vashya = getVashyaScore(jatakRashi, partnerRashi);
  const tara = getTaraScore(jatakNak, partnerNak);
  const yoni = getYoniScore(jatakNak, partnerNak);
  const graha = getGrahaMaitriScore(jatakRashi, partnerRashi);
  const gana = getGanaScore(jatakNak, partnerNak);
  const bhakoot = getBhakootScore(jatakRashi, partnerRashi);
  const nadi = getNadiScore(jatakRashi, partnerRashi);

  const total = varna + vashya + tara + yoni + graha + gana + bhakoot + nadi;
  return {
    varna,
    vashya,
    tara,
    yoni,
    graha,
    gana,
    bhakoot,
    nadi,
    total,
  };
}
