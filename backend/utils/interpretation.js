/**
 * Detects major Vedic Astrological events
 * @param {Object} natal - Natal data (rashi positions)
 * @param {Object} transits - Current sky positions
 */
function detectKeyEvents(natal, transits) {
  const alerts = [];

  // 1. Get Moon and Jupiter Rashi
  const natalMoon = natal.planets.find((p) => p.name === "Moon").rashi;
  const natalJupiter = natal.planets.find((p) => p.name === "Jupiter").rashi;
  const transitSaturn = transits.find((p) => p.name === "Saturn").currentRashi;
  const transitJupiter = transits.find(
    (p) => p.name === "Jupiter",
  ).currentRashi;

  // 2. Detect Sade Sati (Saturn in 12th, 1st, or 2nd from Moon)
  const housesFromMoon = ((transitSaturn - natalMoon + 12) % 12) + 1;
  if ([12, 1, 2].includes(housesFromMoon)) {
    alerts.push({
      type: "Sade Sati",
      severity: "High",
      message: `Saturn is currently in house ${housesFromMoon} from your Moon. This is a period of transformation and discipline.`,
    });
  }

  // 3. Detect Jupiter Return
  if (natalJupiter === transitJupiter) {
    alerts.push({
      type: "Jupiter Return",
      severity: "Positive",
      message:
        "Jupiter has returned to its natal position. This happens every 12 years and marks a new cycle of growth and wisdom.",
    });
  }

  return alerts;
}

module.exports = { detectKeyEvents };
