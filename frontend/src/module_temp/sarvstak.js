/**
 * Calculates both Bhinnashtakavarga (BAV) and Sarvashtakavarga (SAV)
 * @param {Object} positions - { sun: 1, moon: 5, ... lagna: 1 }
 * @param {Object} rules - The full SAV JSON rules
 * @returns {Object} - Individual planet arrays and the total SAV array
 */
export const calculateFullAshtakavarga = (positions, rules) => {
  const result = {
    total: new Array(12).fill(0), // This will be your SAV
  };

  // 1. Calculate BAV for each entity (7 planets + Lagna)
  Object.keys(rules).forEach((mainEntity) => {
    const entityRules = rules[mainEntity];
    const baveArray = new Array(12).fill(0);
    // console.log("main ", baveArray);

    for (let sign = 1; sign <= 12; sign++) {
      let pointsForThisSign = 0;

      // Check contributions from all references
      Object.keys(entityRules).forEach((refKey) => {
        const refName = refKey.replace("from", "").toLowerCase();
        const refPos = positions[refName];
        // console.log("ref", refName, refPos);

        if (refPos) {
          let relativeHouse = sign - refPos + 1;
          if (relativeHouse <= 0) relativeHouse += 12;

          if (entityRules[refKey].includes(relativeHouse)) {
            pointsForThisSign++;
          }
        }
      });

      baveArray[sign - 1] = pointsForThisSign;

      // 2. Add to SAV (Only include the 7 planets for standard 337 total)
      // Usually, Lagna BAV is kept separate and not added to the 337 total.
      if (mainEntity !== "lagna") {
        result.total[sign - 1] += pointsForThisSign;
      }
    }

    // Store the individual BAV array
    result[mainEntity] = baveArray;
    // console.log("bavearray ", result);
  });

  return result;
};
