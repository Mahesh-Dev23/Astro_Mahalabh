import { useState, useEffect } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import Chart from "../../Components/Chart.jsx";
import PlanetsList from "../../Components/PlanetsList.jsx";
import "./gemini.css";
import "../../main.css";

const Gemini = () => {
  // Data setup
  const [data, setData] = useState(null);
  const [gochar, setGochar] = useState(null);
  const [planetList, setPlanetList] = useState([]);
  const [yuti, setYuti] = useState([]);
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

      let sevenPlanets = parsedData.chart?.navmanshaPlanets?.filter((p, i) => {
        if (i < 7) return p;
      });
      sevenPlanets?.sort(function (a, b) {
        return b.degree - a.degree;
      });
      setPlanetList(sevenPlanets);
      // console.log("parsedData ", sevenPlanets);
    }
    const gocharData = localStorage.getItem("Gochar Data");

    if (gocharData) {
      const parsedData = JSON.parse(gocharData);
      setGochar(parsedData);
    }
  }, []);
  // console.log("planetList", planetList);
  useEffect(() => {
    // console.log("sevenPlanets ", planetList);
    let yutiInRashi = [];
    planetList?.map((p) => yutiInRashi.push(p.rashi));

    // console.log(yutiInRashi);// ---------------
    let karakYuti = [];
    for (let y = 0; y < yutiInRashi.length; y++) {
      // console.log(yutiInRashi[y], planetList[y].rashi);

      for (let z = y + 1; z < yutiInRashi.length; z++) {
        // yutiInRashi[y] == yutiInRashi[z + 1] &&
        //   console.log(yutiInRashi[y], yutiInRashi[z]);
        yutiInRashi[y] == yutiInRashi[z] && karakYuti.push([y, z]);
        // console.log("sameRashi ", yutiInRashi[y], yutiInRashi[z]);
        // console.log("sameRashi ", y, z);
      }
    }
    // console.log("karakYuti", karakYuti);
    setYuti(karakYuti);
  }, [planetList]);

  // console.log(data);

  return (
    <>
      <PageTitle
        selectedUser={data?.selectedUser}
        currentDasha={data?.currentDasha}
        time={gochar?.chart?.currentTime}
      />
      <div className="chart-wrapper">
        <div className="geminiStack">
          {planetList?.length > 0 &&
            karakGemini.map((p, i) => (
              <div
                className="geminiCard"
                key={p}
                style={{
                  color: `var(--p${planetList[i]?.name})`,
                }}
              >
                <div
                  className="geminiKarak"
                  style={{
                    color: `var(--text-main)`,
                    width: "100px",
                    // border: "1px solid red",
                  }}
                >
                  {p}
                </div>
                <div
                  className="geminiName"
                  style={{
                    background: `var(--p${planetList[i]?.name})`,
                  }}
                >
                  {`${planetList[i]?.name} ${planetList[i]?.degree.toFixed(2)}`}
                </div>
              </div>
            ))}
        </div>
        <Chart
          lagnaRashi={data?.chart?.navmanshaLagna}
          planets={data?.chart?.navmanshaPlanets}
          type="nav"
        />
        <div className="geminiStack">
          {/* <div className="reportSubTitle">Yuti</div> */}
          {yuti.map((y) => (
            <div className="reportRow">
              <div className="reportSubValue">Yuti &#129030; </div>
              {y.map((yIndex) => (
                <div className="reportSubTitle">
                  {`${karakGemini[yIndex]} `}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gemini;
