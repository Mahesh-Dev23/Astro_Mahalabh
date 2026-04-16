import { useState, useEffect } from "react";
import PlanetStack from "../../Components/PlanetStack";
import DPlanetStack from "./DPlanetStack";
import { data } from "react-router-dom";

const Tcharts = ({ chart, lagna, planets }) => {
  const northIndianLayout = [0, 1, 2, 11, null, 3, 10, 9, 4, 8, 7, 6, 5];
  // console.log(chart);
  const [chartElem, setChartElem] = useState(null);
  const [hCords, setHCords] = useState(null);
  const [LangnaCords, setLagnaCords] = useState([]);
  const [yuti, setYuti] = useState(null);
  // const planets = [
  //   "Sun",
  //   "Moon",
  //   "Mars",
  //   "Mercury",
  //   "Jupiter",
  //   "Venus",
  //   "Saturn",
  //   "Rahu",
  //   "Ketu",
  // ];
  let unit = 350;
  let unit5 = unit / 20;
  let unit10 = unit / 10;
  let unitHalf = unit / 2;
  let unit14 = unit / 4;
  let unit13 = unit / 3;
  let unit23 = unit13 * 2;
  // console.log(lagna, chart);
  // console.log(typeof lagna);

  const houseCoords = {
    1: { x: unitHalf - unit5, y: unit5 * 2 },
    2: { x: unit14 - unit5, y: unit5 },
    3: { x: unit5, y: unit / 5 },
    4: { x: unit14 - unit5, y: unitHalf - unit10 },
    5: { x: unit5, y: unit23 },
    6: { x: unit14 - unit5, y: unit23 + unit14 - unit5 },
    7: { x: unitHalf - unit5, y: unit - 120 },
    8: { x: unit23, y: unit23 + unit14 - unit5 },
    9: { x: unit23 + unit14 - unit5, y: unit23 },
    10: { x: unit23, y: unitHalf - unit10 },
    11: { x: unit23 + unit14 - unit5, y: unit / 5 },
    12: { x: unit23, y: unit5 },
  };
  const houseNodes = {
    1: { x: unitHalf, y: unitHalf - unit5 },
    2: { x: unit14, y: unit14 - unit5 },
    3: { x: unit14 - unit5, y: unit14 },
    4: { x: unitHalf - unit5, y: unitHalf },
    5: { x: unit14 - unit5, y: unitHalf + unit14 },
    6: { x: unit14, y: unitHalf + unit14 + unit5 },
    7: { x: unitHalf, y: unitHalf + unit5 },
    8: { x: unitHalf + unit14, y: unitHalf + unit14 + unit5 },
    9: { x: unitHalf + unit14 + unit5, y: unitHalf + unit14 },
    10: { x: unitHalf + unit5, y: unitHalf },
    11: { x: unitHalf + unit14 + unit5, y: unit14 },
    12: { x: unitHalf + unit14, y: unit14 - unit5 },
  };
  useEffect(() => {
    setChartElem(chart);
    setHCords(Object.keys(houseCoords).map((h) => Number(h)));
    let lCords = [];
    for (let i = 0; i < 12; i++) {
      lCords.push((lagna + i) % 12 === 0 ? 12 : (lagna + i) % 12);
      setLagnaCords(lCords);
    }
  }, []);
  useEffect(() => {
    setChartElem(chart);

    // const yutiArray = Object.values(
    //   chart &&
    //     chart?.reduce((acc, val, i) => {
    //       (acc[val] ||= []).push(i);
    //       return acc;
    //     }, {}),
    // ).filter((v) => v.length > 1);
    // setYuti(yutiArray);
  }, [chart]);
  useEffect(() => {
    let lCords = [];
    for (let i = 0; i < 12; i++) {
      lCords.push((lagna + i) % 12 === 0 ? 12 : (lagna + i) % 12);
      setLagnaCords(lCords);
    }
  }, [lagna]);
  useEffect(() => {
    // console.log(yuti);
  }, [yuti]);

  // Rotate house numbers as per langa---------------
  const getRashiForHouse = (houseNum, lagna) => {
    let rashi = lagna && (lagna + houseNum) % 12;
    rashi = rashi === 0 ? 12 : rashi;
    return rashi;
    return rashi === lagna ? <tspan>{rashi}</tspan> : rashi;
  };

  const groupedPlanets =
    chartElem &&
    chartElem?.reduce((acc, p, i) => {
      const house = ((p - lagna + 12) % 12) + 1;
      if (!acc[house]) acc[house] = [];
      // console.log("101", p, planets[p]);
      acc[house].push(planets[i]);
      return acc;
    }, {});

  // console.log(chartElem);
  // chartElem && chartElem.map((ch) => console.log(hCords.indexOf(ch)));
  // console.log(hCords);
  // console.log(LangnaCords);
  // console.log(groupedPlanets);

  return (
    groupedPlanets && (
      <div className="chart">
        <svg
          width={unit}
          height={unit}
          viewBox={`10px 10px ${unit} ${unit}`}
          // className="border-2 border-gray-800 bg-white"
        >
          {/* Outer Border */}{" "}
          <rect
            x="0"
            y="0"
            width={unit}
            height={unit}
            fill={`rgb(from var(--bg-light) r g b / 0)`}
            stroke={`var(--gold)`}
            strokeWidth="1"
          />
          {/* The "X" Cross Lines */}
          <line
            x1="0"
            y1="0"
            x2={unit}
            y2={unit}
            stroke={`var(--gold)`}
            strokeWidth="1"
          />
          <line
            x1={unit}
            y1="0"
            x2="0"
            y2={unit}
            stroke={`var(--gold)`}
            strokeWidth="1"
          />
          {/* The Inner Diamond Lines */}
          <line
            x1={unit / 2}
            y1="0"
            x2="0"
            y2={unit / 2}
            stroke={`var(--gold)`}
            strokeWidth="1"
          />
          <line
            x1="0"
            y1={unit / 2}
            x2={unit / 2}
            y2={unit}
            stroke={`var(--gold)`}
            strokeWidth="1"
          />
          <line
            x1={unit / 2}
            y1={unit}
            x2={unit}
            y2={unit / 2}
            stroke={`var(--gold)`}
            strokeWidth="1"
          />
          <line
            x1={unit}
            y1={unit / 2}
            x2={unit / 2}
            y2="0"
            stroke={`var(--gold)`}
            strokeWidth="1"
          />
          {houseNodes &&
            Object.keys(houseNodes)?.map((house, index) => (
              <text
                x={houseNodes[house].x}
                y={houseNodes[house].y}
                textAnchor="middle"
                className="housenode"
                style={{ zIndex: "10" }}
              >
                {houseNodes && lagna && getRashiForHouse(index, lagna)}
              </text>
            ))}
          {Object.keys(groupedPlanets)?.map((planet, index) => (
            <DPlanetStack
              house={Object?.keys(groupedPlanets)[index]}
              pList={groupedPlanets[planet]}
              houseCoords={houseCoords}
            />
          ))}
          {/* {chartElem &&
          hCords &&
          yuti &&
          chartElem?.map((c, i) =>
            yuti.map((yt, yti) => {
              yt.includes(i) && hCords?.includes(c)
                ? console.log("planet in yuti", planets[yti])
                : // yt.includes(i) === false &&
                  //   hCords?.includes(c) &&
                  console.log("single planets", planets[i]);
              // <text
              //   // x={houseCoords[hCords[LangnaCords.indexOf(c)]]?.x}
              //   // y={houseCoords[hCords[LangnaCords.indexOf(c)]]?.y}
              //   fill={`var(--p${planets[i]})`}
              // >
              //   {planets[i].substring(0, 2)}
              // </text>
            }),
          )} */}
          {/* {groupedPlanets &&
          Object.keys(groupedPlanets).map((gp) => {
            // console.log(Object.keys(gp));
            // <g>{gp.map((t) => t)}</g>;
          })} */}
        </svg>
      </div>
    )
  );
};

export default Tcharts;
