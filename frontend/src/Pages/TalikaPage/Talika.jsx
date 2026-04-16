import { useState, useEffect } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle";
import { generateAllVargas } from "../../Modules/talika/generateAllVargas.js";
import "./talika.css";
import { generateAllCharts } from "../../Modules/talika/generateAllCharts.js";
import Tcharts from "./Tcharts.jsx";
import { getDCharts } from "../../Modules/talika/getDCharts.js";
import { getSelectedDChart } from "../../Modules/talika/getSelectedDChart.js";
import { assertEqual } from "../../Modules/talika/testVarga.js";

export const Talika = () => {
  const [data, setData] = useState(null);
  const [planets, setPlanets] = useState(null);
  const [shodashVarga, setShodashVarga] = useState(null);
  const [vargaKeys, setVargaKeys] = useState(null);
  const [chartsByVarga, setChartByVarga] = useState(null);
  const [dIndex, setDIndex] = useState(0);
  const [vargaNames, setVargaNames] = useState(null);
  const [finalchart, setfinalchart] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [userDChart, setUserDChart] = useState(null);
  const [userStar, setUserStars] = useState(null);
  const dCharts = [
    "D1",
    "D2",
    "D3",
    "D4",
    "D5",
    "D7",
    "D8",
    "D9",
    "D10",
    "D12",
    "D16",
    "D20",
    "D24",
    "D27",
    "D30",
    "D40",
    "D45",
    "D60",
  ];
  // test -----------------------------------
  const getAllUsers = async () => {
    const user = await import("../../users.json")
      .then((res) => res)
      .then((data) => data)
      .catch((err) => console.error(err));

    setAllUsers(user);
  };
  // build charts -----------------------------
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
      setPlanets(parsedData.chart.planets);
      setShodashVarga(generateAllVargas(parsedData.chart.planets)); // for talik table
    }
    setAllUsers(getAllUsers());
  }, []);
  useEffect(() => {
    allUsers &&
      Object.keys(allUsers[data.selectedUser.name]).includes("star") &&
      setUserStars(allUsers[data.selectedUser.name].star);
  }, [allUsers]);
  useEffect(() => {
    // data &&
    //   setfinalchart(getDCharts(data.chart.planets, data.chart.lagnaLongitude));
    data &&
      setfinalchart(
        getSelectedDChart(
          data.chart.planets,
          data.chart.lagna,
          data.chart.lagnaDegree,
          "D1",
        ),
      );
  }, [data]);

  useEffect(() => {
    shodashVarga && setVargaKeys(Object.keys(shodashVarga[0])); // for talika table
  }, [shodashVarga]);

  useEffect(() => {
    // console.log(dIndex, dCharts[dIndex]);
    // {"Sun":"26-10--12""Moon":"27-54-06"}

    data &&
      setfinalchart(
        getSelectedDChart(
          data.chart.planets,
          data.chart.lagna,
          data.chart.lagnaDegree,
          dCharts[dIndex],
        ),
      );
    data &&
      allUsers &&
      Object.keys(allUsers[data?.selectedUser?.name]).includes("d") &&
      setUserDChart(
        allUsers[data?.selectedUser?.name]?.d[dIndex][dCharts[dIndex]],
      );
  }, [dIndex]);
  useEffect(() => {
    // const testData = {
    //   expected: {
    //     D60: 6,
    //     D16: 3,
    //     D20: 8,
    //   },
    // };
    // data &&
    //   finalchart &&
    //   data.chat.planets.map((p) =>
    //     assertEqual(dCharts[dIndex], D60(p.longitude), testData.expected.D60),
    //   );
  }, [finalchart]);
  // console.log(dCharts[dIndex]);
  // allUsers && console.log(allUsers);
  // console.log(userDChart);
  // console.log(userStar);
  // console.log(data);

  return (
    <div className="av-column">
      <PageTitle />
      <div className="chart-wrapper">
        <div className="av-column">
          {finalchart && <div className="talikaTitle">{dCharts[dIndex]}</div>}
          {/* {allUsers && (
            <div className="talikaTitle">{`Sample Data ${Object.keys(allUsers).length}`}</div>
          )} */}
          <div>
            {finalchart && (
              <div className="talikaRow">
                <div>
                  {"Lagna SWE"}
                  <span
                    style={{
                      color: `var(--p${userDChart && userDChart?.lagna === finalchart[dCharts[dIndex]]?.lagna ? "Mercury" : "Mars"})`,
                    }}
                  >
                    {finalchart[dCharts[dIndex]]?.lagna === userDChart?.lagna
                      ? finalchart[dCharts[dIndex]]?.lagna
                      : userDChart?.lagna}
                  </span>
                </div>
                {finalchart[dCharts[dIndex]]?.chart?.map((n, i) => (
                  <span
                    style={{
                      color: `var(--p${userDChart && userDChart?.chart[i] === n ? "Mercury" : "Mars"})`,
                    }}
                  >
                    {userDChart && userDChart?.chart[i] === n
                      ? n
                      : userDChart?.chart[i]}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div>
            {userDChart && (
              <div className="talikaRow">
                <div>
                  {"Lagna "}
                  <span>{userDChart?.lagna}</span>
                </div>
                {userDChart?.chart?.map((n) => (
                  <span>{n}</span>
                ))}
              </div>
            )}
          </div>
          {finalchart && finalchart[dCharts[dIndex]]?.chart && (
            <Tcharts
              chart={finalchart[dCharts[dIndex]]?.Rchart}
              lagna={finalchart[dCharts[dIndex]]?.lagna}
              planets={data?.chart?.planets}
            />
          )}

          <div className="controls2">
            {dCharts.map((ch, i) => (
              <div className="talikaButton" onClick={() => setDIndex(i)}>
                {ch}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="talikaTitle">Degree Difference</div>
          {userStar &&
            userStar.map((us, i) => (
              <div className="talikaRow">
                <span>{us.deg}</span>
                <span>
                  {(
                    us.deg - data?.chart?.planets[i]?.degree?.toFixed(2)
                  ).toFixed(2)}
                </span>
                <span> {data?.chart?.planets[i]?.degree?.toFixed(2)}</span>
              </div>
            ))}
        </div>
        {/* Talika Table -------------------------------------
        <div className="tilikaTable">
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
