export function localTimeToUT(hour, minute, second, timezone) {
  const localHours = hour + minute / 60 + second / 3600;

  const ut = localHours - timezone;

  return ut;
}
