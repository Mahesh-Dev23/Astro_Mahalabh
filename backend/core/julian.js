export function getJulianDay(swe, date, time, timezone) {
  console.log(
    "step 7 details received in Julian day function",
    date,
    time,
    timezone,
  );

  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm, ss] = time.split(":").map(Number);
  // console.log("Julian.js", y, m, d, hh, mm, ss);

  const localHours = Number(hh) + Number(mm) / 60 + Number(ss) / 3600;

  const ut = Number(localHours) - Number(timezone);

  // console.log("Julian.js", localHours, timezone, ut);
  // const jd = swe.julday(y, m, d, ut, swe.SE_GREG_CAL);//
  const jd = swe.julday(y, m, d, ut);

  return jd;
}
