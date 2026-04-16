import { useState, useEffect } from "react";
import PlanetStack from "../Components/PlanetStack";
import "../main.css";

const Chart = ({ lagnaRashi = 1, planets = [], moonRashi, type, lagna }) => {
  const [chartType, setChartType] = useState(1);
  const [, setMoon] = useState("");
  let unit = 400;
  let unit5 = unit / 20;
  let unit10 = unit / 10;
  let unitHalf = unit / 2;
  let unit14 = unit / 4;
  let unit13 = unit / 3;
  let unit23 = unit13 * 2;

  const houseCords = {
    1: { x: unitHalf, y: unit14 },
    2: { x: unitHalf - unit14, y: unit14 / 2 },
    3: { x: unit14 / 2, y: unit14 },
    4: { x: unitHalf - unit14, y: unitHalf },
    5: { x: unit14 / 2, y: unitHalf + unit14 },
    6: { x: unit14, y: unit23 + unit14 },
    7: { x: unitHalf, y: unitHalf + unit14 },
    8: { x: unitHalf + unit14, y: unit23 + unit14 },
    9: { x: unitHalf + unit14 + unit14 / 2, y: unitHalf + unit14 },
    10: { x: unitHalf + unit14, y: unitHalf },
    // 11: { x: unit23 + unit14 - unit5, y: unit / 5 },
    11: { x: unitHalf + unit14 + unit14 / 2, y: unit14 },
    12: { x: unitHalf + unit14, y: unit14 / 2 },
  };

  useEffect(() => {
    setMoon(Math.floor(moonRashi / 30) + 1);
    type === "moon"
      ? setChartType(Math.floor(moonRashi / 30) + 1)
      : setChartType(lagnaRashi);
  }, [lagnaRashi, moonRashi, type]);

  const getRashiForHouse = (houseNum) => {
    let rashi = (chartType + houseNum - 1) % 12;
    rashi = rashi === 0 ? 12 : rashi;

    return rashi === lagna ? <tspan>{rashi}</tspan> : rashi;
  };

  // Group planets by house number (1-12)
  const groupedPlanets = planets.reduce((acc, p) => {
    const house = ((p.rashi - chartType + 12) % 12) + 1;
    if (!acc[house]) acc[house] = [];
    acc[house].push(p);
    return acc;
  }, {});

  // console.log("47", groupedPlanets);
  return (
    <div className="chart">
      <svg
        width={unit}
        height={unit}
        viewBox={`0 0 ${unit} ${unit}`}
        // className="border-2 border-gray-800 bg-white"
      >
        {/* Outer Border */}
        <rect
          x="0"
          y="0"
          width={unit}
          height={unit}
          fill={`rgb(from var(--bg-light) r g b / 0)`}
          stroke={`var(--bg-gray)`}
          strokeWidth="2"
        />

        {/* The "X" Cross Lines */}
        <line
          x1="0"
          y1="0"
          x2={unit}
          y2={unit}
          stroke={`var(--bg-gray)`}
          strokeWidth="2"
        />
        <line
          x1={unit}
          y1="0"
          x2="0"
          y2={unit}
          stroke={`var(--bg-gray)`}
          strokeWidth="2"
        />

        {/* The Inner Diamond Lines */}
        <line
          x1={unitHalf}
          y1="0"
          x2="0"
          y2={unitHalf}
          stroke={`var(--bg-gray)`}
          strokeWidth="2"
        />
        <line
          x1="0"
          y1={unitHalf}
          x2={unitHalf}
          y2={unit}
          stroke={`var(--bg-gray)`}
          strokeWidth="2"
        />
        <line
          x1={unitHalf}
          y1={unit}
          x2={unit}
          y2={unitHalf}
          stroke={`var(--bg-gray)`}
          strokeWidth="2"
        />
        <line
          x1={unit}
          y1={unitHalf}
          x2={unitHalf}
          y2="0"
          stroke={`var(--bg-gray)`}
          strokeWidth="2"
        />

        {/* House Labels (Rashi Numbers) */}
        {/* 1st House (Top Center) */}
        <text
          x={unitHalf}
          y={unitHalf - unit5}
          textAnchor="middle"
          className="housenode"
        >
          {getRashiForHouse(1)}
        </text>

        {/* 2nd House (Top Left Triangle) */}
        <text
          x={unit14}
          y={unit14 - unit5}
          textAnchor="middle"
          className="housenode"
        >
          {getRashiForHouse(2)}
        </text>

        {/* 3rd House (side Left Triangle) */}
        <text
          x={unit14 - unit5}
          y={unit14}
          textAnchor="middle"
          className="housenode"
        >
          {getRashiForHouse(3)}
        </text>

        {/* 4th House (Left Center Diamond) */}
        <text
          x={unitHalf - unit5}
          y={unitHalf}
          textAnchor="middle"
          className="housenode"
        >
          {getRashiForHouse(4)}
        </text>

        {/* 5th House (side Left Triangle) */}
        <text
          x={unit14 - unit5}
          y={unitHalf + unit14}
          textAnchor="middle"
          className="housenode"
        >
          {getRashiForHouse(5)}
        </text>

        {/* 6th House (Top Left Triangle) */}
        <text
          x={unit14}
          y={unitHalf + unit14 + unit5}
          textAnchor="middle"
          className="housenode"
        >
          {getRashiForHouse(6)}
        </text>

        {/* 7th House (Bottom Center Diamond) */}
        <text
          x={unitHalf}
          y={unitHalf + unit5}
          textAnchor="middle"
          className="housenode"
        >
          {getRashiForHouse(7)}
        </text>

        {/* 8th House (Top Left Triangle) */}
        <text
          x={unitHalf + unit14}
          y={unitHalf + unit14 + unit5}
          textAnchor="middle"
          className="housenode"
        >
          {getRashiForHouse(8)}
        </text>

        {/* 9th House (side Left Triangle) */}
        <text
          x={unitHalf + unit14 + unit5}
          y={unitHalf + unit14}
          textAnchor="middle"
          className="housenode"
        >
          {getRashiForHouse(9)}
        </text>

        {/* 10th House (Right Center Diamond) */}
        <text
          x={unitHalf + unit5}
          y={unitHalf}
          textAnchor="middle"
          className="housenode"
        >
          {getRashiForHouse(10)}
        </text>

        {/* 11th House (side Left Triangle) */}
        <text
          x={unitHalf + unit14 + unit5}
          y={unit14}
          textAnchor="middle"
          className="housenode"
        >
          {getRashiForHouse(11)}
        </text>

        {/* 12th House (Top Left Triangle) */}
        <text
          x={unitHalf + unit14}
          y={unit14 - unit5}
          textAnchor="middle"
          className="housenode"
        >
          {getRashiForHouse(12)}
        </text>
        {/* <div className="planetGroup"> */}
        {/* You would continue adding labels for all 12 houses here... */}
        {Object.keys(groupedPlanets)?.map((planet, index) => (
          // planet.rashi,
          // <text>{groupedPlanets[planet]}</text>

          <PlanetStack
            house={Object.keys(groupedPlanets)[index]}
            pList={groupedPlanets[planet]}
            houseCords={houseCords}
          />
        ))}
        {/* </div> */}
      </svg>

      {/* <p className="mt-4 text-sm text-gray-500">
        Lagna is in Rashi #{lagnaRashi}
      </p> */}
    </div>
  );
};

export default Chart;
