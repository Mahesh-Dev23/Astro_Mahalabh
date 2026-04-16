export const getDoshas = (planets, lagna) => {
  let doshas = [];

  // pitrudosh -------
  const pituDosha = (planets, lagna) => {
    let pdosha = [];
    planets[0].rashi === 7 && pdosha.push(1);

    planets[7].rashi === (lagna + 8) % 12 && pdosha.push("Rahu");
    planets[8].rashi === (lagna + 8) % 12 && pdosha.push("ketu"); // ketu is last planet in the list
    pdosha.length > 0 && doshas.push("Pitru Dosha");
  };

  // Angarak Dosh -------------
  const angarakDosh = (Mangal, Rahu) =>
    Mangal === Rahu && doshas.push("Angarak Dosh");

  // Vish Dosh --------------------
  const vishDosh = (planets) => {
    let vdosh = [];
    planets[0].rashi === planets[6].rashi && vdosh.push("Surya, Shani yuti");
    planets[1].rashi === planets[6].rashi && vdosh.push("Chadra, Shani yuti");
    planets[2].rashi === planets[6].rashi && vdosh.push("Mangal, Shani yuti");
    vdosh.length > 0 && doshas.push("Vish Dosha");
  };

  // Amavasya Dosh ---------------------
  const amavasyaDosh = (sun, moon) =>
    sun === moon && doshas.push("Amavasya Dosh");

  // Shapit Dosh -------------------------
  const shapitDosh = (shani, rahu) =>
    shani === rahu && doshas.push("Shani Rahu Shapit Dosh");

  // Grahan Dosh -------------------------
  const grahanDosh = (planets) => {
    let gDosh = [];
    planets[0].rashi === planets[7].rashi && gDosh.push("Surya, Rahu yuti");
    planets[1].rashi === planets[7].rashi && gDosh.push("Surya, Rahu yuti");
    gDosh.length > 0 && doshas.push("Grahan Dosha");
  };

  // Guru Chandal Dosh -------------------
  const guruChandalDosh = (planets) => {
    let gcDosh = [];
    planets[4].rashi === planets[7].rashi && gcDosh.push("Guru, Rahu yuti");
    planets[4].rashi === planets[8].rashi && gcDosh.push("Guru, Ketu yuti");
    gcDosh.length > 0 && doshas.push("Guru Chandal Dosha");
  };

  // cehck Manglik ---------------------------
  const isManglik = (Mars, Jupiter, lagna) => {
    let isManglik = false;
    let manglikDosh = "";
    const manglikHouses = [
      lagna,
      (Number(lagna) + 1) % 12,
      (Number(lagna) + 3) % 12,
      (Number(lagna) + 6) % 12,
      (Number(lagna) + 7) % 12,
      (Number(lagna) + 11) % 12,
    ];

    // manglik house replace 0 with 12
    let manglikHousesIndex =
      manglikHouses.includes(0) && manglikHouses.indexOf(0);
    manglikHouses[manglikHousesIndex] = 12;

    // // get gurudrushti
    // const guruDrushti = Jupiter?.drushti.map(
    //   (d) => (Number(Jupiter.rashi) + d) % 12,
    // );

    // // guru drushti replace 0 with 12
    // let guruIndex = guruDrushti.includes(0) && guruDrushti.indexOf(0);
    // guruDrushti[guruIndex] = 12;
    isManglik = manglikHouses.includes(Mars.rashi);
    manglikDosh =
      isManglik && Mars.rashi === Jupiter.rashi
        ? "Saumya Manglik Dosh, Guru Mangal Yuti, upto 28 years of age"
        : isManglik && Jupiter?.drushti.includes(Mars.rashi)
          ? "Saumya Manglik Dosh, Guru drushti on Mangal, upto 28 years of age"
          : "Purna Magnlik Dosh for life time";
    isManglik && doshas.push(manglikDosh);
    // console.log(Jupiter.rashi);
  };

  pituDosha(planets, lagna);
  angarakDosh(planets[2].rashi, planets[7].rashi);
  vishDosh(planets, lagna);
  amavasyaDosh(planets[0].rashi, planets[1].rashi);
  shapitDosh(planets[6].rashi, planets[7].rashi);
  grahanDosh(planets);
  guruChandalDosh(planets);
  isManglik(planets[2], planets[4], lagna);

  doshas.length === 0 &&
    doshas.push("Congratulations no doshas in this Kundali");
  return doshas;
};
