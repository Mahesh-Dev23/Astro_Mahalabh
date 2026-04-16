import { addMonths, isAfter } from "date-fns";
export function getThreeMonthSegments(planet, sDate, eDate, interval) {
  const result = [];

  let currentStart = new Date(sDate);
  const endDate = new Date(eDate);
  // const start = `${currentStart.getFullYear()}-${currentStart.getMonth() + 1}-${currentStart.getDate()}`;
  //   const end = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;

  while (currentStart < endDate) {
    // console.log(currentStart);
    let currentEnd = addMonths(currentStart, interval);

    if (isAfter(currentEnd, endDate)) {
      currentEnd = endDate;
    }

    // const end = `${currentEnd.getFullYear()}-${currentEnd.getMonth() + 1}-${currentEnd.getDate()}`;
    result.push({
      planet,
      start: `${currentStart.getFullYear()}-${currentStart.getMonth() + 1}-${currentStart.getDate()}`,
      end: `${currentEnd.getFullYear()}-${currentEnd.getMonth() + 1}-${currentEnd.getDate()}`,
    });
    // console.log(result);

    currentStart = currentEnd;
  }

  return result;
}
