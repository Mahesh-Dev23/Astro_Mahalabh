export const calculateFullAshtakavarga = (positions, rules) => {
  // 1. Normalize positions to lowercase keys to match JSON rules
  const normalizedPos = {};
  Object.keys(positions).forEach((key) => {
    normalizedPos[key.toLowerCase()] = positions[key];
  });

  const result = {
    total: new Array(12).fill(0), // The SAV array (12 signs)
    grandTotalPoints: 0, // This should sum to 337
  };

  // 2. Loop through each planet's rule set
  Object.keys(rules).forEach((mainEntity) => {
    const entityRules = rules[mainEntity];
    const bavArray = new Array(12).fill(0);

    for (let signIndex = 0; signIndex < 12; signIndex++) {
      const currentSign = signIndex + 1; // Signs are 1-12
      let pointsForThisSign = 0;

      // 3. Check contributions from all references (Sun, Moon, etc.)
      Object.keys(entityRules).forEach((refKey) => {
        const refName = refKey.replace("from", "").toLowerCase();
        const refPos = normalizedPos[refName];

        if (refPos !== undefined) {
          // Calculate relative house (1-12)
          let relativeHouse = currentSign - refPos + 1;
          if (relativeHouse <= 0) relativeHouse += 12;

          if (entityRules[refKey].includes(relativeHouse)) {
            pointsForThisSign++;
          }
        }
      });

      bavArray[signIndex] = pointsForThisSign;

      // 4. Update SAV Total (Standard SAV excludes Lagna points from the 337 sum)
      if (mainEntity !== "lagna") {
        result.total[signIndex] += pointsForThisSign;
      }
    }

    // Save individual Bhinnashtakavarga (BAV)
    result[mainEntity] = bavArray;
  });

  // 5. Final validation: Sum up the entire SAV array
  result.grandTotalPoints = result.total.reduce((acc, val) => acc + val, 0);

  return result;
};
