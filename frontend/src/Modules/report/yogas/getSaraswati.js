export const getSaraswati = (jupiter, mercury, venus) => {
  // console.log("saraswati");
  let saraswati = [];
  if (jupiter.stat === "affected") return;
  const jc = jupiter.combust;
  const vc = venus.combust;
  const mc = mercury.combust;
  const jd = jupiter.dignity !== "Debilitated";
  const vd = venus.dignity !== "Debilitated";
  const md = mercury.dignity !== "Debilitated";

  let pHouseName = ["Kendra", "Trikon", "Marak"];
  let j = null;
  if (!jc || !jd) j = pHouseName.includes(jupiter.houseName);
  let m = null;
  if (!mc || !md) m = pHouseName.includes(mercury.houseName);
  let v = null;
  if (!vc || !vd) v = pHouseName.includes(venus.houseName);

  if (!j || !m || !v) return;
  // console.log("JVM clean", jupiter.dignity);
  // IF one of the planet is in the requird house
  const vm = mercury.houseNumber === venus.houseNumber;
  const jvm = vm && jupiter.houseNumber === mercury.houseNumber;
  const jm = jupiter.houseNumber === mercury.houseNumber;
  const jv = jupiter.houseNumber === venus.houseNumber;
  // Now confirm yog
  if (
    vm &&
    jupiter.drushtiOnHouse.includes(mercury.houseNumber) &&
    mercury.stat === "clean"
  ) {
    // console.log("vm");
    saraswati.push(
      `Jupiter's drustri on ${jupiter.drushtiOnHouse.includes(mercury.houseNumber) && mercury.name} ${jupiter.drushtiOnHouse.includes(venus.houseNumber) && venus.name} forming Saraswati Yog.`,
    );
  } else if (jm) {
    saraswati.push(
      `jupiter and Mercury yuti is forming Saraswati Yog in ${jupiter.houseName} house.`,
    );
  } else if (jv) {
    saraswati.push(
      `jupiter and Venus yuti is forming Saraswati Yogin ${jupiter.houseName} house.`,
    );
  } else if (jvm) {
    saraswati.push(
      `jupiter and Venus, Mercury yuti is forming Saraswati Yog in ${jupiter.houseName} house.`,
    );
  }
  // console.log("Saraswati Calculated", saraswati);
  return (
    saraswati.length > 0 && {
      Saraswati_Yog: saraswati.join(", "),
    }
  );
};
