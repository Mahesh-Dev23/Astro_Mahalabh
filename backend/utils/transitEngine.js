const { getKundliData } = require("../astroEngine");

async function getTransitComparison(natalData, currentLat, currentLon) {
  // 1. Get current UTC Time
  const now = new Date();

  // 2. Calculate current planetary positions
  const transitData = await getKundliData(now, currentLat, currentLon);

  // 3. Map transits relative to Natal Houses
  const comparisons = transitData.planets.map((tPlanet) => {
    const natalLagna = natalData.lagnaRashi;
    // Calculate which Natal House the current planet is moving through
    const currentHouse = ((tPlanet.rashi - natalLagna + 12) % 12) + 1;

    return {
      name: tPlanet.name,
      currentRashi: tPlanet.rashi,
      natalHouse: currentHouse,
      isRetrograde: tPlanet.isRetrograde, // You'd add this flag in astroEngine
    };
  });

  return {
    timestamp: now,
    transits: comparisons,
  };
}
