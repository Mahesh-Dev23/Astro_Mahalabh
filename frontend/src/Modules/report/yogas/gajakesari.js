export const getGajakesari = (guru, chandra) => {
  // console.log(guru);
  // console.log("gajakesari ");
  const hName = [
    "First",
    "Second",
    "Third",
    "Forth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Nineth",
    "Tenth",
    "Eleventh",
    "Twelth",
  ];
  let gk = "";
  if (guru.dignity === "Debilitated") return;
  if (guru.stat === "affected") return;
  if (guru.kartari === "Pap Kartari") return;
  if (chandra.dignity === "Debilitated") return;
  if (chandra.stat === "affected") return;
  if (chandra.kartari === "Pap Kartari") return;
  gk =
    guru?.houseName === "Kendra" &&
    chandra?.houseName === "Kendra" &&
    // gk.push(`Gajakesari Yog in ${guru.houseNumber} house.`);
    `Gajakesari Yog in ${hName[guru.houseNumber - 1]} house.`;
  // console.log("gajakesari Calculated", gk);
  return (
    gk.length > 0 && {
      Gaja_Kesari_yog: gk,
    }
  );
};
