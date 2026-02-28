/**
 * Calculates the five elements of Panchang
 * @param {number} sunLong - Nirayana Sun Longitude (0-360)
 * @param {number} moonLong - Nirayana Moon Longitude (0-360)
 * @param {Date} date - Date of birth
 */
import { astroData } from "./astroData.js";
export const calculatePanchang = (sunLong, moonLong, date) => {
  //   const NAKSHATRAS = [
  //     "Ashwini",
  //     "Bharani",
  //     "Krittika",
  //     "Rohini",
  //     "Mrigashira",
  //     "Ardra",
  //     "Punarvasu",
  //     "Pushya",
  //     "Ashlesha",
  //     "Magha",
  //     "Purva Phalguni",
  //     "Uttara Phalguni",
  //     "Hasta",
  //     "Chitra",
  //     "Swati",
  //     "Vishakha",
  //     "Anuradha",
  //     "Jyeshtha",
  //     "Mula",
  //     "Purva Ashadha",
  //     "Uttara Ashadha",
  //     "Shravana",
  //     "Dhanishta",
  //     "Shatabhisha",
  //     "Purva Bhadrapada",
  //     "Uttara Bhadrapada",
  //     "Revati",
  //   ];
  // 1. Vaar (Weekday)
  //   const days = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];
  const vaar = astroData.days[date.getDay()];

  // 2. Tithi (Lunar Day) - Moon is 12° ahead of Sun per Tithi
  let diff = moonLong - sunLong;
  if (diff < 0) diff += 360;
  const tithiIndex = Math.floor(diff / 12);
  const paksha = tithiIndex < 15 ? "Shukla" : "Krishna";
  //   const tithiNames = [
  //     "Pratipada",
  //     "Dwitiya",
  //     "Tritiya",
  //     "Chaturthi",
  //     "Panchami",
  //     "Shashthi",
  //     "Saptami",
  //     "Ashtami",
  //     "Navami",
  //     "Dashami",
  //     "Ekadashi",
  //     "Dwadashi",
  //     "Trayodashi",
  //     "Chaturdashi",
  //     "Purnima/Amavasya",
  //   ];
  const tithi = astroData.tithiNames[tithiIndex % 15];

  // 3. Nakshatra (Already covered, but part of Panchang)
  const nakIndex = Math.floor(moonLong / (13 + 20 / 60));
  const nakshatra = astroData.NAKSHATRAS[nakIndex]; // Use your existing NAKSHATRAS array

  // 4. Yoga (Sum of Sun and Moon longitudes)
  let yogaSum = sunLong + moonLong;
  if (yogaSum >= 360) yogaSum -= 360;
  const yogaIndex = Math.floor(yogaSum / (13 + 20 / 60));
  //   const yogaNames = [
  //     "Vishkumbha",
  //     "Preeti",
  //     "Ayushman",
  //     "Saubhagya",
  //     "Shobhana",
  //     "Atiganda",
  //     "Sukarma",
  //     "Dhriti",
  //     "Shoola",
  //     "Ganda",
  //     "Vriddhi",
  //     "Dhruva",
  //     "Vyaghata",
  //     "Harshana",
  //     "Vajra",
  //     "Siddhi",
  //     "Vyatipata",
  //     "Variyana",
  //     "Parigha",
  //     "Shiva",
  //     "Siddha",
  //     "Sadhya",
  //     "Shubha",
  //     "Shukla",
  //     "Brahma",
  //     "Indra",
  //     "Vaidhriti",
  //   ];
  const yoga = astroData.yogaNames[yogaIndex % 27];

  // 5. Karana (Half of a Tithi - 6°)
  const karanaIndex = Math.floor(diff / 6);
  //   const karanaNames = [
  //     "Bava",
  //     "Balava",
  //     "Kaulava",
  //     "Taitila",
  //     "Garija",
  //     "Vanija",
  //     "Vishti",
  //     "Shakuni",
  //     "Chatushpada",
  //     "Naga",
  //     "Kimstughna",
  //   ];
  // Karana logic is cyclic and complex; for simple apps, most use the index mapping:
  const karana =
    karanaIndex === 0
      ? "Kimstughna"
      : astroData.karanaNames[(karanaIndex - 1) % 7];

  return { vaar, tithi, paksha, nakshatra, yoga, karana };
};
