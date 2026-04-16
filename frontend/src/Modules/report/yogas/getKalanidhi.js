export const getKalanidhi = (jupiter, mercury, venus, lagna) => {
  // console.log("kalanidhi");
  let kalanidhi = [];
  if (jupiter.stat === "affected") return;
  let h = [lagna + 1, lagna + 4];
  const j = h.includes(jupiter.houseNumber);
  const v = h.includes(venus.houseNumber);
  if (!j || !v) return;
  const jc = jupiter.combust;
  const vc = venus.combust;
  const mc = mercury.combust;
  const jd = jupiter.dignit === "Debilitated";
  const vd = venus.dignit === "Debilitated";
  const md = mercury.dignit === "Debilitated";
  if (jc || jd || mc || md || vc || vd) return;
  // if jupiter, mercury and venus are clean then check yoga
  if (
    jupiter.houseNumber !== 1 ||
    jupiter.houseNumber !== 4 ||
    venus.houseNumber !== 1 ||
    venus.houseNumber !== 4
  )
    return;
  mercury.drushtiOnHouse.includes(jupiter.houseNumber) ||
    (mercury.drushtiOnHouse.includes(venus.houseNumber) &&
      kalanidhi.push(
        `Jupiter's influence on Mercury or venus in second or fifth creates Kalanidhi Yog.`,
      ));
  console.log("kalanidhi Calculated");
  return (
    kalanidhi.length > 0 && {
      Kalanidhi_Yog: kalanidhi.join(" "),
    }
  );
};
