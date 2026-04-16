// Raj Yog ------------------------------------
import { rashiLords } from "../../../constant/names.js";
export const getRajYog = (houses, planets) => {
  let rajYog = [];
  const kendras = [houses[0], houses[3], houses[6], houses[9]];
  const trikonas = [houses[0], houses[4], houses[8]];
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
  const tName = ["First", "Fifth", "Ninth"];
  const kName = ["First", "Forth", "Seventh", "Tenth"];

  const kendraLords = [
    planets[rashiLords[houses[0] - 1].toLowerCase()],
    planets[rashiLords[houses[3] - 1].toLowerCase()],
    planets[rashiLords[houses[6] - 1].toLowerCase()],
    planets[rashiLords[houses[9] - 1].toLowerCase()],
  ];
  const trikonaLords = [
    planets[rashiLords[houses[0] - 1].toLowerCase()],
    planets[rashiLords[houses[4] - 1].toLowerCase()],
    planets[rashiLords[houses[8] - 1].toLowerCase()],
  ];
  // console.log(kendraLords, trikonaLords);
  let kendraLordHouses = [];
  let kendraLordNames = [];
  let trikonLordHouses = [];
  let trikonLordNames = [];
  kendraLords.map((k) => {
    // if conditions to add here -----------
    kendraLordHouses.push(k.houseNumber);
    kendraLordNames.push(k.name);
  });
  trikonaLords.map((t) => {
    // if conditions to add here -----------
    trikonLordHouses.push(t.houseNumber);
    trikonLordNames.push(t.name);
  });
  // console.log(kendraLordHouses);// success

  // Object.keys(planets).map((p) => console.log(p.drushti));
  // find kendra lords yuti -------------------------------------------
  const kendraYuti = Object.values(
    kendraLordHouses.reduce((acc, val, i) => {
      (acc[val] ||= []).push(i);
      // console.log("acc", acc);
      return acc;
    }, {}),
  ).filter((v) => v.length > 1);

  // console.log("kendrayuti", kendraYuti);
  // fianl kendra lord yuti statement to push --------------------------

  kendraYuti.map((k) => {
    let kly = [];
    let kn = [];
    let kys = [];
    k.map((ky) => {
      kly.push(`${kName[ky]}`);
      !kn.includes(kendraLords[ky].name) && kn.push(kendraLords[ky].name);
      kn.includes(kendraLords[ky].name) && kys.push(kendraLords[ky].name);
    });
    kn.length > 1 &&
      planets[kn[0].toLowerCase()].houseName !== "Trik" &&
      rajYog.push({
        Raj_Yog: `12 Kendra ${kly.join(", ")} lords ${kn.join(", ")}  ${kys.length === 0 ? `yuti` : ""} in ${planets[kn[0].toLowerCase()].houseName} bhav ${hName[houses.indexOf(planets[kn[0].toLowerCase()].rashi)]} house.`,
      });
  });

  // find trikon lords yuti --------------------------------------------
  const trikonYuti = Object.values(
    trikonLordHouses.reduce((acc, val, i) => {
      (acc[val] ||= []).push(i);
      // console.log("acc", acc);
      return acc;
    }, {}),
  ).filter((v) => v.length > 1);
  // fianl trikon lord yuti statement to push --------------------------

  trikonYuti.map((t) => {
    let tly = [];
    let tn = [];
    let tys = [];
    t.map((ty) => {
      tly.push(`${tName[ty]}`);
      !tn.includes(trikonaLords[ty].name) && tn.push(trikonaLords[ty].name);
      tn.includes(trikonaLords[ty].name) && tys.push(trikonaLords[ty].name);
    });
    tn.length > 1 &&
      planets[tn[0].toLowerCase()].houseName !== "Trik" &&
      rajYog.push({
        Raj_Yog: `2 Trikon ${tly.join(", ")} lords ${tn.join(", ")} ${tys.length === 0 ? `yuti` : ""} in ${hName[houses.indexOf(planets[tn[0].toLowerCase()].rashi)]} house.`,
      });
  });

  // console.log(kendraYutiStatement, trikonYutiStatement);

  // check drushti of raj yog planets -----------------------------------

  // console.log(kendraLords);
  kendraLords.map(
    (k, i) => (
      k.drushti.map((d, index) => {
        if (
          kendraLordNames.includes(d) &&
          k.drushtiOnRashi.includes(planets[d.toLowerCase()].rashi)
        ) {
          // console.log("3a Kendra planet", k.name, "drushti", d);
          // console.log(
          //   `Kendra ${kName[i]} Lord ${k.name}'s drushti on kendra ${kName[kendraLordNames.indexOf(d)]} lord ${d} in ${hName[planets[d.toLowerCase()].houseNumber - 1]} house.`,
          // ),

          rajYog.push({
            Raj_Yog: `3 Kendra ${kName[i]} house Lord ${k.name}'s drushti on kendra ${kName[kendraLordNames.indexOf(d)]} house lord ${d} in ${hName[planets[d.toLowerCase()].houseNumber - 1]} house.`,
          });
        }
      }),
      k.drushti.map((d) => {
        if (
          trikonLordNames.includes(d) &&
          k.drushtiOnRashi.includes(planets[d.toLowerCase()].rashi)
        ) {
          // console.log(
          //   `4 Trikon ${tName[trikonLordNames.indexOf(d)]} lord ${d}' drushti on kendra ${kName[kendraLordNames.indexOf(k.name)]} lord ${k.name} in ${hName[planets[k.name.toLowerCase()].houseNumber - 1]} house.`,
          // ),
          rajYog.push({
            Raj_Yog: `4 Trikon ${tName[trikonLordNames.indexOf(d)]} house lord ${d}' drushti on kendra ${kName[kendraLordNames.indexOf(k.name)]} house lord ${k.name} in ${hName[planets[k.name.toLowerCase()].houseNumber - 1]} house.`,
          });
        }
      })
    ),
  );

  trikonaLords.map(
    (t, i) => (
      t.drushti.map((d) => {
        if (
          kendraLordNames.includes(d) &&
          t.drushtiOnRashi.includes(planets[d.toLowerCase()].rashi)
        ) {
          console
            .log
            // `5 Trikon ${tName[trikonLordNames.indexOf(t.name)]} lord ${t.name}'s drushti on kendra ${kName[kendraLordNames.indexOf(d)]} lord ${d} in ${hName[planets[d.toLowerCase()].houseNumber - 1]} house.`,
            ();
          // (drushtiOnTrikonlord = `5 ${drushtiOnTrikonlord} Kendra ${planets[d.toLowerCase()].houseNumber} lord ${planets[d.toLowerCase()].name}'s drushti on kendra ${t.houseNumber} lord ${t.name} in ${t.houseName}`),
          rajYog.push({
            Raj_Yog: `5 Trikon ${tName[trikonLordNames.indexOf(t.name)]} house lord ${t.name}'s drushti on kendra ${kName[kendraLordNames.indexOf(d)]} house lord ${d} in ${hName[planets[d.toLowerCase()].houseNumber - 1]} house.`,
          });
        }
      }),
      t.drushti.map((d) => {
        if (
          trikonLordNames.includes(d) &&
          t.drushtiOnRashi.includes(planets[d.toLowerCase()].rashi)
        ) {
          rajYog.push({
            Raj_Yog: `6 Trikon ${tName[trikonLordNames.indexOf(t.name)]} house lord ${t.name}'s drushti on trikon ${tName[trikonLordNames.indexOf(d)]} house lord ${planets[d.toLowerCase()].name} in ${hName[planets[d.toLowerCase()].houseNumber - 1]} house.`,
          });
        }
      })
    ),
    // console.log(t.houseName)
  );
  // rajYog.push(drushtiOnTrikonlord);

  // rajYog.length > 0 && console.log(rajYog);
  return rajYog.length > 0 && rajYog;
};
