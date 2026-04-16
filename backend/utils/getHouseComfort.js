export function getHouseComfort(planet, rashi) {
  let comfort = "";
  comfort = planet?.ownRashi?.includes(rashi)
    ? "Own Rashi"
    : planet?.friendsRashi?.includes(rashi)
      ? "Friend Rashi"
      : planet?.enemyRashi?.includes(rashi)
        ? "Enemy Rashi"
        : planet?.neutrlRashi?.includes(rashi)
          ? "Neutrl Rshi"
          : "";

  return comfort;
}
