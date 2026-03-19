import { rashiLords, FRIENDS } from "../../constants/names.js";
// const FRIENDS = {
//   Sun: ["Moon", "Mars", "Jupiter"],
//   Moon: ["Sun", "Mercury"],
//   Mars: ["Sun", "Moon", "Jupiter"],
//   Mercury: ["Sun", "Venus"],
//   Jupiter: ["Sun", "Moon", "Mars"],
//   Venus: ["Mercury", "Saturn"],
//   Saturn: ["Mercury", "Venus"],
// };

export function getGrahaMaitriScore(boyRashi, girlRashi) {
  const boyLord = rashiLords[boyRashi];
  const girlLord = rashiLords[girlRashi];

  if (FRIENDS[boyLord]?.includes(girlLord)) return 5;

  return 3;
}
