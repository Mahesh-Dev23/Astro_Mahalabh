const PlanetStack = ({ house, pList, type }) => {
  // Center coordinates for each house to place planet text
  // console.log(house, pList);
  const houseCoords = {
    1: { x: 200, y: 70 },
    2: { x: 100, y: 20 },
    3: { x: 20, y: 50 },
    4: { x: 100, y: 150 },
    5: { x: 20, y: 250 },
    6: { x: 100, y: 345 },
    7: { x: 200, y: 285 },
    8: { x: 300, y: 345 },
    9: { x: 380, y: 250 },
    10: { x: 300, y: 150 },
    11: { x: 380, y: 50 },
    12: { x: 300, y: 20 },
  };

  const { x, y } = houseCoords[house];

  pList.sort(function (a, b) {
    return b.degreeInRashi - a.degreeInRashi;
  });
  // console.log(pList);
  return (
    <g textAnchor="middle">
      {pList.map((planet, index) => (
        <text
          key={`${planet.name}-${index}`}
          x={x == 2 || x == 6 || x == 8 || x == 12 ? x + 0 + index * 25 : x}
          // Stack planets vertically starting 20px below the rashi number
          y={y == 2 || y == 6 || y == 8 || y == 12 ? y : y + 0 + index * 25}
          fontSize="14"
          textAnchor="middle"
          fontWeight="400"
          style={{
            fill: `var(--p${planet.name})`,
            fontFamily: "sans-serif",
            height: "30px",

            // lineHeight: 20,
          }}
        >
          {/* {`${planet.name.substring(0, 2)} ${type == "nav" ? "" : planet.degreeInRashi.toFixed(2)}`} */}
          {`${planet.name.substring(0, 2)}`}

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
