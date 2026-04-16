import { useState, useEffect } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle";
import { generateAllVargas } from "../../Modules/talika/generateAllVargas.js";
import "./talika.css";
import { generateAllCharts } from "../../Modules/talika/generateAllCharts.js";
import Tcharts from "./Tcharts.jsx";
import { getDCharts } from "../../Modules/talika/getDCharts.js";

export const Talika = () => {
  const [data, setData] = useState(null);
  const [planets, setPlanets] = useState(null);
  const [shodashVarga, setShodashVarga] = useState(null);
  const [vargaKeys, setVargaKeys] = useState(null);
  const [chartsByVarga, setChartByVarga] = useState(null);
  const [dIndex, setDIndex] = useState(0);
  const [vargaNames, setVargaNames] = useState(null);

  // build charts -----------------------------
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
      setPlanets(parsedData.chart.planets);
      setShodashVarga(generateAllVargas(parsedData.chart.planets)); // for talik table
    }
  }, []);
  useEffect(() => {
    // data &&
    //   setChartByVarga(
    //     generateAllCharts(data?.chart?.planets, data?.chart?.lagnaLongitude),
    //   );
    data &&
      setChartByVarga(
        getDCharts(data?.chart?.planets, data?.chart?.lagnaLongitude),
      );
  }, [data]);
  useEffect(() => {
    shodashVarga && setVargaKeys(Object.keys(shodashVarga[0])); // for talika table
  }, [shodashVarga]);
  useEffect(() => {
    chartsByVarga && setVargaNames(Object.keys(chartsByVarga));
  }, [chartsByVarga]);
  useEffect(() => {
    // console.log(dIndex);
  }, [dIndex]);
  //   shodashVarga && console.log(shodashVarga);
  // vargaKeys && console.log(vargaNames);
  // chartsByVarga && console.log(chartsByVarga);
  // vargaNames && console.log(typeof chartsByVarga[vargaNames[dIndex]].chart);
  //   console.log(data?.chart?.lagna);
  return (
    <div className="av-column">
      <PageTitle />
      <div className="chart-wrapper">
        <div className="av-column">
          {chartsByVarga && vargaNames && (
            <div className="talikaTitle">{vargaNames[dIndex]}</div>
          )}
          {chartsByVarga && vargaNames && (
            <Tcharts
              chart={chartsByVarga[vargaNames[dIndex]].chart}
              lagna={chartsByVarga[vargaNames[dIndex]].lagna}
            />
          )}
          <div className="controls2">
            {chartsByVarga &&
              Object.keys(chartsByVarga).map((ch, i) => (
                <div className="talikaButton" onClick={() => setDIndex(i)}>
                  {ch}
                </div>
              ))}
          </div>
        </div>
        {/* <div className="tilikaTable">
          {planets &&
            shodashVarga &&
            vargaKeys &&
            vargaKeys.map((vk) => (
              <div className="talikaRow">
                <span style={{ color: vk !== "planet" && `var(--p${vk})` }}>
                  {vk === "planet" ? "Charts" : vk}
                </span>
                {planets.map((p, i) => (
                  <span style={{ color: `var(--p${p.name})` }}>
                    {shodashVarga[i][vk]}
                  </span>
                ))}
              </div>
            ))}
        </div> */}
      </div>
    </div>
  );
};
