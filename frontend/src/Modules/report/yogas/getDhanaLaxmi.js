export const getDhanLaxmi = (
  houses,
  rashiLords,
  planets,
  planetNames,
  uchaRashi,
  lagnaLord,
  moon,
) => {
  // console.log("dhanalaxmi");
  let dhanLaxmi = [];
  const dhanLaxmiHouses = [houses[1], houses[4], houses[8], houses[10]];

  const hName = ["Second", "Fifth", "Ninth", "Eleventh"];
  // find 2,5,9, and 11 lords
  const dhanLaxmiHousesLords = [
    rashiLords[houses[1] - 1],
    rashiLords[houses[4] - 1],
    rashiLords[houses[8] - 1],
    rashiLords[houses[10] - 1],
  ];

  // const saturnDhanLaxmi = dhanLaxmiHousesLords.includes("Saturn");

  let planetIndex = [];
  planetNames.map(
    (p, i) =>
      dhanLaxmiHousesLords.includes(p.charAt(0).toUpperCase() + p.slice(1)) &&
      planetIndex.push(p),
  );
  // console.log(dhanLaxmiHouses, dhanLaxmiHousesLords, planetIndex);

  let sortedDhanplanets = [];
  dhanLaxmiHousesLords.map(
    (p) =>
      planets[p.toLowerCase()].stat === "clean" &&
      !sortedDhanplanets.includes(
        planets[p.toLowerCase()].name.toLowerCase(),
      ) &&
      sortedDhanplanets.push(planets[p.toLowerCase()].name.toLowerCase()),
  );

  // console.log(sortedDhanplanets);
  let inDhanRashi = [];
  let dhanDrushti = [];
  sortedDhanplanets.map((p) => {
    // console.log(hName[dhanLaxmiHousesLords.indexOf(planets[p].name)]);
    if (dhanLaxmiHouses.includes(planets[p].rashi))
      dhanLaxmi.push({
        Dhan_Yog: `1 Dhan Yog - ${hName[dhanLaxmiHousesLords.indexOf(planets[p].name)]} house lord ${planets[p].name} is in ${hName[dhanLaxmiHouses.indexOf(planets[p].rashi)]} house.`,
      });
    planets[p].drushtiOnRashi.map((d) => {
      dhanLaxmiHouses.includes(d) &&
        dhanLaxmi.push({
          Dhan_Yog: `2 Dhan Yog - ${hName[dhanLaxmiHousesLords.indexOf(planets[p].name)]} house lord ${planets[p].name}'s drushti on ${hName[dhanLaxmiHouses.indexOf(d)]} house.`,
        });
    });
  });
  // console.log("inDhanRashi", inDhanRashi);

  inDhanRashi.length > 0 &&
    dhanLaxmi.push({
      Dhan_Yog: inDhanRashi.join(" "),
    });

  dhanDrushti.length > 0 &&
    dhanLaxmi.push({
      Dhan_Yog: dhanDrushti.join(" "),
    });

  // console.log("DhanLaxmi yog checked");

  // Laxmi yog
  const NinthLordExhalted =
    uchaRashi[planetNames.indexOf(dhanLaxmiHousesLords[2].toLowerCase())] ===
    planets[dhanLaxmiHousesLords[2].toLowerCase()].rashi;
  // const lagnaLord = houses[0];
  if (
    lagnaLord.lagnaStarSta !== "" &&
    lagnaLord.weakLagn !== "" &&
    lagnaLord.lagnLordYuti !== "" &&
    NinthLordExhalted
  )
    dhanLaxmi.push({
      Laxmi_Yog: `3 Ninth Lord ${dhanLaxmiHousesLords[2]} is Exhalted and Lagna lord strong is creating Laxmi yog.`,
    });

  // Mahadhan yog
  if (
    planets[dhanLaxmiHousesLords[0].toLowerCase()].rashi ===
      planets[dhanLaxmiHousesLords[3].toLowerCase()].rashi &&
    planets[dhanLaxmiHousesLords[0].toLowerCase()].name !==
      planets[dhanLaxmiHousesLords[0].toLowerCase()].name
  )
    dhanLaxmi.push({
      Maha_Dhan_Yog: `4 Second house Lord ${dhanLaxmiHousesLords[0]} and Eleventh house Lord ${dhanLaxmiHousesLords[3]} in yuti is creating Maha Dhan Yog.`,
    });
  planets[dhanLaxmiHousesLords[0].toLowerCase()].drushtiOnRashi.map((d) => {
    if (d === dhanLaxmiHousesLords[3].rashi)
      dhanLaxmi.push({
        Maha_Dhan_Yog: `5 Second house Lord ${dhanLaxmiHousesLords[0]}'s drushti on Eleventh house Lord ${dhanLaxmiHousesLords[3]} is creating Maha Dhan Yog.`,
      });
  });
  planets[dhanLaxmiHousesLords[3].toLowerCase()].drushtiOnRashi.map((d) => {
    if (d === dhanLaxmiHousesLords[0].rashi)
      dhanLaxmi.push({
        Maha_Dhan_Yog: `6 Eleventh house Lord ${dhanLaxmiHousesLords[3]}'s drushti on Second house Lord ${dhanLaxmiHousesLords[0]} is creating Maha Dhan Yog.`,
      });
  });

  // Adhi yog
  const shubh = ["jupiter", "venus"];
  const m6 = (Number(moon.rashi) + 5) % 12;
  const m7 = (Number(moon.rashi) + 6) % 12;
  const m8 = (Number(moon.rashi) + 7) % 12;
  shubh.map((p) => {
    planets[p].rashi === m6 &&
      dhanLaxmi.push({
        Adhi_Yog: `7 ${planets[p].name} is sixth from moon and forming Adhi yog.`,
      });

    planets[p].rashi === m7 &&
      dhanLaxmi.push({
        Adhi_Yog: `8 ${planets[p].name} is seventh from moon and forming Adhi yog.`,
      });

    planets[p].rashi === m8 &&
      dhanLaxmi.push({
        Adhi_Yog: `9 ${planets[p].name} is eight from moon and forming Adhi yog.`,
      });
  });
  // console.log("dhanalaxmi Calculated", dhanLaxmi);
  return dhanLaxmi.length > 0 && dhanLaxmi;
};
