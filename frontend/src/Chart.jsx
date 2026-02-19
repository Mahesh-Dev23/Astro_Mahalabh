import React from "react";
import PlanetStack from "./components/PlanetStack";

const Chart = ({ lagnaRashi = 1, planets = [] }) => {
  // Helper to calculate which Rashi goes in which House
  // House 1 is index 0, House 2 is index 1, etc.
  console.log(planets);
  const getRashiForHouse = (houseNum) => {
    let rashi = (lagnaRashi + houseNum - 1) % 12;
    return rashi === 0 ? 12 : rashi;
  };

  // Group planets by house number (1-12)
  const groupedPlanets = planets.reduce((acc, p) => {
    const house = ((p.rashi - lagnaRashi + 12) % 12) + 1;
    if (!acc[house]) acc[house] = [];
    acc[house].push(p);
    return acc;
  }, {});
  // console.log(groupedPlanets);

  return (
    <div className="flex flex-col items-center p-4">
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="border-2 border-gray-800 bg-white"
      >
        {/* Outer Border */}
        <rect
          x="0"
          y="0"
          width="400"
          height="400"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />

        {/* The "X" Cross Lines */}
        <line x1="0" y1="0" x2="400" y2="400" stroke="black" strokeWidth="2" />
        <line x1="400" y1="0" x2="0" y2="400" stroke="black" strokeWidth="2" />

        {/* The Inner Diamond Lines */}
        <line x1="200" y1="0" x2="0" y2="200" stroke="black" strokeWidth="2" />
        <line
          x1="0"
          y1="200"
          x2="200"
          y2="400"
          stroke="black"
          strokeWidth="2"
        />
        <line
          x1="200"
          y1="400"
          x2="400"
          y2="200"
          stroke="black"
          strokeWidth="2"
        />
        <line
          x1="400"
          y1="200"
          x2="200"
          y2="0"
          stroke="black"
          strokeWidth="2"
        />

        {/* House Labels (Rashi Numbers) */}
        {/* 1st House (Top Center) */}
        <text
          x="200"
          y="180"
          textAnchor="middle"
          className="text-xl font-bold fill-red-600"
        >
          {getRashiForHouse(1)}
        </text>

        {/* 2nd House (Top Left Triangle) */}
        <text x="120" y="60" textAnchor="middle" className="fill-gray-600">
          {getRashiForHouse(2)}
        </text>

        {/* 4th House (Left Center Diamond) */}
        <text x="100" y="210" textAnchor="middle" className="fill-gray-600">
          {getRashiForHouse(4)}
        </text>

        {/* 7th House (Bottom Center Diamond) */}
        <text x="200" y="310" textAnchor="middle" className="fill-gray-600">
          {getRashiForHouse(7)}
        </text>

        {/* 10th House (Right Center Diamond) */}
        <text x="300" y="210" textAnchor="middle" className="fill-gray-600">
          {getRashiForHouse(10)}
        </text>

        {/* You would continue adding labels for all 12 houses here... */}
        {Object.keys(groupedPlanets)?.map((planet, index) => (
          // planet.rashi,
          // <text>{groupedPlanets[planet]}</text>
          <PlanetStack
            house={Object.keys(groupedPlanets)[index]}
            pList={groupedPlanets[planet]}
          />
        ))}
      </svg>

      <p className="mt-4 text-sm text-gray-500">
        Lagna is in Rashi #{lagnaRashi}
      </p>
    </div>
  );
};

export default Chart;
