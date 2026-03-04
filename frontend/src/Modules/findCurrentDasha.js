export const findCurrentDasha = (dates, i) => {
  const now = new Date().getTime();
  // console.log(dates, i);
  // const index = dates.findIndex((range) => {
  const startDate = new Date(dates.start).getTime();
  const endDate = new Date(dates.end).getTime();
  // console.log(startDate);
  // console.log(dates.planet);
  const dasha = now >= startDate && now <= endDate ? i : 0;
  // });
  // console.log(dasha);
  return dasha;
};
