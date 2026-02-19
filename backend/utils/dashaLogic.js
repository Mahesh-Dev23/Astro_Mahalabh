// Fixed years for each planetary ruler
const DASHA_LORDS = [
  { name: "Ketu", years: 7 },
  { name: "Venus", years: 20 },
  { name: "Sun", years: 6 },
  { name: "Moon", years: 10 },
  { name: "Mars", years: 7 },
  { name: "Rahu", years: 18 },
  { name: "Jupiter", years: 16 },
  { name: "Saturn", years: 19 },
  { name: "Mercury", years: 17 },
];

const NAKSHATRA_SPAN = 360 / 27; // 13.3333°

/**
 * Calculates Antardashas for a specific Mahadasha
 */
function calculateAntardashas(mahadashaLordName, mStart, mEnd) {
  const mLord = DASHA_LORDS.find((l) => l.name === mahadashaLordName);
  const startIndex = DASHA_LORDS.findIndex((l) => l.name === mahadashaLordName);

  let antardashas = [];
  let currentStart = new Date(mStart);

  for (let i = 0; i < 9; i++) {
    const lordIdx = (startIndex + i) % 9;
    const aLord = DASHA_LORDS[lordIdx];

    // Formula: (Mahadasha Years * Antardasha Lord Years) / 120
    const durationYears = (mLord.years * aLord.years) / 120;
    const currentEnd = new Date(currentStart);

    // Accurate date addition
    currentEnd.setMilliseconds(
      currentEnd.getMilliseconds() +
        durationYears * 365.25 * 24 * 60 * 60 * 1000,
    );

    antardashas.push({
      lord: aLord.name,
      start: new Date(currentStart),
      end: new Date(currentEnd),
    });

    currentStart = new Date(currentEnd);
  }
  return antardashas;
}

/**
 * Main function to calculate the full 120-year cycle
 */
function getVimshottariPeriods(moonLongitude, birthDate) {
  const nakshatraIndex = Math.floor(moonLongitude / NAKSHATRA_SPAN);
  const startingLordIndex = nakshatraIndex % 9;
  const degreeInNakshatra = moonLongitude % NAKSHATRA_SPAN;
  const percentageRemaining =
    (NAKSHATRA_SPAN - degreeInNakshatra) / NAKSHATRA_SPAN;

  let periods = [];
  let currentStart = new Date(birthDate);

  for (let i = 0; i < 9; i++) {
    const lordIdx = (startingLordIndex + i) % 9;
    const lord = DASHA_LORDS[lordIdx];
    let durationYears = lord.years;

    if (i === 0) durationYears *= percentageRemaining;

    const currentEnd = new Date(currentStart);
    currentEnd.setMilliseconds(
      currentEnd.getMilliseconds() +
        durationYears * 365.25 * 24 * 60 * 60 * 1000,
    );

    periods.push({
      lord: lord.name,
      start: new Date(currentStart),
      end: new Date(currentEnd),
      antardashas: calculateAntardashas(lord.name, currentStart, currentEnd),
    });

    currentStart = new Date(currentEnd);
  }
  return periods;
}

module.exports = { getVimshottariPeriods };
