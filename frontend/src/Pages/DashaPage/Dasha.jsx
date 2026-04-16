import { useState, useEffect } from "react";
import "../../main.css";
import "./dasha.css";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import { dateRearrange } from "../../Modules/dateRearrange.js";
import Chart from "../../Components/Chart.jsx";
import { getThreeMonthSegments } from "../../Modules/getThreeMonthSegments.js";
import { fetchAstroData } from "../../Modules/fetchAstroData.js";

const Dasha = () => {
  // Data setup
  const [localData, setLocalData] = useState({});
  const [data, setData] = useState(null);
  const [gochar, setGochar] = useState(null);
  const [dasha, setDasha] = useState(0);
  const [adIndex, setADIndex] = useState(0);
  const [pdIndex, setPDIndex] = useState(0);
  const [pd, setPd] = useState(null);
  const [pdArray, setPdArray] = useState(0);
  const [pdGocharData, setPDGocharData] = useState(null);
  const [currentPDInd, setCurrentPDInd] = useState(0);
  const [currentPD, setCurrentPD] = useState(null);

  // gnerate pratyantar dasha --------------------------------
  const generateDasha = (antardasha) => {
    // console.log("Start 1");
    const dashaYears = {
      Ketu: 7,
      Venus: 20,
      Sun: 6,
      Moon: 10,
      Mars: 7,
      Rahu: 18,
      Jupiter: 16,
      Saturn: 19,
      Mercury: 17,
    };
    const order = [
      "Ketu",
      "Venus",
      "Sun",
      "Moon",
      "Mars",
      "Rahu",
      "Jupiter",
      "Saturn",
      "Mercury",
    ];

    let startDate = new Date(antardasha?.start);
    // console.log("Start 2", startDate);
    const endDate = new Date(antardasha?.end);

    const totalMs = endDate - startDate;

    const result = [];

    const startIndex = order.indexOf(antardasha?.planet);

    for (let i = 0; i < 9; i++) {
      let currentStart = startDate;
      const planet = order[(startIndex + i) % 9];

      const ratio = dashaYears[planet] / 120;
      const duration = totalMs * ratio;

      const currentEnd = new Date(currentStart.getTime() + duration);
      const today = new Date();
      // console.log(
      //   currentStart.getTime() < today.getTime(),
      //   planet,
      //   currentEnd.getTime() < today.getTime(),
      // );
      if (
        currentStart.getTime() < today.getTime() &&
        currentEnd.getTime() > today.getTime()
      ) {
        setCurrentPDInd(i);
        setPDIndex(i);
        // currentStart.getTime() < today &&
        // console.log(
        //   `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        //   planet,
        //   `${currentStart.getFullYear()}-${currentStart.getMonth() + 1}-${currentStart.getDate()}`,
        //   `${currentEnd.getFullYear()}-${currentEnd.getMonth() + 1}-${currentEnd.getDate()}`,

        // );
      }

      result.push({
        planet,
        start: `${currentStart.getFullYear()}-${currentStart.getMonth() + 1}-${currentStart.getDate()}`,
        end: `${currentEnd.getFullYear()}-${currentEnd.getMonth() + 1}-${currentEnd.getDate()}`,
        startDate: currentStart,
        endDate: currentEnd,
      });

      startDate = currentEnd;
      // console.log("Start 5", currentStart);
    }
    result[result.length - 1].endDate = endDate;
    return result;
  };

  // get gochar from selected date --------------------------------------
  const getGochar = (date) => {
    const user = {
      name: "PD Gochar",
      dob: date,
      time: "8:45",
      lat: "19.07",
      lon: "72.87",
      tz: 5.5,
    };
    // console.log(user.dob, date);
    fetchAstroData(user).then((res) => {
      setPDGocharData(res);
    });
  };

  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
      setLocalData(parsedData);
      setDasha(parsedData?.currentDasha?.dashaIndex);
    }
    const gocharData = localStorage.getItem("Gochar Data");

    if (gocharData) {
      const parsedData = JSON.parse(gocharData);
      setGochar(parsedData);
    }
  }, []);

  useEffect(() => {
    // console.log(localData?.chart?.dasha[dasha]);
    // console.log(localData?.currentDasha?.currentAntarDasha);
    setPd(generateDasha(localData?.currentDasha?.currentAntarDasha));
  }, [localData]);
  useEffect(() => {
    // console.log(adIndex);
    // console.log(localData?.chart?.dasha[dasha]?.antardashas[adIndex]);
    setPd(generateDasha(localData?.chart?.dasha[dasha]?.antardashas[adIndex]));
  }, [dasha, adIndex]);

  useEffect(() => {
    // console.log(pd);
    pd?.map((p) => {
      // console.log(p);
      setPdArray(getThreeMonthSegments(p.planet, p.startDate, p.endDate, 3));
    });
  }, [pd]);
  useEffect(() => {
    pd &&
      setPdArray(
        getThreeMonthSegments(
          pd[pdIndex]?.planet,
          pd[pdIndex]?.startDate,
          pd[pdIndex]?.endDate,
          3,
        ),
      );
  }, [pdIndex]);

  useEffect(() => {
    !currentPD && pd && setCurrentPD(pd[currentPDInd]);
  }, [currentPDInd]);
  // // console.log(pdArray);
  // currentPD && console.log(currentPD);
  // console.log(currentPDInd, pdIndex);

  return (
    <>
      <PageTitle
        selectedUser={data?.selectedUser}
        currentDasha={data?.currentDasha}
        time={gochar?.chart?.currentTime}
      />
      {data && (
        <div className="dasha-Wrapper">
          <div className="dashaCard">
            {/* Main Dasha lords -------------------------------------------------------*/}
            <div className="dashaButtonStack">
              {/* <div>{`Dashas ${data?.chart?.dasha[dasha]?.planet}`}</div> */}
              <div>
                {" "}
                Dasha{" "}
                <span
                  style={{
                    color: `var(--p${data?.chart?.dasha[dasha]?.planet})`,
                  }}
                >{` ${data?.chart?.dasha[dasha]?.planet}`}</span>
              </div>
              {data?.chart?.dasha?.map((p, i) => (
                <div
                  key={p.planet}
                  onClick={() => setDasha(i)}
                  style={{
                    backgroundColor:
                      data?.chart?.dasha[dasha]?.planet === p.planet
                        ? `var(--p${p.planet})`
                        : `var(--bg-light)`,
                    color:
                      data?.chart?.dasha[dasha]?.planet === p.planet
                        ? `var(--bg-card)`
                        : `var(--primary-color)`,
                  }}
                  className="dashaButton"
                >
                  <div>{p.planet} </div>
                  {`${dateRearrange(p.start)} `}{" "}
                  {/* &#129030;
                  {` ${dateRearrange(data?.chart?.dasha[dasha]?.end)}`} */}
                </div>
              ))}
            </div>
            {/* --------------------------------------------------------------------- */}
            {/* <div className="dashaTitle">
              <div
                className="dashaLord"
                style={{
                  background: `var(--p${data?.chart?.dasha[dasha]?.planet})`,
                }}
              >
                {data?.chart?.dasha[dasha]?.planet}
              </div>
              <div className="dashaTime">
                {`${dateRearrange(data?.chart?.dasha[dasha]?.start)} `}{" "}
                &#129030;
                {` ${dateRearrange(data?.chart?.dasha[dasha]?.end)}`}
              </div>
            </div> */}
            {/* Antar Dasha lords -------------------------------------------------------*/}
            <div className="dashaButtonStack">
              <div>
                {" "}
                Antardasha{" "}
                <span
                  style={{
                    color: `var(--p${localData?.currentDasha?.currentAntarDasha?.planet})`,
                  }}
                >{` ${localData?.currentDasha?.currentAntarDasha?.planet}`}</span>
              </div>
              {data?.chart?.dasha[dasha]?.antardashas?.map((adPlanet, i) => (
                <div
                  onClick={() => setADIndex(i)}
                  className="dashaButton"
                  style={{
                    border:
                      adPlanet.planet ==
                        data?.chart?.dasha[dasha]?.antardashas[adIndex]
                          ?.planet && `2px solid var(--p${adPlanet?.planet})`,
                    backgroundColor:
                      data?.chart?.dasha[dasha]?.planet ===
                        localData?.currentDasha?.dashaLord?.planet &&
                      adPlanet.planet ===
                        localData?.currentDasha?.currentAntarDasha?.planet
                        ? `var(--p${adPlanet.planet})`
                        : `var(--bg-light)`,
                    color:
                      data?.chart?.dasha[dasha]?.planet ===
                        localData?.currentDasha?.dashaLord?.planet &&
                      adPlanet.planet ===
                        localData?.currentDasha?.currentAntarDasha?.planet
                        ? `var(--bg-light)`
                        : `var(--primary-color)`,
                  }}
                >
                  <div
                    className="antarDashaLord"
                    // style={{
                    //   background: `var(--p${adPlanet?.planet})`,
                    // }}
                  >
                    {adPlanet?.planet}
                  </div>
                  <div className="antDashsDates">
                    {`${dateRearrange(adPlanet?.start)}  `}
                    {/* &#129030;
                    {` ${dateRearrange(adPlanet?.end)}`} */}
                  </div>
                </div>
              ))}
            </div>
            {/* Pratyantar Dasha lords -------------------------------------------------------*/}
            <div className="pdList">
              <div>
                Pratyantar Dasha{" "}
                <span
                  style={{
                    color: `var(--p${currentPD?.planet})`,
                  }}
                >{` ${currentPD?.planet}`}</span>
              </div>
              {pd &&
                pd?.map((p, i) => (
                  <div
                    onClick={() => setPDIndex(i)}
                    className="dashaButton"
                    style={{
                      border:
                        i === pdIndex &&
                        `2px solid var(--p${pd[pdIndex]?.planet})`,
                      backgroundColor:
                        pd[0].planet ===
                          localData?.currentDasha?.currentAntarDasha?.planet &&
                        p.planet === currentPD?.planet
                          ? `var(--p${currentPD?.planet})`
                          : `var(--bg-light)`,
                      color:
                        pd[0].planet ===
                          localData?.currentDasha?.currentAntarDasha?.planet &&
                        p.planet === currentPD?.planet &&
                        `var(--bg-light)`,
                    }}
                  >
                    <div
                      style={{
                        color:
                          pd[0].planet ===
                            localData?.currentDasha?.currentAntarDasha
                              ?.planet && p.planet === currentPD?.planet
                            ? `var(--bg-light)`
                            : `var(--p${p.planet})`,
                        fontWeight: "600",
                      }}
                    >
                      {p.planet}
                    </div>
                    <div>
                      {`${dateRearrange(p?.start.toString())}  `} &#129030;
                      {` ${dateRearrange(p?.end.toString())}`}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <Chart
              lagnaRashi={data?.chart?.lagna}
              planets={
                pdGocharData
                  ? pdGocharData?.chart?.planets
                  : data?.chart?.planets
              }
              moonRashi={
                pdGocharData
                  ? pdGocharData?.chart?.moonLongitude
                  : data?.chart?.moonLongitude
              }
              lagna={data?.chart?.lagna}
              type="lagna"
            />
            <div className="pdGochar">
              <span
                style={{ background: `var(--p${pd && pd[pdIndex]?.planet})` }}
              >
                {pd && pd[pdIndex]?.planet}
              </span>
              {pdArray &&
                pdArray?.map((dt) => (
                  <span
                    onClick={() => getGochar(dt.start)}
                    style={{ background: `var(--p${dt.planet})` }}
                  >
                    {dateRearrange(dt.start)}
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}
      <div
        className="controls"
        style={{
          borderTop: `1px solid var(--p${data && data?.chart?.dasha[dasha]?.planet})`,
        }}
      ></div>
    </>
  );
};

export default Dasha;
