import { useState, useEffect } from "react";
import "./yogs.css";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import Chart from "../../Components/Chart.jsx";

const Yogs = () => {
  // Data setup
  const [data, setData] = useState(null);
  const [gochar, setGochar] = useState(null);
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
    data && setYogas(data.report.yogas);
    data && setDoshas(data.report.doshas);
  }, [data]);

  // console.log(yogas);

  return (
    <div>
      <PageTitle
        selectedUser={data?.selectedUser}
        currentDasha={data?.currentDasha}
        time={gochar?.chart?.currentTime}
      />
      <div className="chart-wrapper">
        <div className="yogaStack">
          <div className="yogTitle">Yogas</div>
          <div className="yogaPoints-Wrapper">
            {yogas?.length > 0 &&
              yogas.map((y) => (
                <div className="yogaCard">
                  {Object.keys(y).toString().replaceAll("_", " ")}
                  {` : `}
                  {Object.values(y)}
                </div>
              ))}
          </div>
        </div>
        <div className="yogaStack">
          <div className="yogTitle">Lagna and Sun</div>
          <Chart
            lagnaRashi={data?.chart?.lagna}
            planets={data?.chart?.planets}
            moonRashi={data?.chart?.moonLongitude}
            lagna={data?.chart?.lagna}
            type="lagna"
          />
          {data?.report?.lagna?.sun !== "" &&
            data?.report?.lagna?.lagnLordYuti !== "" &&
            data?.report?.lagna?.weakLagna !== "" &&
            data?.report?.lagna?.lagnaStarStat !== "" && (
              <div className="yogaPoints-Wrapper">
                {data?.report?.lagna?.sun !== "" && (
                  <div className="yogaCard">{data?.report?.lagna?.sun}</div>
                )}

                {data?.report?.lagna?.lagnLordYuti !== "" && (
                  <div className="yogaCard">
                    {data?.report?.lagna?.lagnLordYuti}{" "}
                  </div>
                )}

                {data?.report?.lagna?.weakLagna !== "" && (
                  <div className="yogaCard">
                    {" "}
                    {data?.report?.lagna?.weakLagna}{" "}
                  </div>
                )}

                {data?.report?.lagna?.lagnaStarStat !== "" && (
                  <div className="yogaCard">
                    {" "}
                    {data?.report?.lagna?.lagnaStarStat}{" "}
                  </div>
                )}
              </div>
            )}
        </div>
        <div className="yogaStack">
          <div className="yogTitle">Doshas</div>
          <div className="yogaPoints-Wrapper">
            {yogas.length > 0 &&
              doshas.map((d) => (
                <div className="yogaCard">
                  {Object.keys(d).toString().replaceAll("_", " ")}
                  {` : `}
                  {Object.values(d)}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Yogs;
