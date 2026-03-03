const PlanetStack = ({ house, pList, type }) => {
  // Center coordinates for each house to place planet text
  // console.log(house, pList);
  const houseCoords = {
    1: { x: 180, y: 50 },
    2: { x: 80, y: 0 },
    3: { x: 20, y: 50 },
    4: { x: 80, y: 160 },
    5: { x: 20, y: 260 },
    6: { x: 90, y: 335 },
    7: { x: 180, y: 245 },
    8: { x: 280, y: 335 },
    9: { x: 350, y: 260 },
    10: { x: 280, y: 160 },
    11: { x: 350, y: 60 },
    12: { x: 280, y: 0 },
  };

  const { x, y } = houseCoords[house];
  const checkhouseX = (n, i) => {
    const num = n == 2 || n == 6 || n == 8 || n == 12 ? n + 0 + i * 15 : x;
    return num;
  };

  const checkhouseY = (n, i) => {
    const num = n == 2 || n == 6 || n == 8 || n == 12 ? n : n + 0 + i * 15;
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
            index % 2 === 0 ? checkhouseX(x, index) : checkhouseX(x, index) + 35
          }
          // Stack planets vertically starting 20px below the rashi number
          // y={y == 2 || y == 6 || y == 8 || y == 12 ? y : y + 0 + index * 25}
          y={
            index % 2 === 0 ? checkhouseY(y, index) + 15 : checkhouseY(y, index)
          }
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
