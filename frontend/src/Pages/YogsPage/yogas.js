export const getYogas = (planets, lagna) => {
  //   console.log(planets[4].rashi, lagna + 6);
  let yogas = [];
  let kendras = [lagna, lagna + 3, lagna + 6, lagna + 9];
  let uchaRashi = [1, 2, 10, 6, 4, 12, 7];
  let nichRashi = [7, 8, 4, 12, 10, 6, 1];
  let nichRashilord = [5, 2, 1, 4, 6, 3, 0];
  //   uchaRashi.map((p) => console.log((p + 6) % 12));

  // Gajakesari Yog
  const gajakesari = (guru, chandra, lagna) => {
    guru.rashi !== 10 &&
      chandra.rashi != 8 &&
      kendras.includes(guru.rashi) &&
      kendras.includes(chandra.rashi) &&
      yogas.push("Gajakesari Yog");
  };

  // Bhdhaditya yog
  const budhaditya = (sun, budh) => {
    sun.rashi != 7 && sun.rashi == budh.rashi && yogas.push("Budhaditya Yog");
  };

  // Nichbhang rajyog
  const nichbhang = (planets, nichRashi) => {
    planets.map((p, i) => {
      p.rashi == nichRashi[i] &&
        planets[nichRashilord[i]].rashi == uchaRashi[i] &&
        yogas.push("Nichbhang Raj Yog");
      // console.log(
      //   p.name,
      //   p.rashi,
      //   planets[nichRashilord[i]].name,
      //   uchaRashi[i],
      // );
    });
  };

  gajakesari(planets[4], planets[1], lagna);
  budhaditya(planets[0], planets[3]);
  nichbhang(planets, nichRashi);
  yogas.length == 0 && yogas.push("No yogas in this Kundali");
  return yogas;
};
