export function minutesToTime(mins) {
  mins = ((mins % 1440) + 1440) % 1440;

  const h = Math.floor(mins / 60);
  const m = Math.floor(mins % 60);
  const s = Math.floor((mins - Math.floor(mins)) * 60);

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  // return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
