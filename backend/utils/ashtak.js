/**
 * Calculates SAV points for a specific sign
 * @param {number} targetSign - The sign (1-12) you are calculating for
 * @param {Object} planetaryPositions - { Sun: 5, Moon: 2, ... }
 */

export function calculateSAVForSign(targetSign) {
  const benificator = {
    sun: {
      fromSun: [1, 2, 4, 7, 8, 9, 10, 11],
      fromMoon: [3, 6, 10, 11],
      fromMars: [1, 2, 4, 7, 8, 9, 10, 11],
      fromMercury: [3, 5, 6, 9, 10, 11, 12],
      fromJupiter: [5, 6, 9, 11],
      fromVenus: [6, 7, 12],
      fromSaturn: [1, 2, 4, 7, 8, 9, 10, 11],
      fromLagna: [3, 4, 6, 10, 11, 12],
    },
    moon: {
      fromSun: [3, 6, 7, 8, 10, 11],
      fromMoon: [1, 3, 6, 7, 10, 11],
      fromMars: [2, 3, 5, 6, 9, 10, 11],
      fromMercury: [1, 3, 4, 5, 7, 8, 10, 11],
      fromJupiter: [1, 4, 7, 8, 10, 11, 12],
      fromVenus: [3, 4, 5, 7, 9, 10, 11],
      fromSaturn: [3, 5, 6, 11],
      fromLagna: [3, 6, 10, 11],
    },
    mars: {
      fromSun: [3, 5, 6, 10, 11],
      fromMoon: [3, 6, 11],
      fromMars: [1, 2, 4, 7, 8, 10, 11],
      fromMercury: [3, 5, 6, 11],
      fromJupiter: [6, 10, 11, 12],
      fromVenus: [6, 8, 11, 12],
      fromSaturn: [1, 4, 7, 8, 9, 10, 11],
      fromLagna: [1, 3, 6, 10, 11],
    },
    mercury: {
      fromSun: [5, 6, 9, 11, 12],
      fromMoon: [2, 4, 6, 8, 10, 11],
      fromMars: [1, 2, 4, 7, 8, 9, 10, 11],
      fromMercury: [1, 3, 5, 6, 9, 10, 11, 12],
      fromJupiter: [6, 8, 11, 12],
      fromVenus: [1, 2, 3, 4, 5, 8, 9, 11],
      fromSaturn: [1, 2, 4, 7, 8, 9, 10, 11],
      fromLagna: [1, 2, 4, 6, 8, 10, 11],
    },
    jupiter: {
      fromSun: [1, 2, 3, 4, 7, 8, 9, 10, 11],
      fromMoon: [2, 5, 7, 9, 11],
      fromMars: [1, 2, 4, 7, 8, 10, 11],
      fromMercury: [1, 2, 4, 5, 6, 9, 10, 11],
      fromJupiter: [1, 2, 3, 4, 7, 8, 10, 11],
      fromVenus: [2, 5, 6, 9, 10, 11],
      fromSaturn: [3, 5, 6, 12],
      fromLagna: [1, 2, 4, 5, 6, 7, 9, 10, 11],
    },
    venus: {
      fromSun: [8, 11, 12],
      fromMoon: [1, 2, 3, 4, 5, 8, 9, 11, 12],
      fromMars: [3, 5, 6, 9, 11, 12],
      fromMercury: [3, 5, 6, 9, 11],
      fromJupiter: [5, 8, 9, 10, 11],
      fromVenus: [1, 2, 3, 4, 5, 8, 9, 10, 11],
      fromSaturn: [3, 4, 5, 8, 9, 10, 11],
      fromLagna: [1, 2, 3, 4, 5, 8, 9, 11],
    },
    saturn: {
      fromSun: [1, 2, 4, 7, 8, 10, 11],
      fromMoon: [3, 6, 11],
      fromMars: [3, 5, 6, 10, 11, 12],
      fromMercury: [6, 8, 9, 10, 11, 12],
      fromJupiter: [5, 6, 11, 12],
      fromVenus: [6, 11, 12],
      fromSaturn: [3, 5, 6, 11],
      fromLagna: [1, 3, 4, 6, 10, 11],
    },
    lagna: {
      fromSun: [3, 4, 6, 10, 11, 12],
      fromMoon: [3, 6, 10, 11, 12],
      fromMars: [1, 3, 6, 10, 11],
      fromMercury: [1, 2, 4, 6, 8, 10, 11],
      fromJupiter: [1, 2, 4, 5, 6, 7, 9, 10, 11],
      fromVenus: [1, 2, 3, 4, 5, 8, 9, 11],
      fromSaturn: [1, 3, 4, 6, 10, 11],
      fromLagna: [3, 6, 10, 11],
    },
  };
  let totalBindus = 0;

  // Loop through each planet's individual Ashtakavarga
  Object.keys(benificator).forEach((planet) => {
    // Check points contributed to targetSign by all other reference points
    Object.keys(benificator[planet]).forEach((refKey) => {
      const refPlanet = refKey.replace("from", "").toLowerCase();
      const currentPos = benificator[refPlanet];

      // Calculate relative house distance
      let relativeHouse = targetSign - currentPos + 1;
      if (relativeHouse <= 0) relativeHouse += 12;

      // If this relative house is in the benefic list, add a point
      if (benificator[planet][refKey].includes(relativeHouse)) {
        totalBindus++;
      }
    });
  });
  console.log(totalBindus);
  return totalBindus;
}
