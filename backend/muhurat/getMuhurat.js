import { getAbhijitMuhurat } from "./abhijit.js";
import { getRahuKaal } from "./rahukal.js";
import { getGulikaKaal } from "./gulika.js";
import { getCurrentHora } from "./getCurrentHora.js";
import { getYamaganda } from "./yamaganda.js";

export function getMuhurat({ horas, sunrise, sunset, weekday, newDate }) {
  const currentHora = getCurrentHora(horas);
  const rahuKaal = getRahuKaal(sunrise, sunset, newDate);
  const gulika = getGulikaKaal(sunrise, sunset, weekday);
  const abhijit = getAbhijitMuhurat(sunrise, sunset);
  const yamaganda = getYamaganda(sunrise, sunset, weekday);
  return { currentHora, rahuKaal, gulika, abhijit, yamaganda };
}
