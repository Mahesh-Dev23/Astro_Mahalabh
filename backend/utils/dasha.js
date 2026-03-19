/**
 * Generates full Mahadasha and Antardasha timeline
 */
import { DASHA_SEQUENCE } from "../constants/names.js";
export const getFullDashaTimeline = (moonLong, birthDate) => {
  const arcPerNak = 13.333333;
  const nakIndex = Math.floor(moonLong / arcPerNak);
  const startingIndex = nakIndex % 9;

  const elapsed = moonLong % arcPerNak;
  const remainingPercent = (arcPerNak - elapsed) / arcPerNak;

  let currentStart = new Date(birthDate);
  const fullTimeline = [];

  // Loop through 9 Mahadashas
  for (let i = 0; i < 9; i++) {
    const mIdx = (startingIndex + i) % 9;
    const mPlanet = DASHA_SEQUENCE[mIdx];

    // Calculate Mahadasha duration (Adjust first one for balance)
    const mDurationYears =
      i === 0 ? mPlanet.years * remainingPercent : mPlanet.years;
    const mEnd = new Date(currentStart);
    mEnd.setMilliseconds(
      mEnd.getMilliseconds() + mDurationYears * 365.25 * 24 * 60 * 60 * 1000,
    );

    // Calculate Antardashas within this Mahadasha
    const antardashas = [];
    let aStart = new Date(currentStart);

    for (let j = 0; j < 9; j++) {
      const aIdx = (mIdx + j) % 9;
      const aPlanet = DASHA_SEQUENCE[aIdx];

      // AD Duration = (MD years * AD years) / 120
      // If it's the first MD, we scale the ADs proportionally to the balance
      const aDurationYears =
        ((mPlanet.years * aPlanet.years) / 120) *
        (i === 0 ? remainingPercent : 1);

      const aEnd = new Date(aStart);
      aEnd.setMilliseconds(
        aEnd.getMilliseconds() + aDurationYears * 365.25 * 24 * 60 * 60 * 1000,
      );

      antardashas.push({
        planet: aPlanet.planet,
        start: new Date(aStart),
        end: new Date(aEnd),
      });
      aStart = new Date(aEnd);
    }

    fullTimeline.push({
      planet: mPlanet.planet,
      start: new Date(currentStart),
      end: new Date(mEnd),
      antardashas,
    });

    currentStart = new Date(mEnd);
  }
  return fullTimeline;
};
