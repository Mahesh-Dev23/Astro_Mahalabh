export function calculateYoga(sunLon, moonLon) {
  // console.log("yoga", sunLon, moonLon);
  let sum = sunLon + moonLon;

  if (sum >= 360) sum -= 360;

  return Math.floor(sum / 13.333333) + 1;
}
