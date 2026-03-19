import { getPanchang } from "../panchang.js";

export async function runEngine(date, time, tz, lat, lon) {
  console.log(
    "Step 2 ...... Data received in PanchangEngine",
    date,
    time,
    tz,
    lat,
    lon,
  );
  const result = await getPanchang({ date, time, tz, lat, lon });

  return result;
}
