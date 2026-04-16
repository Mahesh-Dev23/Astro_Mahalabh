import React from "react";

const DPlanetStack = ({ house, pList, houseCoords }) => {
  // console.log(house);
  // console.log(pList);
  // console.log(houseCoords);
  // return;
  const { x, y } = houseCoords[house];
  const checkhouseX = (n, i) => {
    const num = n == 2 || n == 6 || n == 8 || n == 12 ? n + 0 + i * 10 : x;
    return num;
  };

  const checkhouseY = (n, i) => {
    const num = n == 2 || n == 6 || n == 8 || n == 12 ? n : n + 0 + i * 10;
    return num;
  };
  pList.sort(function (a, b) {
    return b.degreeInRashi - a.degreeInRashi;
  });
  // console.log(pList);
  return (
    <g textAnchor="middle">
      {pList.map((planet, index) => (
        <text
          key={`${planet.name}-${index}`}
          // x={x == 2 || x == 6 || x == 8 || x == 12 ? x + 0 + index * 25 : x}
          x={
            index % 2 === 0 ? checkhouseX(x, index) : checkhouseX(x, index) + 25
          }
          // Stack planets vertically starting 20px below the rashi number
          // y={y == 2 || y == 6 || y == 8 || y == 12 ? y : y + 0 + index * 25}
          y={
            index % 2 === 0 ? checkhouseY(y, index) + 10 : checkhouseY(y, index)
          }
          fontSize="14"
          textAnchor="middle"
          fontWeight="400"
          style={{
            fill: `var(--p${planet.name})`,
            fontFamily: "sans-serif",
            height: "30px",
            fontWeight: "600",

            // lineHeight: 20,
          }}
        >
          {planet.name !== "Rahu" &&
            planet.name !== "Ketu" &&
            planet.retrograde &&
            `◂`}{" "}
          {`${planet.name.substring(0, 2)}`}
          {planet.combust && `▪`}
        </text>
      ))}
    </g>
  );
};

export default DPlanetStack;
