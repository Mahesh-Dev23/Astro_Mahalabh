export const getDoshas = (planets, lagna) => {
  let doshas = [];

  // pitrudosh -------
  const pituDosha = (planets, lagna) => {
    let pdosha = [];
    planets[0].rashi == 7 && pdosha.push(1);

    planets[7].rashi == (lagna + 8) % 12 && pdosha.push("Rahu");
    planets[8].rashi == (lagna + 8) % 12 && pdosha.push("ketu"); // ketu is last planet in the list
    pdosha.length > 0 && doshas.push("Pitru Dosha");
  };

  // Angarak Dosh -------------
  const angarakDosh = (Mangal, Rahu) =>
    Mangal == Rahu && doshas.push("Angarak Dosh");

  // Vish Dosh --------------------
  const vishDosh = (planets, lagna) => {
    let vdosh = [];
    planets[0].rashi == planets[6].rashi && vdosh.push("Surya, Shani yuti");
    planets[1].rashi == planets[6].rashi && vdosh.push("Chadra, Shani yuti");
    planets[2].rashi == planets[6].rashi && vdosh.push("Mangal, Shani yuti");
    vdosh.length > 0 && doshas.push("Vish Dosha");
  };

  // Amavasya Dosh ---------------------
  const amavasyaDosh = (sun, moon) =>
    sun == moon && doshas.push("Amavasya Dosh");

  // Shapit Dosh -------------------------
  const shapitDosh = (shani, rahu) =>
    shani == rahu && doshas.push("Shani Rahu Shapit Dosh");

  // Grahan Dosh -------------------------
  const grahanDosh = (planets) => {
    let gDosh = [];
    planets[0].rashi == planets[7].rashi && gDosh.push("Surya, Rahu yuti");
    planets[1].rashi == planets[7].rashi && gDosh.push("Surya, Rahu yuti");
    gDosh.length > 0 && doshas.push("Grahan Dosha");
  };

  // Guru Chandal Dosh -------------------
  const guruChandalDosh = (planets) => {
    let gcDosh = [];
    planets[4].rashi == planets[7].rashi && gcDosh.push("Surya, Rahu yuti");
    planets[4].rashi == planets[8].rashi && gcDosh.push("Surya, Ketu yuti");
    gcDosh.length > 0 && doshas.push("Guru Chandal Dosha");
  };

  pituDosha(planets, lagna);
  angarakDosh(planets[2].rashi, planets[7].rashi);
  vishDosh(planets, lagna);
  amavasyaDosh(planets[0].rashi, planets[1].rashi);
  shapitDosh(planets[6].rashi, planets[7].rashi);
  grahanDosh(planets);
  guruChandalDosh(planets);

  doshas.length == 0 &&
    doshas.push("Congratulations no doshas in this Kundali");
  return doshas;
};
