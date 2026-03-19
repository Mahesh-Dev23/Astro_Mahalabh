const COMBUST_LIMITS = {
  Mercury: 14,
  Venus: 10,
  Mars: 17,
  Jupiter: 11,
  Saturn: 15,
};

function angleDiff(a, b) {
  let d = Math.abs(a - b);

  if (d > 180) d = 360 - d;

  return d;
}

export function isCombust(name, lon, sunLon) {
  const limit = COMBUST_LIMITS[name];

  if (!limit) return false;

  return angleDiff(lon, sunLon) <= limit;
}
