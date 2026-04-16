export const getBudhaditya = (sun, jm) => {
  // console.log("Budhaditya ");
  let bd = [];
  let bdName = "";
  if (sun.dignity === "Debilitated") return;
  if (sun.stat === "affected") return;
  if (sun.kartari === "Pap Kartari") return;
  if (jm.dignity === "Debilitated") return;
  if (jm.stat === "affected") return;

  bdName = jm.name === "Mercury" && "Budhaditya_Yog";
  bdName = jm.name === "Jupiter" && "Guruaditya_Yog";

  jm.name === "Mercury" &&
    sun.rashi === jm.rashi &&
    bd.push(`Budhaditya Yog in ${sun.house} house.`);
  jm.name === "Jupiter" &&
    sun.rashi === jm.rashi &&
    bd.push(`Guruaditya Yog in ${sun.house} house.`);
  // console.log("Budhaditya Calculated", bd.join(" "));
  return bd.length > 0 && jm.name === "Mercury"
    ? { Budhaditya_Yog: bd.join(" ") }
    : bd.length > 0 && jm.name === "Jupiter"
      ? { Guruaditya_Yog: bd.join(" ") }
      : "";
};
