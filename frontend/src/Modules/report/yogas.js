import { rashiLords } from "../../constant/names.js";
import { getPlanetStatus } from "./getPlanetStatus.js";
import { getGajakesari } from "./yogas/gajakesari.js";
import { getBudhaditya } from "./yogas/getBudhaditya.js";
import { getSaraswati } from "./yogas/getSaraswati.js";
import { getDhanLaxmi } from "./yogas/getDhanaLaxmi.js";
import { getChandrMangalLaxmi } from "./yogas/getChandralaxmi.js";
import { getNichbhang } from "./yogas/getNichbhang.js";
import { getRajYog } from "./yogas/rajyog.js";
import { getVipRajYog } from "./yogas/vipRajYog.js";
import { getKalanidhi } from "./yogas/getKalanidhi.js";
import { getParivartan } from "./yogas/getParivartan.js";

export const getYogas = (planets, lagna, lagnaLord) => {
  const { sun, moon, mars, mercury, jupiter, venus, saturn, rahu, ketu } =
    planets;
  // console.log("yogas", moon, jupiter, mercury);
  let yogas = [];
  let houses = [
    lagna,
    (lagna + 1) % 12,
    (lagna + 2) % 12,
    (lagna + 3) % 12,
    (lagna + 4) % 12,
    (lagna + 5) % 12,
    (lagna + 6) % 12,
    (lagna + 7) % 12,
    (lagna + 8) % 12,
    (lagna + 9) % 12,
    (lagna + 10) % 12,
    (lagna + 11) % 12,
  ];
  const planetNames = Object.keys(planets);

  const index = houses.indexOf(0);
  houses[index] = 12;
  // console.log(houses);

  let uchaRashi = [1, 2, 10, 6, 4, 12, 7, 2, 8];
  let nichRashi = [7, 8, 4, 12, 10, 6, 1, 8, 2];
  let nichRashilord = [5, 2, 1, 4, 6, 3, 0, 2, 5];

  // run yoga functions ---------------------
  const gajakesari = getGajakesari(jupiter, moon);
  gajakesari && yogas.push(gajakesari);

  const budhaditya = getBudhaditya(sun, mercury);
  budhaditya && yogas.push(budhaditya);

  const nichbhang = getNichbhang(
    planets,
    planetNames,
    nichRashi,
    nichRashilord,
    uchaRashi,
  );
  nichbhang && yogas.push(nichbhang);

  const saraswati = getSaraswati(jupiter, mercury, venus);
  saraswati && yogas.push(saraswati);

  const kalanidhi = getKalanidhi(jupiter, mercury, venus, lagna);
  kalanidhi && yogas.push(kalanidhi);

  const chandrMangalLaxmi = getChandrMangalLaxmi(moon, mars);
  chandrMangalLaxmi && yogas.push(chandrMangalLaxmi);
  // console.log(yogas);
  const dhanLaxmi = getDhanLaxmi(
    houses,
    rashiLords,
    planets,
    planetNames,
    uchaRashi,
    lagnaLord,
    moon,
  );
  dhanLaxmi && dhanLaxmi.map((dl) => yogas.push(dl));

  const rajyog = getRajYog(houses, planets);
  rajyog && rajyog.map((rj) => yogas.push(rj));

  const vipritRajYog = getVipRajYog(lagna, planets, houses);
  vipritRajYog && yogas.push(vipritRajYog);

  const parivartanYog = getParivartan(planets);
  parivartanYog && yogas.push(parivartanYog);

  const guruAditya = getBudhaditya(sun, jupiter);
  guruAditya && yogas.push(guruAditya);

  // yogas.length > 0 && yogas.map((y) => console.log(y));
  // Confirm there are yogas and return yogas
  yogas.length === 0 && yogas.push({ No_yogas: "No yogas in this Kundali" });
  return yogas;
};
