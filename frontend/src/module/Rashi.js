const PlanetLabel = ({ rashi, lagnaRashi, name }) => {
  // 1. Calculate House (1-12)
  let house = ((rashi - lagnaRashi + 12) % 12) + 1;

  // 2. Map House to SVG Coordinates (x, y)
  // These coordinates correspond to the center of each diamond/triangle
  const houseCoords = {
    1: { x: 200, y: 150 }, // Top Center Diamond
    2: { x: 130, y: 80 }, // Top Left Triangle
    3: { x: 70, y: 130 }, // Left Top Triangle
    4: { x: 150, y: 200 }, // Left Center Diamond
    5: { x: 70, y: 270 }, // Left Bottom Triangle
    6: { x: 130, y: 330 }, // Bottom Left Triangle
    7: { x: 200, y: 250 }, // Bottom Center Diamond
    8: { x: 270, y: 330 }, // Bottom Right Triangle
    9: { x: 330, y: 270 }, // Right Bottom Triangle
    10: { x: 250, y: 200 }, // Right Center Diamond
    11: { x: 330, y: 130 }, // Right Top Triangle
    12: { x: 270, y: 80 }, // Top Right Triangle
  };

  const { x, y } = houseCoords[house];

  return (
    <text
      x={x}
      y={y}
      style={{
        "--house-color": house % 2 === 0 ? "#4A5568" : "#2D3748",
        fontSize: "14px",
        fontWeight: "bold",
        fill: "var(--house-color)",
      }}
      textAnchor="middle"
    >
      {name}
    </text>
  );
};
