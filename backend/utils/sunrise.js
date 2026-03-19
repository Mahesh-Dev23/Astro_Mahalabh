export async function getSunriseSunset({ lat, lon, sunLon }) {
  // console.log("Step 10 Sun Longitude received in sunrise.js", sunLongitude);

  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;

  const obliq = 23.4397 * rad;
  const lambda = sunLon * rad;

  // Sun declination
  const decl = Math.asin(Math.sin(obliq) * Math.sin(lambda));

  const latRad = lat * rad;

  const cosH =
    (Math.sin(-0.833 * rad) - Math.sin(latRad) * Math.sin(decl)) /
    (Math.cos(latRad) * Math.cos(decl));

  const H = Math.acos(cosH) * deg;

  const daylight = (2 * H) / 15;

  // IST standard meridian
  const IST = 82.5;

  // solar noon correction
  const solarNoon = 12 + (IST - lon) / 15;

  const sunrise = solarNoon - daylight / 2;
  const sunset = solarNoon + daylight / 2;

  // console.log("from sunrise", sunrise);
  return {
    sunrise,
    sunset,
  };
}
