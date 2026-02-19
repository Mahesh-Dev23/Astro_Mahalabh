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

export function calculateDashas(moonLong, birthDate) {
  const nakSpan = 13.333333;
  const nakIdx = Math.floor(moonLong / nakSpan);
  const startLordIdx = nakIdx % 9;
  const remPerc = (nakSpan - (moonLong % nakSpan)) / nakSpan;

  let periods = [];
  let start = new Date(birthDate);

  for (let i = 0; i < 9; i++) {
    const lord = DASHA_LORDS[(startLordIdx + i) % 9];
    let yrs = lord.years * (i === 0 ? remPerc : 1);

    let end = new Date(start);
    end.setFullYear(end.getFullYear() + Math.floor(yrs));
    end.setMilliseconds(end.getMilliseconds() + (yrs % 1) * 31557600000);

    periods.push({
      lord: lord.name,
      start: new Date(start),
      end: new Date(end),
    });
    start = new Date(end);
  }
  return periods;
}
