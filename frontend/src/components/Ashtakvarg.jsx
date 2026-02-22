import React, { useState, useEffect } from "react";
import { calculateSAV } from "../module/calcSarvashtak.js";
import { calculateFullAshtakavarga } from "../module/sravashtaknew.js";
import AshtakavargaDashboard from "./AshtakavargaDashboard.jsx";

function Ashtakvarg({ planets, lagna }) {
  const [data, setData] = useState({});
  const savRules = {
    sun: {
      fromSun: [1, 2, 4, 7, 8, 9, 10, 11],
      fromMoon: [3, 6, 10, 11],
      fromMars: [1, 2, 4, 7, 8, 9, 10, 11],
      fromMercury: [3, 5, 6, 9, 10, 11, 12],
      fromJupiter: [5, 6, 9, 11],
      fromVenus: [6, 7, 12],
      fromSaturn: [1, 2, 4, 7, 8, 9, 10, 11],
      fromLagna: [3, 4, 6, 10, 11, 12],
    },
    moon: {
      fromSun: [3, 6, 7, 8, 10, 11],
      fromMoon: [1, 3, 6, 7, 10, 11],
      fromMars: [2, 3, 5, 6, 9, 10, 11],
      fromMercury: [1, 3, 4, 5, 7, 8, 10, 11],
      fromJupiter: [1, 4, 7, 8, 10, 11, 12],
      fromVenus: [3, 4, 5, 7, 9, 10, 11],
      fromSaturn: [3, 5, 6, 11],
      fromLagna: [3, 6, 10, 11],
    },
    mars: {
      fromSun: [3, 5, 6, 10, 11],
      fromMoon: [3, 6, 11],
      fromMars: [1, 2, 4, 7, 8, 10, 11],
      fromMercury: [3, 5, 6, 11],
      fromJupiter: [6, 10, 11, 12],
      fromVenus: [6, 8, 11, 12],
      fromSaturn: [1, 4, 7, 8, 9, 10, 11],
      fromLagna: [1, 3, 6, 10, 11],
    },
    mercury: {
      fromSun: [5, 6, 9, 11, 12],
      fromMoon: [2, 4, 6, 8, 10, 11],
      fromMars: [1, 2, 4, 7, 8, 9, 10, 11],
      fromMercury: [1, 3, 5, 6, 9, 10, 11, 12],
      fromJupiter: [6, 8, 11, 12],
      fromVenus: [1, 2, 3, 4, 5, 8, 9, 11],
      fromSaturn: [1, 2, 4, 7, 8, 9, 10, 11],
      fromLagna: [1, 2, 4, 6, 8, 10, 11],
    },
    jupiter: {
      fromSun: [1, 2, 3, 4, 7, 8, 9, 10, 11],
      fromMoon: [2, 5, 7, 9, 11],
      fromMars: [1, 2, 4, 7, 8, 10, 11],
      fromMercury: [1, 2, 4, 5, 6, 9, 10, 11],
      fromJupiter: [1, 2, 3, 4, 7, 8, 10, 11],
      fromVenus: [2, 5, 6, 9, 10, 11],
      fromSaturn: [3, 5, 6, 12],
      fromLagna: [1, 2, 4, 5, 6, 7, 9, 10, 11],
    },
    venus: {
      fromSun: [8, 11, 12],
      fromMoon: [1, 2, 3, 4, 5, 8, 9, 11, 12],
      fromMars: [3, 5, 6, 9, 11, 12],
      fromMercury: [3, 5, 6, 9, 11],
      fromJupiter: [5, 8, 9, 10, 11],
      fromVenus: [1, 2, 3, 4, 5, 8, 9, 10, 11],
      fromSaturn: [3, 4, 5, 8, 9, 10, 11],
      fromLagna: [1, 2, 3, 4, 5, 8, 9, 11],
    },
    saturn: {
      fromSun: [1, 2, 4, 7, 8, 10, 11],
      fromMoon: [3, 6, 11],
      fromMars: [3, 5, 6, 10, 11, 12],
      fromMercury: [6, 8, 9, 10, 11, 12],
      fromJupiter: [5, 6, 11, 12],
      fromVenus: [6, 11, 12],
      fromSaturn: [3, 5, 6, 11],
      fromLagna: [1, 3, 4, 6, 10, 11],
    },
    lagna: {
      fromSun: [3, 4, 6, 10, 11, 12],
      fromMoon: [3, 6, 10, 11, 12],
      fromMars: [1, 3, 6, 10, 11],
      fromMercury: [1, 2, 4, 6, 8, 10, 11],
      fromJupiter: [1, 2, 4, 5, 6, 7, 9, 10, 11],
      fromVenus: [1, 2, 3, 4, 5, 8, 9, 11],
      fromSaturn: [1, 3, 4, 6, 10, 11],
      fromLagna: [3, 6, 10, 11],
    },
  };

  const signs = [
    "Ari",
    "Tau",
    "Gem",
    "Can",
    "Leo",
    "Vir",
    "Lib",
    "Sco",
    "Sag",
    "Cap",
    "Aqu",
    "Pis",
  ];
  const planetsList = [
    "sun",
    "moon",
    "mars",
    "mercury",
    "jupiter",
    "venus",
    "saturn",
  ];

  let planetPositions = {};
  useEffect(() => {
    planets?.map((p, i) => {
      if (i < 7) planetPositions[p.name] = p.rashi;
    });
    planetPositions["lagna"] = lagna;
    // console.log("data ", data?.chart?.planets)
    // console.log("planetPositions ", planetPositions, lagna);
    // console.log(calculateFullAshtakavarga(planetPositions, rules));
    // setData(calculateFullAshtakavarga(planetPositions, rules));
    const finalData = calculateFullAshtakavarga(planetPositions, savRules);
    setData(finalData);
    // console.log("SAV Array (12 Signs):", finalData.total);
    // console.log("Sun BAV:", finalData.sun);
    // console.log("Verify Total (Should be 337):", finalData.grandTotalPoints);
  }, [planets]);
  // useEffect(() => console.log(data), [data]);
  return (
    <div>
      {/* Ashtakvarg
      <table className="sav-table">
        <thead>
          <tr>
            <th>Planet</th>
            {signs.map((s) => (
              <th key={s}>{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planetsList.map((p) => (
            <tr key={p}>
              <td style={{ textTransform: "capitalize" }}>{p}</td>
              {data[p]?.map((val, i) => (
                <td key={i}>{val}</td>
              ))}
            </tr>
          ))}
          <tr
            className="total-row"
            style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}
          >
            <td>SAV Total</td>
            {data.total?.map((val, i) => (
              <td key={i}>{val}</td>
            ))}
          </tr>
        </tbody>
      </table> */}
      <AshtakavargaDashboard avData={data} />
    </div>
  );
}

export default Ashtakvarg;
