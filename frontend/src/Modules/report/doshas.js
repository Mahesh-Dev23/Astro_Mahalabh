export const getDoshas = (planets, lagna, lagnaLord) => {
  const { sun, moon, mars, mercury, jupiter, venus, saturn, rahu, ketu } =
    planets;
  let doshas = [];

  // pitrudosh -------
  const pituDosha = (sun, rahu, ketu, lagna) => {
    let pdosha = [];
    sun.dignity === "Debilitated" && pdosha.push("Sun is Debilitated!");
    const ninthHouse = (lagna + 8) % 12;
    rahu.rashi === ninthHouse && pdosha.push("Rahu in ninth house");
    rahu.drushtiOnRashi.includes(ninthHouse) &&
      pdosha.push("Rahu's drusti on Ninth House");
    ketu.rashi === ninthHouse && pdosha.push("Ketu in ninth house"); // ketu is last planet in the list
    ketu.drushtiOnRashi.includes(ninthHouse) &&
      pdosha.push("Ketu's drusti on Ninth House");
    pdosha.length > 0 &&
      doshas.push({ Pitru_Dosha: `Pitru Dosha, ${pdosha.join(" ")}` });
  };

  // Angarak Dosh -------------
  const angarakDosh = (Mangal, Rahu) =>
    Mangal === Rahu &&
    doshas.push({
      Angarak_Dosh: `Mangal Rahu yuti in ${Mangal.houseNumber} hous is creating Angarak Dosh.`,
    });

  // Kemsdrum Dosh --------------------
  moon.kartari === "Kemadrum Dosh" &&
    doshas.push({
      Kemdrum_Dosh:
        "No planet in moon's rashi or moon's previous rashi or moon's next rashi forms Kemadrum Dosh.",
    });
  // Vish Dosh --------------------
  const vishDosh = (sun, moon, mars, saturn) => {
    let vdosh = [];
    sun === saturn && vdosh.push("Surya, Shani yuti");
    moon === saturn && vdosh.push("Chadra, Shani yuti");
    mars === saturn && vdosh.push("Mangal, Shani yuti");
    vdosh.length > 0 &&
      doshas.push({ Vish_Dosha: `${vdosh.join()} is creating Vish Dosha.` });
  };

  // Amavasya Dosh ---------------------
  const amavasyaDosh = (sun, moon) =>
    sun === moon &&
    doshas.push({
      Amavasya_Dosh: "Sun and Moon yuti is creating Amavasya Dosh.",
    });

  // Shapit Dosh -------------------------
  const shapitDosh = (shani, rahu) =>
    shani === rahu &&
    doshas.push({ Shapit_Dosh: "Shani Rahu yuti is creating Shapit Dosh." });

  // Grahan Dosh -------------------------
  const grahanDosh = (sun, moon, rahu) => {
    let gDosh = [];
    sun === rahu && gDosh.push("Sun, Rahu yuti");
    moon === rahu && gDosh.push("Moon, Rahu yuti");
    gDosh.length > 0 &&
      doshas.push({ Grahan_Dosha: `${gDosh.join()} Grahan Dosha.` });
  };

  // Guru Chandal Dosh -------------------
  const guruChandalDosh = (guru, rahu, ketu) => {
    let gcDosh = [];
    guru === rahu && gcDosh.push("Guru, Rahu yuti");
    guru === ketu && gcDosh.push("Guru, Ketu yuti");
    gcDosh.length > 0 &&
      doshas.push({
        Guru_Chandal_Dosha: `${gcDosh.join()} Guru Chandal Dosha.`,
      });
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

    isManglik = manglikHouses.includes(Mars.rashi);
    manglikDosh =
      isManglik && Mars.rashi === Jupiter.rashi
        ? "Saumya Manglik Dosh, Guru Mangal Yuti, upto 28 years of age"
        : isManglik && Jupiter?.drushtiOnRashi.includes(Mars.rashi)
          ? "Saumya Manglik Dosh, Guru drushti on Mangal, upto 28 years of age"
          : "Purna Magnlik Dosh for life time";
    isManglik && doshas.push({ Manglik_Dosh: manglikDosh });
    // console.log(Jupiter.rashi);
  };

  pituDosha(sun, rahu, ketu, lagna);
  angarakDosh(mars, rahu);
  vishDosh(sun.rashi, moon.rashi, mars.rashi, saturn.rashi);
  amavasyaDosh(sun.rashi, moon.rashi);
  shapitDosh(saturn.rashi, rahu.rashi);
  grahanDosh(sun.rashi, moon.rashi, rahu.rashi);
  guruChandalDosh(jupiter.rashi, rahu.rashi, ketu.rashi);
  isManglik(mars, jupiter, lagna);

  doshas.length === 0 &&
    doshas.push({ No_Doshas: "Congratulations no doshas in this Kundali" });
  return doshas;
};
