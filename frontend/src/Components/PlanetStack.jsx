const PlanetStack = ({ house, pList, houseCords }) => {
  // Center coordinates for each house to place planet text
  // console.log(house, pList, pList.length);
  // console.log(pList.length, Math.floor(pList.length / 2));
  // const houseCords = {
  //   1: { x: 180, y: 60 },
  //   2: { x: 80, y: 10 },
  //   3: { x: 20, y: 70 },
  //   4: { x: 80, y: 160 },
  //   5: { x: 20, y: 270 },
  //   6: { x: 90, y: 335 },
  //   7: { x: 180, y: 245 },
  //   8: { x: 280, y: 335 },
  //   9: { x: 350, y: 270 },
  //   10: { x: 280, y: 160 },
  //   11: { x: 350, y: 70 },
  //   12: { x: 280, y: 10 },
  // };

  const { x, y } = houseCords[house];
  const checkhouseX = (n, i) => {
    // console.log(n, i);
    const num = n == 2 || n == 6 || n == 8 || n == 12 ? n + 0 + i * 15 : x;
    // const num = n == 2 || n == 6 || n == 8 || n == 12 ? n + 0 + i * 15 : x;
    return num;
  };

  const checkhouseY = (n, i) => {
    // console.log(i);
    const num = n == 2 || n == 6 || n == 8 || n == 12 ? n : n + 0 + i * 10;
    // const num = n == 2 || n == 6 || n == 8 || n == 12 ? n - i - 40 : n - i - 20;
    // console.log(n, num);
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
            index % 2 === 0
              ? checkhouseX(x - index, index) - 10
              : checkhouseX(x - index, index) + 15
          }
          // Stack planets vertically starting 20px below the rashi number
          // y={y == 2 || y == 6 || y == 8 || y == 12 ? y : y + 0 + index * 25}
          y={
            index % 2 === 0
              ? checkhouseY(y - index, index) - 15
              : checkhouseY(y - index, index) - 25
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

export default PlanetStack;
