import { useState, useEffect } from "react";
import "./yogs.css";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import { getYogas } from "./yogas.js";
import { getDoshas } from "./doshas.js";

const Yogs = () => {
  // Data setup
  const [data, setData] = useState(null);
  const [yogas, setYogas] = useState([]);
  const [doshas, setDoshas] = useState([]);
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
    }
  }, []);

  useEffect(() => {
    // data && setYogas(data.chart.planets, data.chart.lagna);
    data && setYogas(getYogas(data.chart.planets, data.chart.lagna));
    data && setDoshas(getDoshas(data.chart.planets, data.chart.lagna));
  }, [data]);

  console.log(yogas);

  return (
    <div>
      <PageTitle />
      <div className="chart-wrapper">
        <div className="yogaStack">
          <div className="yogTitle">Yogas</div>
          {yogas.length > 0 &&
            yogas.map((y) => <div className="yogaCard">{y}</div>)}
        </div>
        <div className="yogaStack">
          <div className="yogTitle">Doshas</div>
          {yogas.length > 0 &&
            doshas.map((d) => <div className="yogaCard">{d}</div>)}
        </div>
      </div>
    </div>
  );
};

export default Yogs;
