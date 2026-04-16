export const getChandrMangalLaxmi = (chandra, mangal) => {
  // console.log("Chandralaxmi");

  let chandramangalLaxmi = [];
  if (chandra.stat === "affected" || mangal.stat === "affected") return;
  const mc = mangal.combust;
  const md = mangal.dignity === "Debilitated";
  const cc = chandra.combust;
  const cd = chandra.dignity === "Debilitated";
  const mangalAspect = mangal.drushtiOnHouse.includes(chandra.houseNumber);
  const chandrAspect = chandra.drushtiOnHouse.includes(mangal.houseNumber);
  if (mc || md || cc || cd) return;
  if (mangal.houseName === "Trik" || chandra.houseName === "Trik") return;
  // if mangal and chandra are good then check yog
  if (mangal.rashi === chandra.rashi) {
    // console.log("Chandra Mangal yuti is creating Chandra Mangal Laxmi Yog.");
    chandramangalLaxmi.push(
      `Chandra Mangal yuti in ${mangal.house} is creating Chandra Mangal Laxmi Yog.`,
    );
  }

  if (mangalAspect)
    chandramangalLaxmi.push(
      `Mars's Drushti on Moon in ${chandra.house} is creating Chandra Mangal Laxmi Yog.`,
    );
  if (chandrAspect)
    chandramangalLaxmi.push(
      `Moon's Drushti on mars in ${mangal.house} is creating Chandra Mangal Laxmi Yog.`,
    );
  // console.log("Chandra Mangal laxmi Calculated", chandramangalLaxmi);
  return (
    chandramangalLaxmi.length > 0 && {
      Chandra_Mangal_Laxmi_Yog: chandramangalLaxmi.join(", "),
    }
  );
};
