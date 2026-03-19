import {
  weekdayNames,
  weekdayGhatak,
  NAKSHATRA_NAMES,
} from "../constants/names.js";

// const ghatakNakshatra = [2, 4, 5, 9, 10, 14, 16];

export function getGhatak(weekday, tithiNumber, moon) {
  // console.log(weekdayGhatak[weekday]);
  // const weekday = weekdayNames[date.getDay()];
  const nakshatraIndex = NAKSHATRA_NAMES.indexOf(moon.nakshatra);

  return {
    ghatakday: weekdayNames[weekday],

    directionToAvoid: weekdayGhatak[weekdayNames[weekday]],

    tithiGhatak: tithiNumber === 4 || tithiNumber === 9 || tithiNumber === 14,

    nakshatraGhatak: [1, 5, 9, 13, 17, 21, 25].includes(nakshatraIndex),

    travelAdvice:
      weekdayGhatak[weekdayNames[weekday]] +
      " direction travel not recommended",
  };
}
