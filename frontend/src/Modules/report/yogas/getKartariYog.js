export const getKartariYog = (planet, planets) => {
  const previousRashi = planet.rashi - 1 === 0 ? 12 : planet.rashi - 1;
  const nextRashi = planet.rashi + 1 === 0 ? 12 : planet.rashi + 1;
  let planetsInPreRashi = [];
  let PlanetsInNextRashi = [];
  let sameRashi = [];

  const shubh = ["Moon", "Jupiter", "Venus"];
  const ashubh = ["Sun", "Mars", "Saturn", "Rahu", "Ketu"];
  planets.map((p) => {
    p.rashi === previousRashi && planetsInPreRashi.push(p.name);
    p.rashi == nextRashi && PlanetsInNextRashi.push(p.name);
    p.name !== planet.name &&
      p.rashi === planet.rashi &&
      sameRashi.push(p.name);
  });

  let kartari = "";
  kartari =
    shubh.includes(planetsInPreRashi) &&
    shubh.includes(PlanetsInNextRashi) &&
    !ashubh.includes(planetsInPreRashi) &&
    !ashubh.includes(PlanetsInNextRashi) &&
    "Shubh Kartari";
  kartari =
    ashubh.includes(planetsInPreRashi) &&
    ashubh.includes(PlanetsInNextRashi) &&
    "Pap Kartari";
  kartari =
    planet.name === "Moon" &&
    planetsInPreRashi.length === 0 &&
    PlanetsInNextRashi.length === 0 &&
    sameRashi.length === 0 &&
    "Kemadrum Dosh";
  return kartari;
};
