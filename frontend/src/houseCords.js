const houseCoords = {
  1: { x: 200, y: 100 },
  2: { x: 100, y: 50 },
  3: { x: 50, y: 100 },
  4: { x: 100, y: 200 },
  5: { x: 50, y: 300 },
  6: { x: 100, y: 350 },
  7: { x: 200, y: 300 },
  8: { x: 300, y: 350 },
  9: { x: 350, y: 300 },
  10: { x: 300, y: 200 },
  11: { x: 350, y: 100 },
  12: { x: 300, y: 50 },
};

const ChartContent = ({ planets, lagnaRashi }) => {
  const grouped = groupPlanetsByHouse(planets, lagnaRashi);

  return (
    <g>
      {Object.entries(grouped).map(([house, planetsInHouse]) => {
        const { x, y } = houseCoords[house];

        return planetsInHouse.map((planet, index) => (
          <text
            key={planet.name}
            x={x}
            y={y + index * 18} // Stacks planets vertically 18px apart
            textAnchor="middle"
            style={{ fontSize: "12px", fill: "#333", fontWeight: "bold" }}
          >
            {planet.name}
          </text>
        ));
      })}
    </g>
  );
};
