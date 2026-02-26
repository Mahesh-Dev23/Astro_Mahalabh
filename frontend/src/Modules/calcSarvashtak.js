/**
 * Calculates Sarvashtakavarga (SAV) points for all 12 signs.
 * @param {Object} positions - Current rashi for each planet { sun: 1, moon: 5, ... }
 * Note: Rashi should be 1-12.
 * @param {Object} rules - The full SAV JSON rules provided previously.
 * @returns {number[]} - An array of 12 integers representing SAV points for each sign.
 */
export const calculateSAV = (positions, rules) => {
  // Initialize SAV array with 0 for each of the 12 signs
  const savScorecard = new Array(12).fill(0);

  // 1. Iterate through each main planet (Sun, Moon, etc.) to calculate their Bhinnashtakavarga
  Object.keys(rules).forEach((mainPlanet) => {
    const planetRules = rules[mainPlanet];

    // 2. For each sign (1 to 12), check if it receives a point
    for (let sign = 1; sign <= 12; sign++) {
      let housePointsForThisSign = 0;

      // 3. Check contributions from all 7 planets + Lagna
      Object.keys(planetRules).forEach((refKey) => {
        // refKey looks like "fromSun", "fromMoon", etc.
        const refPlanetName = refKey.replace("from", "").toLowerCase();
        const refPlanetPosition = positions[refPlanetName];

        if (refPlanetPosition) {
          // Calculate the house distance from the reference planet to the current sign
          // Formula: (Target Sign - Reference Sign + 1). Adjust for wrap-around.
          let relativeHouse = sign - refPlanetPosition + 1;
          if (relativeHouse <= 0) relativeHouse += 12;

          // If this relative house is in the benefic list for this planet, add a point
          if (planetRules[refKey].includes(relativeHouse)) {
            housePointsForThisSign++;
          }
        }
      });

      // 4. Add the points from this planet's Bhinnashtakavarga to the total SAV
      savScorecard[sign - 1] += housePointsForThisSign;
    }
  });

  return savScorecard;
};
