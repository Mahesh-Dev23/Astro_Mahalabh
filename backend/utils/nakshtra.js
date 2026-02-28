import { astroData } from "./astroData.js";
export function getNakshtra(longitude) {
  // const NAKSHATRAS = [
  //   "Ashwini",
  //   "Bharani",
  //   "Krittika",
  //   "Rohini",
  //   "Mrigashira",
  //   "Ardra",
  //   "Punarvasu",
  //   "Pushya",
  //   "Ashlesha",
  //   "Magha",
  //   "Purva Phalguni",
  //   "Uttara Phalguni",
  //   "Hasta",
  //   "Chitra",
  //   "Swati",
  //   "Vishakha",
  //   "Anuradha",
  //   "Jyeshtha",
  //   "Mula",
  //   "Purva Ashadha",
  //   "Uttara Ashadha",
  //   "Shravana",
  //   "Dhanishta",
  //   "Shatabhisha",
  //   "Purva Bhadrapada",
  //   "Uttara Bhadrapada",
  //   "Revati",
  // ];
  /**
   * @param {number} longitude - Absolute longitude (0-360)
   * @returns {Object} - Nakshatra details
   */

  const totalMinutes = longitude * 60;
  const minutesInNakshatra = 800; // 13 degrees 20 minutes = 800 minutes
  const minutesInPada = 200; // 3 degrees 20 minutes = 200 minutes

  const nakshatraIndex = Math.floor(totalMinutes / minutesInNakshatra);
  const pada =
    Math.floor((totalMinutes % minutesInNakshatra) / minutesInPada) + 1;

  // Nakshatra Lords follow a fixed sequence (Ketu, Venus, Sun, Moon, Mars, Rahu, Jupiter, Saturn, Mercury)
  // const lords = [
  //   "Ketu",
  //   "Venus",
  //   "Sun",
  //   "Moon",
  //   "Mars",
  //   "Rahu",
  //   "Jupiter",
  //   "Saturn",
  //   "Mercury",
  // ];
  const lord = astroData.nakshatraLords[nakshatraIndex % 9];

  return {
    name: astroData.NAKSHATRAS[nakshatraIndex],
    pada: pada,
    lord: lord,
    index: nakshatraIndex + 1,
  };
}
