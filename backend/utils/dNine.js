function getD9Sign(totalDegree) {
  const signIndex = Math.floor(totalDegree / 30) + 1; // 0 = Aries, 1 = Taurus...
  //   console.log("d9 0", totalDegree, signIndex); //ok
  const degreeInSign = totalDegree % 30;
  const navIndex = Math.floor(degreeInSign / (3 + 1 / 3)); // 3°20' increments
  // Starting signs for Fire, Earth, Air, Water groups
  //   console.log("d9 1", degreeInSign, navIndex);
  const startSigns = [0, 9, 6, 3];
  const elementGroup = signIndex % 4;
  const d9Sign = (startSigns[elementGroup] + navIndex) % 12;
  // console.log("d9 2", d9Sign);

  const divisionIndex = Math.floor(totalDegree / (3 + 20 / 60));
  const navamshaSign = (divisionIndex % 12) + 1;
  // console.log("d9 3", navamshaSign);

  return navamshaSign; // Return 1-12 range
}
// getD9Sign(239.24501143368406);
export function getNavamshaSign(lagnaDegree, planets) {
  const signIndex = getD9Sign(lagnaDegree);

  const degreeInSign = lagnaDegree % 30;
  const navIndex = Math.floor(degreeInSign / (3 + 1 / 3));

  const startSigns = [0, 9, 6, 3];
  const elementGroup = signIndex % 4;
  const d9Sign = (startSigns[elementGroup] + navIndex) % 12;

  const divisionIndex = Math.floor(lagnaDegree / (3 + 20 / 60));
  const navamshaSign = (divisionIndex % 12) + 1;

  // console.log("d9 lagna 9", navamshaSign, d9Sign);

  //   const planetsD9 = planets.map((p) => console.log(p));

  //   const planetsD9 = planets.map((p) => ({
  //     name: p.name,
  //     d9Rashi: getD9Sign(p.longitude),
  //   }));

  const planetsD9 = planets.map((p, i) => {
    // console.log("d9 10", p.degreeInRashi);
    return {
      name: p.name,
      rashi: getD9Sign(p.longitude),
      degreeInRashi: p.degreeInRashi,
      //   rashi: Math.floor(degree / 30) + 1,
      //   degreeInRashi: degree % 30,
      //   longitude: degree,
    };
  });

  //   console.log("d9 5", planetsD9);
  return { lagna: navamshaSign, planets: planetsD9 };
}
