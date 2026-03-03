import { useState, useEffect } from "react";
import PlanetStack from "../Components/PlanetStack";
import "../main.css";

const Chart = ({ lagnaRashi = 1, planets = [], moonRashi, type }) => {
  const [chartType, setChartType] = useState(1);
  const [, setMoon] = useState("");
  // const [navmansh, setNavmansh] = useState();
  //required houseLayout -------
  // const houseLayout = [
  //   { id: 1, x: "200", y: "185", label: "1st" },
  //   { id: 2, x: "100", y: "90", label: "2nd" },
  //   { id: 3, x: "80", y: "105", label: "3rd" },
  //   { id: 4, x: "180", y: "205", label: "4th" },
  //   { id: 5, x: "80", y: "305", label: "5th" },
  //   { id: 6, x: "100", y: "325", label: "6th" },
  //   { id: 7, x: "200", y: "225", label: "7th" },
  //   { id: 8, x: "300", y: "325", label: "8th" },
  //   { id: 9, x: "320", y: "305", label: "9th" },
  //   { id: 10, x: "220", y: "205", label: "10th" },
  //   { id: 11, x: "315", y: "105", label: "11th" },
  //   { id: 12, x: "300", y: "90", label: "12th" },
  // ];

  useEffect(() => {
    setMoon(Math.floor(moonRashi / 30) + 1);
    type === "moon"
      ? setChartType(Math.floor(moonRashi / 30) + 1)
      : setChartType(lagnaRashi);
  }, [lagnaRashi, moonRashi, type]);

  const getRashiForHouse = (houseNum) => {
    let rashi = (chartType + houseNum - 1) % 12;

    return rashi === 0 ? 12 : rashi;
  };

  // Group planets by house number (1-12)
  const groupedPlanets = planets.reduce((acc, p) => {
    const house = ((p.rashi - chartType + 12) % 12) + 1;
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
          fill={`var(--bg-light)`}
          stroke={`var(--gold)`}
          strokeWidth="1"
        />

        {/* The "X" Cross Lines */}
        <line
          x1="0"
          y1="0"
          x2="400"
          y2="400"
          stroke={`var(--gold)`}
          strokeWidth="1"
        />
        <line
          x1="400"
          y1="0"
          x2="0"
          y2="400"
          stroke={`var(--gold)`}
          strokeWidth="1"
        />

        {/* The Inner Diamond Lines */}
        <line
          x1="200"
          y1="0"
          x2="0"
          y2="200"
          stroke={`var(--gold)`}
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="200"
          x2="200"
          y2="400"
          stroke={`var(--gold)`}
          strokeWidth="1"
        />
        <line
          x1="200"
          y1="400"
          x2="400"
          y2="200"
          stroke={`var(--gold)`}
          strokeWidth="1"
        />
        <line
          x1="400"
          y1="200"
          x2="200"
          y2="0"
          stroke={`var(--gold)`}
          strokeWidth="1"
        />

        {/* House Labels (Rashi Numbers) */}
        {/* 1st House (Top Center) */}
        <text x="200" y="185" textAnchor="middle" className="housenode">
          {getRashiForHouse(1)}
        </text>

        {/* 2nd House (Top Left Triangle) */}
        <text x="100" y="90" textAnchor="middle" className="housenode">
          {getRashiForHouse(2)}
        </text>

        {/* 3rd House (side Left Triangle) */}
        <text x="80" y="105" textAnchor="middle" className="housenode">
          {getRashiForHouse(3)}
        </text>

        {/* 4th House (Left Center Diamond) */}
        <text x="180" y="205" textAnchor="middle" className="housenode">
          {getRashiForHouse(4)}
        </text>

        {/* 5th House (side Left Triangle) */}
        <text x="80" y="305" textAnchor="middle" className="housenode">
          {getRashiForHouse(5)}
        </text>

        {/* 6th House (Top Left Triangle) */}
        <text x="100" y="325" textAnchor="middle" className="housenode">
          {getRashiForHouse(6)}
        </text>

        {/* 7th House (Bottom Center Diamond) */}
        <text x="200" y="225" textAnchor="middle" className="housenode">
          {getRashiForHouse(7)}
        </text>

        {/* 8th House (Top Left Triangle) */}
        <text x="300" y="325" textAnchor="middle" className="housenode">
          {getRashiForHouse(8)}
        </text>

        {/* 9th House (side Left Triangle) */}
        <text x="320" y="305" textAnchor="middle" className="housenode">
          {getRashiForHouse(9)}
        </text>

        {/* 10th House (Right Center Diamond) */}
        <text x="220" y="205" textAnchor="middle" className="housenode">
          {getRashiForHouse(10)}
        </text>

        {/* 11th House (side Left Triangle) */}
        <text x="315" y="105" textAnchor="middle" className="housenode">
          {getRashiForHouse(11)}
        </text>

        {/* 12th House (Top Left Triangle) */}
        <text x="300" y="90" textAnchor="middle" className="housenode">
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
            type={type}
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
