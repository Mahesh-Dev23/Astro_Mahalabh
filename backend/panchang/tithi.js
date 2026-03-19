export function getTithi(sunLon, moonLon) {
  let diff = moonLon - sunLon;
  // console.log("tithi diff", diff);
  if (diff < 0) diff += 360;

  // console.log("tithi", Math.floor(diff / 12) + 1);
  return Math.floor(diff / 12) + 1;
}
