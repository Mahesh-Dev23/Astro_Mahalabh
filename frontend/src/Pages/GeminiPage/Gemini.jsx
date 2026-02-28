import { useState, useEffect } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import Chart from "../../Components/Chart.jsx";
import PlanetsList from "../../Components/PlanetsList.jsx";
import "../../main.css";

const Gemini = () => {
  // Data setup
  const [data, setData] = useState(null);
  const [planetList, setPlanetList] = useState([]);
  const karakGemini = [
    "Atmakarak",
    "Amatyakarak",
    "Bhratrukarak",
    "Matrukarak",
    "Putrakarak",
    "Gnyatikarak",
    "Darakarak",
  ];
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);

      let sevenPlanets = parsedData.chart?.navmanshaPlanets.filter((p, i) => {
        if (i < 7) return p;
      });
      sevenPlanets.sort(function (a, b) {
        return b.degreeInRashi - a.degreeInRashi;
      });
      setPlanetList(sevenPlanets);
      // console.log("parsedData ", sevenPlanets);
    }
  }, []);
  useEffect(() => {
    console.log("sevenPlanets ", planetList[0]?.name);
  }, [planetList]);

  return (
    <>
      <PageTitle />
      <div className="chart-wrapper">
        <Chart
          lagnaRashi={data?.chart?.navmanshaLagna}
          planets={data?.chart?.navmanshaPlanets}
          type="nav"
        />
        <div className="planetStack">
          {karakGemini.map((p, i) => (
            <div
              className="planetCard"
              key={p}
              style={{
                color: `var(--p${planetList[i]?.name})`,
              }}
            >
              <div
                className="pnakshatra"
                style={{
                  color: `var(--p${planetList[i]?.name})`,
                }}
              >
                {p}
              </div>
              <div
                className="pname"
                style={{
                  color: `var(--p${planetList[i]?.name})`,
                }}
              >
                {planetList[i]?.name}
              </div>
              <div className="pname">
                {planetList[i]?.degreeInRashi.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gemini;
