export async function calculateNavamsa(day, month, year, hour, lat, lng) {
  //   console.log("navmansha", jd);
  // Helper to find D9 Sign (1-12)
  const getD9Sign = (totalDegree) => {
    const signIndex = Math.floor(totalDegree / 30); // 0 = Aries, 1 = Taurus...
    const degreeInSign = totalDegree % 30;
    const navIndex = Math.floor(degreeInSign / (3 + 1 / 3)); // 3°20' increments
    // Starting signs for Fire, Earth, Air, Water groups
    const startSigns = [0, 9, 6, 3];
    const elementGroup = signIndex % 4;
    const d9Sign = (startSigns[elementGroup] + navIndex) % 12;
    return d9Sign + 1; // Return 1-12 range
  };
  //   console.log(getD9Sign(totalDegree));
  async function getNavmanshaChart(req, res) {
    const { day, month, year, hour, lat, lng } = req.query;
    // 1. Set JulDay
    const julDay = SwissEph.swe_julday(
      parseInt(year),
      parseInt(month),
      parseInt(day),
      parseFloat(hour),
      SwissEph.SE_GREG_CAL,
    );
    // 2. Calculate Planets
    const planets = {
      Sun: SwissEph.SE_SUN,
      Moon: SwissEph.SE_MOON,
      Mars: SwissEph.SE_MARS,
      Mercury: SwissEph.SE_MERCURY,
      Jupiter: SwissEph.SE_JUPITER,
      Venus: SwissEph.SE_VENUS,
      Saturn: SwissEph.SE_SATURN,
      Rahu: SwissEph.SE_MEAN_NODE,
    };
    let d9Positions = {};
    // Get Ascendant (Lagna) first
    const houses = SwissEph.swe_houses(
      julDay,
      parseFloat(lat),
      parseFloat(lng),
      "P",
    );
    const d1LagnaDegree = houses.ascendant;
    const d9LagnaSign = getD9Sign(d1LagnaDegree);
    // Calculate D9 Sign for each planet
    Object.keys(planets).forEach((name) => {
      const body = SwissEph.swe_calc_ut(
        julDay,
        planets[name],
        SwissEph.SEFLG_SIDEREAL,
      );
      d9Positions[name] = getD9Sign(body.longitude);
    });
    // Add Rahu's opposite (Ketu)
    d9Positions["Ketu"] = ((d9Positions["Rahu"] + 5) % 12) + 1;
    // 3. Map to "houseData" object (Relative to Lagna)
    // In North Indian charts, House 1 is the Lagna sign
    const houseData = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
    };
    Object.keys(d9Positions).forEach((planet) => {
      const planetSign = d9Positions[planet];
      // Calculate which house the sign falls into relative to Lagna
      // Example: If Lagna is 6 and Planet is 8, House = (8 - 6 + 1) = 3
      let houseNum = planetSign - d9LagnaSign + 1;
      if (houseNum <= 0) houseNum += 12;
      houseData[houseNum].push(planet);
    });
    await res.json({
      d9Lagna: d9LagnaSign,
      houseData: houseData,
    });
  }
  return getNavmanshaChart(day, month, year, hour, lat, lng);
}

// module.exports = { getNavmanshaChart };
// export default getNavmanshaChart();
