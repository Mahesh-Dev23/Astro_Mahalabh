export function hourToTime(h) {
  if (h < 0) h += 24;
  if (h >= 24) h -= 24;

  const hour = Math.floor(h);
  const min = Math.floor((h - hour) * 60);
  const sec = Math.floor(((h - hour) * 60 - min) * 60);

  // console.log(
  //   `${hour.toString().padStart(2, "0")}:${min
  //     .toString()
  //     .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`,
  // );
  return `${hour.toString().padStart(2, "0")}:${min
    .toString()
    .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}
