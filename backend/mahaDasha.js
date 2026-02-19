function calculateMahaDashas(moonLongitude, birthDate) {
  // 1. Determine Nakshatra index (0 to 26)
  const nakshatraIndex = Math.floor(moonLongitude / NAKSHATRA_SPAN);

  // 2. Determine the starting Dasha Lord (0 to 8)
  // The sequence repeats every 9 Nakshatras
  const startingLordIndex = nakshatraIndex % 9;

  // 3. Calculate how much of the current Nakshatra is left
  const degreeInNakshatra = moonLongitude % NAKSHATRA_SPAN;
  const percentageRemaining =
    (NAKSHATRA_SPAN - degreeInNakshatra) / NAKSHATRA_SPAN;

  let dashas = [];
  let currentStartDate = new Date(birthDate);

  // 4. Loop through the lords to build the 120-year timeline
  for (let i = 0; i < 9; i++) {
    const lordIdx = (startingLordIndex + i) % 9;
    const lord = DASHA_LORDS[lordIdx];

    let durationYears = lord.years;

    // If it's the very first Dasha, apply the "Balance of Dasha"
    if (i === 0) {
      durationYears *= percentageRemaining;
    }

    const endDate = new Date(currentStartDate);
    endDate.setFullYear(endDate.getFullYear() + Math.floor(durationYears));
    // Simple decimal year to days conversion for precision
    endDate.setHours(endDate.getHours() + (durationYears % 1) * 365 * 24);

    dashas.push({
      lord: lord.name,
      start: new Date(currentStartDate),
      end: new Date(endDate),
    });

    currentStartDate = new Date(endDate);
  }

  return dashas;
}
///// antardasa
function calculateAntardashas(mahadashaLord, mStart, mEnd) {
  const totalMahadashaYears = DASHA_LORDS.find(
    (l) => l.name === mahadashaLord,
  ).years;
  const startIndex = DASHA_LORDS.findIndex((l) => l.name === mahadashaLord);

  let antardashas = [];
  let currentStart = new Date(mStart);

  for (let i = 0; i < 9; i++) {
    const lordIdx = (startIndex + i) % 9;
    const antardashaLord = DASHA_LORDS[lordIdx];

    // Formula: (M-Years * A-Years) / 120
    const durationYears = (totalMahadashaYears * antardashaLord.years) / 120;

    let currentEnd = new Date(currentStart);
    currentEnd.setFullYear(
      currentEnd.getFullYear() + Math.floor(durationYears),
    );
    currentEnd.setHours(currentEnd.getHours() + (durationYears % 1) * 365 * 24);

    antardashas.push({
      lord: antardashaLord.name,
      start: new Date(currentStart),
      end: new Date(currentEnd),
    });

    currentStart = new Date(currentEnd);
  }
  return antardashas;
}
