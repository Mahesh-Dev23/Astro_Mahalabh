const groupPlanetsByHouse = (planets, lagnaRashi) => {
  return planets.reduce((acc, planet) => {
    // 1. Calculate the House (1-12)
    const house = ((planet.rashi - lagnaRashi + 12) % 12) + 1;

    // 2. Initialize the array for this house if it doesn't exist
    if (!acc[house]) {
      acc[house] = [];
    }

    // 3. Push the planet into its house group
    acc[house].push(planet);

    return acc;
  }, {});
};
