import React from "react";

const NorthChart = ({ lagnaRashi, planets }) => {
  const getRashiForHouse = (houseNum) => ((lagnaRashi + houseNum - 2) % 12) + 1;

  // Group planets by house for stacking
  const grouped = planets.reduce((acc, p) => {
    const house = ((p.rashi - lagnaRashi + 12) % 12) + 1;
    if (!acc[house]) acc[house] = [];
    acc[house].push(p.name.substring(0, 2));
    return acc;
  }, {});

  const houseCenters = {
    1: { x: 200, y: 130 },
    2: { x: 120, y: 70 },
    3: { x: 70, y: 120 },
    4: { x: 130, y: 200 },
    5: { x: 70, y: 280 },
    6: { x: 120, y: 330 },
    7: { x: 200, y: 270 },
    8: { x: 280, y: 330 },
    9: { x: 330, y: 280 },
    10: { x: 270, y: 200 },
    11: { x: 330, y: 120 },
    12: { x: 280, y: 70 },
  };

  return (
    <svg width="400" height="400" viewBox="0 0 400 400" className="chart-svg">
      {/* Geometry Lines */}
      <line x1="0" y1="0" x2="400" y2="400" stroke="black" />
      <line x1="400" y1="0" x2="0" y2="400" stroke="black" />
      <path
        d="M200 0 L0 200 L200 400 L400 200 Z"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />

      {/* Rashi Numbers & Planets */}
      {Object.keys(houseCenters).map((house) => {
        const natalPlanets = groupedNatal[house] || [];
        const transitPlanets = groupedTransits[house] || [];

        return (
          <g key={house}>
            {/* Rashi Number */}
            <text
              x={houseCenters[house].x}
              y={houseCenters[house].y}
              className="rashi-num"
            >
              {getRashiForHouse(house)}
            </text>

            {/* Natal Planets (Bottom of house) */}
            {natalPlanets.map((p, i) => (
              <text
                key={p}
                x={houseCenters[house].x}
                y={houseCenters[house].y + 20 + i * 12}
                className="natal-planet-text"
              >
                {p}
              </text>
            ))}

            {/* Transit Planets (Top of house - highlighted) */}
            {transitPlanets.map((p, i) => (
              <text
                key={p}
                x={houseCenters[house].x}
                y={houseCenters[house].y - 20 - i * 12}
                className="transit-planet-text"
              >
                {p} (T)
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
};

export default NorthChart;
