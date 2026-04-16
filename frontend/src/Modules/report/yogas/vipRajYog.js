import { rashiLords } from "../../../constant/names.js";
export const getVipRajYog = (lagna, planets, houses) => {
  let vRajYog = [];
  if (lagna.weakLagna) return;
  const dusthanLords = [
    planets[rashiLords[houses[5] - 1].toLowerCase()],
    planets[rashiLords[houses[7] - 1].toLowerCase()],
    planets[rashiLords[houses[11] - 1].toLowerCase()],
  ];
  const dusthan = [6, 8, 12];
  let vipritRajYogPlanets = [];
  dusthanLords.map(
    (d, i) =>
      (vipritRajYogPlanets =
        d.houseName === "Trik" &&
        `${vipritRajYogPlanets} House ${dusthan[i]} lord is placed in ${d.houseNumber}`),
  );
  // vRajYog.push(vipritRajYogPlanets.join(" "));
  // console.log(vRajYog);
  return vRajYog.length > 0 && { Viprit_Raj_Yog: vRajYog.join() };
};
