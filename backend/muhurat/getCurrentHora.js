import { timeToMinutes } from "../utils/timeToMinutes.js";

export function getCurrentHora(horas) {
  // console.log(horas);
  const now = new Date();

  const mins = now.getHours() * 60 + now.getMinutes();
  const convertMin = (h, m) => h * 60 + m;
  // const mins = convertMin(now);

  for (const h of horas) {
    const s = convertMin(
      Number(h.start.split(":")[0]),
      Number(h.start.split(":")[1]),
    );
    const e = convertMin(
      Number(h.end.split(":")[0]),
      Number(h.end.split(":")[1]),
    );

    // console.log("h", s, e);
    if (mins >= s && mins < e) {
      // console.log("current Hora", h);
      return h;
    }
  }

  return {};
}
