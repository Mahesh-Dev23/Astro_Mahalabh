import { useState, useEffect } from "react";
import "../../main.css";
import "./dasha.css";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import { dateRearrange } from "../../Modules/dateRearrange.js";

const Dasha = () => {
  // Data setup
  const [localData, setLocalData] = useState({});
  const [data, setData] = useState(null);
  const [dasha, setDasha] = useState(0);
  // const [antDasha, setAntDasha] = useState(0);
  const [dashaStar, setDashaStar] = useState("");
  // const [activeColor, setActiveColor] = useState("");
  // console.log(dasha[dashaStar], antDasha);
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData?.chart?.dasha);
      setLocalData(parsedData);
      setDasha(parsedData?.currentDasha?.dashaIndex);
    }
  }, []);

  // const findCurrentDasha = (dates, i) => {
  //   const now = new Date().getTime();
  //   // console.log(dates);
  //   // const index = dates.findIndex((range) => {
  //   const startDate = new Date(dates.start).getTime();
  //   const endDate = new Date(dates.end).getTime();
  //   // console.log(startDate);
  //   // console.log(dates.planet);
  //   const dasha = now >= startDate && now <= endDate ? i : 0;
  //   // });
  //   // console.log(dasha);
  //   return dasha;
  // };
  // const dateRerrange = (date) => {
  //   let receivedDate = date?.split("T")[0];
  //   const newDate = `${receivedDate?.split("-")[2]} / ${receivedDate?.split("-")[1]} / ${receivedDate?.split("-")[0]}`;
  //   // console.log(newDate);
  //   return newDate;
  // };
  useEffect(() => {
    // let dashaIndex = 0;
    // for (let x = 0; x < data.length; x++) {
    //   if (dashaIndex > 0) {
    //     break;
    //   }
    //   dashaIndex = findCurrentDasha(data[x], x);
    // }
    // dashaIndex != 0 && setDasha(dashaIndex);
    // setDashaStar(data[dashaIndex]?.planet);
    // setDasha(data[dasha]);
    // setActiveColor(`p${data[dasha]?.planet}`);
  }, [data]);

  // useEffect(() => {
  //   // let antdashaIndex = 0;
  //   // for (let x = 0; x < data[dasha]?.antardashas?.length; x++) {
  //   //   if (antdashaIndex > 0) {
  //   //     break;
  //   //   }
  //   //   antdashaIndex = findCurrentDasha(data[dasha]?.antardashas, x);
  //   // }
  //   // data &&
  //   //   data[dasha]?.antardashas?.map((p, i) => {
  //   //     antdashaIndex = findCurrentDasha(p, i);
  //   //   });
  //   // antdashaIndex != 0 && setAntDasha(antdashaIndex);
  // }, [dasha]);

  // useEffect(() => {
  //   // localStorage.setItem(
  //   //   "Astro Data",
  //   //   JSON.stringify({
  //   //     ...localData,
  //   //     dasha: {
  //   //       dasha: data[dasha],
  //   //       antardashas: data[dasha]?.antardashas[antDasha],
  //   //     },
  //   //   }),
  //   // );
  // }, [antDasha]);
  console.log(data);
  // console.log({
  //   ...localData,
  //   dasha: {
  //     dasha: data[dasha],
  //     antardashas: data[dasha]?.antardashas[antDasha],
  //   },
  // });
  // console.log(localData);

  return (
    <>
      <PageTitle />
      {data && (
        <div className="dasha-Wrapper">
          <div className="dashaCard">
            <div className="dashaTitle">
              <div
                className="dashaLord"
                style={{ background: `var(--p${data[dasha]?.planet})` }}
              >
                {data[dasha]?.planet}
              </div>
              <div className="dashaTime">
                {`${dateRearrange(data[dasha]?.start)} `} &#129030;
                {` ${dateRearrange(data[dasha]?.end)}`}
              </div>
            </div>
            <div className="antDashaList">
              {data[dasha]?.antardashas?.map((adPlanet, i) => (
                <div
                  className="antarDashaRow"
                  style={{
                    border:
                      data[dasha]?.planet ==
                        localData?.currentDasha?.dashaLord?.planet &&
                      adPlanet.planet ==
                        localData?.currentDasha?.currentAntarDasha?.planet &&
                      `2px solid var(--p${data[dasha]?.planet})`,
                    background:
                      data[dasha]?.planet ==
                        localData?.currentDasha?.dashaLord?.planet &&
                      adPlanet.planet ==
                        localData?.currentDasha?.currentAntarDasha?.planet &&
                      `rgb(from var({--bg-card}) r g b / var(--no-opacity))`,
                  }}
                >
                  <div
                    className="antarDashaLord"
                    style={{
                      background: `var(--p${adPlanet?.planet})`,
                    }}
                  >
                    {adPlanet?.planet}
                  </div>
                  <div className="antDashsDates">
                    {`${dateRearrange(adPlanet?.start)}  `} &#129030;
                    {` ${dateRearrange(adPlanet?.end)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div
        className="controls"
        style={{
          borderTop: `1px solid var(--p${data && data[dasha]?.planet})`,
        }}
      >
        {data?.map((p, i) => (
          <div
            key={p.planet}
            onClick={() => setDasha(i)}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              backgroundColor:
                data[dasha]?.planet === p.planet
                  ? `var(--p${p.planet})`
                  : `var(--bg-light)`,
              color:
                data[dasha]?.planet === p.planet
                  ? `var(--bg-card)`
                  : `var(--primary-color)`,
            }}
            className="controlsButton"
          >
            {p.planet}
          </div>
        ))}
      </div>
    </>
  );
};

export default Dasha;
