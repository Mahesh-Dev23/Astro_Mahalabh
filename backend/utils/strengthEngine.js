const EXALTATION_POINTS = {
  Sun: 10, // Aries
  Moon: 33, // Taurus
  Mars: 298, // Capricorn
  Mercury: 165, // Virgo
  Jupiter: 95, // Cancer
  Venus: 357, // Pisces
  Saturn: 200, // Libra
};

function calculateBasicStrength(planets, lagnaRashi) {
  return planets.map((p) => {
    let score = 0;

    // 1. Dig Bala (Directional Strength)
    // Jupiter/Mercury strong in 1st House, Sun/Mars in 10th, etc.
    const house = ((p.rashi - lagnaRashi + 12) % 12) + 1;
    if ((p.name === "Jupiter" || p.name === "Mercury") && house === 1)
      score += 60;
    if ((p.name === "Sun" || p.name === "Mars") && house === 10) score += 60;
    if (p.name === "Moon" && house === 4) score += 60;
    if (p.name === "Saturn" && house === 7) score += 60;

    // 2. Kendra/Trikona Bonus
    if ([1, 4, 7, 10].includes(house)) score += 30; // Kendra
    if ([5, 9].includes(house)) score += 20; // Trikona

    return {
      name: p.name,
      totalScore: score,
      percentage: Math.min((score / 150) * 100, 100).toFixed(0),
    };
  });
}
