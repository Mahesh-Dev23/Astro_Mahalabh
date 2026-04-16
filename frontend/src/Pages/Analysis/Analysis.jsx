import { useState, useEffect } from "react";
import "../../main.css";
import PageTitle from "../../Components/PageTitle/PageTitle";

import ButtonSecondary from "../../Components/Buttons/ButtonSecondary";

import { setUser } from "../../Modules/analysis/setUser";
import { getAllUsers } from "../../Modules/analysis/getAllUsers";
import { getLocalData } from "../../Modules/analysis/getLocalData.js";
import { getDtaforDChart } from "../../Modules/analysis/getDtaforDChart.js";
import { postAstroData } from "../../Modules/postAstroData.js";
import { getSelectedDChart } from "../../Modules/talika/getSelectedDChart.js";

const Analysis = () => {
  const [data, setData] = useState(null);
  const [userSWE, setUserSWE] = useState(null);
  const [astroData, setAstroData] = useState(null);
  const [names, setNames] = useState([]);
  const [SWENames, setSWENames] = useState([]);
  const [anTab, setAnTab] = useState("stars");
  const analyse = ["stars", "charts"];
  const [localAstroData, setLocalAstroData] = useState(false);
  const [dIndex, setDIndex] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [triger, setTriger] = useState(false);
  const [talikaCharts, setTalikaCharts] = useState(null);
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
  // users from user.json -----------------------------

  const creatJsonFile = () => postAstroData(astroData);

  useEffect(() => {
    // setData(getAllUsers());
    getAllUsers().then((res) => {
      setData(res.allUsers); // user basic data for fetch request
      setNames(res.names);

      // setUser(res.allUsers).then((r) => setAstroData(r)); // open when new users has to be added
    });

    setAnTab("charts");
    const usersData = import("../../allUsers.json")
      .then((res) => res)
      .then((data) => setUserSWE(data.allUsers))
      .catch((err) => console.error(err));

    // getLocalData();
  }, []);
  useEffect(() => {
    // data && setNames(Object.keys(data));
  }, [data]);
  useEffect(() => {
    // console.log(astroData);
    // astroData !== null && setTriger(true);
    // postAstroData(astroData);
    //  writeJsonFile('../../allUserCharts.json', {foo: true});
    // localStorage.setItem("All Astro Data2", JSON.stringify(astroData));
    // console.log("local set");
    // allUSersData && setLocal(true);
  }, [astroData]);
  useEffect(() => {
    // astroData &&
    //   astroData.map((asd, i) => {
    //     console.log("asd", asd);
    //     // getDtaforDChart(asd, dCharts[dIndex]);
    //   });
    // console.log(names);
    // console.log(astroData);
    // astroData.map((ad) => console.log(Object.keys(ad)[0]));

    let chartData = [];
    // dIndex &&
    //   astroData &&
    //   names.map((name, i) =>
    //     // console.log(Object.keys(astroData).includes(name)),
    //     astroData.map(
    //       (ad) =>
    //         Object.keys(ad)[0] === name &&
    //         chartData.push({
    //           [name]: getDtaforDChart(ad[name], dCharts[dIndex]),
    //         }),
    //     ),
    //   );
    // // console.log(chartData);
    // setChartData(chartData);
    // console.log(SWENames);
    // set talika charts --------------------
    userSWE &&
      dIndex &&
      userSWE.map((usw, i) => {
        Object.keys(usw)[0] === SWENames[i] &&
          chartData.push({
            [Object.keys(usw)[0]]: getSelectedDChart(
              usw[SWENames[i]]?.chart?.planets,
              usw[SWENames[i]]?.chart?.lagna,
              usw[SWENames[i]]?.chart?.lagnaDegree,
              dCharts[dIndex],
            ),
          });
      });
    setTalikaCharts(chartData);
  }, [dIndex]);

  useEffect(() => {
    let newNames = [];
    userSWE &&
      userSWE.map((us) => {
        newNames.push(Object.keys(us)[0]);
      });
    setSWENames(newNames);
  }, [userSWE]);

  // localAstroData && console.log(localAstroData);
  // console.log(names);
  // const getDeg = (d1, d2) => {};
  // console.log(dCharts[dIndex]);
  // chartData && console.log(chartData);
  // chartData &&
  //   chartData.map((cd, i) =>
  //     console.log(names[i], cd[names[i]][dCharts[dIndex]].lagna),
  //   );
  // console.log(data[0].d[dIndex][dCharts[dIndex]]);
  // userSWE && console.log(userSWE[0][data[0].name].chart.lagna);
  // userSWE && console.log(userSWE);
  // userSWE &&
  //   data &&
  //   data.map((dt, i) =>
  //     console.log(
  //       dt.name === userSWE[i][dt.name] ? userSWE[i][dt.name] : dt.name,
  //       false,
  //       userSWE[dt.name],
  //     ),
  //   );
  // talikaCharts &&
  //   dIndex &&
  //   talikaCharts?.map(
  //     (tc) => tc && console.log(tc[Object?.keys(tc)[0]][dCharts[dIndex]].chart),
  //   );
  // talikaCharts && console.log(talikaCharts[0]);
  return (
    <div>
      {/* <PageTitle /> */}
      <div className="chart-wrapper" style={{ flexWrap: "wrap" }}>
        {anTab === "stars" &&
          names &&
          data &&
          names.map(
            (name) =>
              Object.keys(data[name]).includes("d") && (
                <div key={name.trim(" ")}>
                  {name}
                  {data[name].star?.map((d, i) => (
                    <div>
                      {}
                      {data?.chart?.planets[i]?.degree - d.deg}
                      {d.deg}
                    </div>
                  ))}
                </div>
              ),
          )}
        {/* ---------------------------------------------------------------------------------------------------- */}
        {anTab === "charts" && (
          <div className="analysisDisplay">
            <div className="controls2">
              {/* <div
                className="button-secondary"
                onClick={() => setUser(names, data)}
              >
                get Users
              </div> */}
              {triger && (
                <div
                  className="button-secondary"
                  onClick={() => creatJsonFile()}
                >
                  get data
                </div>
              )}
            </div>
            <div className="av-column">
              {/* <div className="analysisList">
                {chartData &&
                  chartData.map((ch, i) => (
                    <div className="analysisRow">
                      <div>{names[i]}</div>
                      <div>{ch[names[i]][dCharts[dIndex]].lagna}</div>
                    </div>
                  ))}
              </div> */}
              <div className="analysisList">
                {data &&
                  data.map(
                    (user, i) =>
                      Object.keys(user).includes("d") &&
                      SWENames.includes(user?.name) && (
                        <div className="analysisPanel">
                          {" "}
                          <div className="analysisRow">
                            <div
                              style={{
                                color: `var(--p${SWENames[SWENames.indexOf(user?.name)] === user?.name ? "Mercury" : "Mars"})`,
                              }}
                            >
                              {user?.name}
                            </div>
                            <div
                              className="analagna"
                              style={{
                                background: `var(--p${
                                  userSWE[SWENames.indexOf(user?.name)][
                                    user?.name
                                  ]?.chart?.lagna === user?.d[0]["D1"]?.lagna
                                    ? "Mercury"
                                    : "Mars"
                                })`,
                              }}
                            >
                              {userSWE &&
                                userSWE[SWENames.indexOf(user?.name)][
                                  user?.name
                                ]?.chart?.lagna}
                              {/* {user?.d[0]["D1"]?.lagna} */}
                            </div>
                            <div
                              style={{
                                color: `var(--p${
                                  userSWE[SWENames.indexOf(user?.name)][
                                    user?.name
                                  ]?.chart?.lagnaDegree ===
                                  user?.star[user?.star.length - 1]?.lDeg
                                    ? "Mercury"
                                    : "Mars"
                                })`,
                              }}
                            >
                              {` ${
                                userSWE[SWENames.indexOf(user?.name)][
                                  user?.name
                                ]?.chart?.lagnaDegree
                              }`}
                            </div>
                            <div>{`  ${(
                              userSWE[SWENames.indexOf(user?.name)][user?.name]
                                ?.chart?.lagnaDegree -
                              user?.star[user?.star.length - 1]?.lDeg
                            ).toFixed(2)}`}</div>
                            {/* <div>{user?.d[0]["D1"]?.lagna}</div> */}
                          </div>{" "}
                          <div className="analysisRow">
                            <div>{dCharts[dIndex]}</div>

                            {dIndex &&
                              talikaCharts &&
                              talikaCharts.map(
                                (tc, i) =>
                                  tc &&
                                  tc[user?.name] && (
                                    <div className="anaChartNum">
                                      {"lagna "}
                                      <span
                                        className="analagna"
                                        style={{
                                          background: `var(--p${user.d[dIndex][dCharts[dIndex]].lagna === tc[user?.name][dCharts[dIndex]]?.lagna ? "Mercury" : "Mars"})`,
                                        }}
                                      >
                                        {tc[user?.name][dCharts[dIndex]]?.lagna}
                                      </span>
                                      {"  Chart "}
                                      {tc[user?.name][
                                        dCharts[dIndex]
                                      ]?.chart?.map((ch, i) => (
                                        <span
                                          style={{
                                            color: `var(--p${user.d[dIndex][dCharts[dIndex]].chart[i] === ch ? "Mercury" : "Mars"})`,
                                          }}
                                        >
                                          {ch}
                                        </span>
                                      ))}
                                    </div>
                                  ),
                              )}
                          </div>
                          {/* <div className="anaChartNum">
                            {user.d[dIndex][dCharts[dIndex]].chart.map((ch) => (
                              <span>{ch}</span>
                            ))}
                          </div> */}
                        </div>
                      ),
                  )}
              </div>
            </div>
          </div>
        )}
        <div className="controls2">
          {dCharts.map((ch, i) => (
            <div className="talikaButton" onClick={() => setDIndex(i)}>
              {ch}
            </div>
          ))}
        </div>
      </div>
      <div className="controls">
        {analyse.map((an) => (
          <ButtonSecondary
            key={an}
            buttonText={an}
            onClick={() => setAnTab(an)}
          ></ButtonSecondary>
        ))}
      </div>
    </div>
  );
};

export default Analysis;
