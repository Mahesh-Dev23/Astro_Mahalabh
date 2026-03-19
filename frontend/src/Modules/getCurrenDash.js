import { findCurrentDasha } from "./findCurrentDasha";
export function getCurrentDahsa(dasha) {
  // select current dasha -------------------------------------------
  let dashaIndex = 0;
  for (let x = 0; x < dasha.length; x++) {
    if (dashaIndex > 0) {
      break;
    }
    dashaIndex = findCurrentDasha(dasha[x], x);
  }

  // find antardasha from selected dasha -----------------------------
  let antdashaIndex = 0;
  for (let x = 0; x < dasha[dashaIndex].antardashas?.length; x++) {
    if (antdashaIndex > 0) {
      break;
    }
    antdashaIndex = findCurrentDasha(dasha[dashaIndex]?.antardashas[x], x);
  }

  const currentDasha = {
    dashaLord: dasha[dashaIndex],
    currentAntarDasha: dasha[dashaIndex].antardashas[antdashaIndex],
    dashaIndex,
  };

  return currentDasha;
}
