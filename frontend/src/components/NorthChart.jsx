import React from "react";
import PlanetStack from "./PlanetStack"; // <-- 1. Import the component

const NorthChart = ({ lagnaRashi, planets }) => {
  // 2. Logic to find which Rashi belongs in which House
  const getRashiForHouse = (houseNum) => ((lagnaRashi + houseNum - 2) % 12) + 1;

  // 3. Group planets by house number (1-12)
  const grouped = planets.reduce((acc, p) => {
    const house = ((p.rashi - lagnaRashi + 12) % 12) + 1;
    if (!acc[house]) acc[house] = [];
    acc[house].push(p);
    return acc;
  }, {});

  return (
    <div className="chart-wrapper">
      <svg width="400" height="400" viewBox="0 0 400 400" className="chart-svg">
        {/* Geometry Lines */}
        <line x1="0" y1="0" x2="400" y2="400" stroke="var(--chart-line)" />
        <line x1="400" y1="0" x2="0" y2="400" stroke="var(--chart-line)" />
        <path
          d="M200 0 L0 200 L200 400 L400 200 Z"
          fill="none"
          stroke="var(--chart-line)"
          strokeWidth="2"
        />

        {/* Loop through all 12 houses */}
        {[...Array(12)].map((_, i) => {
          const houseNum = i + 1;
          const rashi = getRashiForHouse(houseNum);

          return (
            <g key={houseNum}>
              {/* Rashi Number Label */}
              {/* <text
                x={houseCoordsForRashi[houseNum]?.x}
                y={houseCoordsForRashi[houseNum]?.y}
                fill="red"
                fontSize="14"
                textAnchor="middle"
              > */}
              {rashi}
              {/* </text> */}

              {/* 4. Use PlanetStack here if this house contains planets */}
              {grouped[houseNum] && (
                <PlanetStack house={houseNum} pList={grouped[houseNum]} />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default NorthChart;
