import React from "react";

const PlanetStack = ({ house, pList }) => {
  // Center coordinates for each house to place planet text
  // console.log(house, pList);
  const houseCoords = {
    1: { x: 200, y: 100 },
    2: { x: 120, y: 100 },
    3: { x: 50, y: 100 },
    4: { x: 140, y: 210 },
    5: { x: 75, y: 295 },
    6: { x: 120, y: 345 },
    7: { x: 200, y: 285 },
    8: { x: 280, y: 345 },
    9: { x: 335, y: 295 },
    10: { x: 265, y: 210 },
    11: { x: 370, y: 100 },
    12: { x: 300, y: 50 },
  };

  const { x, y } = houseCoords[house];

  return (
    <g>
      {pList.map((planet, index) => (
        <text
          key={`${planet.name}-${index}`}
          x={x}
          // Stack planets vertically starting 20px below the rashi number
          y={y + 0 + index * 15}
          fontSize="11"
          textAnchor="middle"
          fontWeight="600"
          style={{ fill: "var(--text-main)", fontFamily: "sans-serif" }}
        >
          {`${planet.name.substring(0, 2)} ${planet.degreeInRashi.toFixed(2)}`}

          {/* {planet.isRetro && (
            <tspan fill="var(--retro-color)" fontSize="9">
              {" "}
              (Rx)
            </tspan>
          )} */}
        </text>
      ))}
    </g>
  );
};

export default PlanetStack;
