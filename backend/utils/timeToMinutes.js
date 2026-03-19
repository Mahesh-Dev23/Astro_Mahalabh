export function timeToMinutes(t) {
  //   console.log("t", t);
  const [h, m, s] = t.toString().split(":").map(Number);
  return h * 60 + m + s / 60;
}
