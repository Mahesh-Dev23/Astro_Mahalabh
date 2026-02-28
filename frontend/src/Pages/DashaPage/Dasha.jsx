import { useState, useEffect } from "react";
import "../../main.css";
import "./dasha.css";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";

const Dasha = () => {
  // Data setup
  const [data, setData] = useState([]);
  const [dasha, setDasha] = useState(0);
  const [antDasha, setAntDasha] = useState(0);
  // const [dasha, setdasha] = useState(0);
  // const [activeColor, setActiveColor] = useState("");
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData.chart.dasha);
    }
  }, []);

  const findCurrentDasha = (dates, i) => {
    const now = new Date().getTime();
    // console.log(dates);
    // const index = dates.findIndex((range) => {
    const startDate = new Date(dates.start).getTime();
    const endDate = new Date(dates.end).getTime();
    // console.log(startDate);
    // console.log(dates.planet);
    const dasha = now >= startDate && now <= endDate ? i : 0;
    // });
    // console.log(dasha);
    return dasha;
  };
  useEffect(() => {
    let dashaIndex = 0;
    for (let x = 0; x < data.length; x++) {
      if (dashaIndex > 0) {
        break;
      }
      dashaIndex = findCurrentDasha(data[x], x);
    }

    dashaIndex != 0 && setDasha(dashaIndex);
    // setDasha(data[dasha]);
    // setActiveColor(`p${data[dasha]?.planet}`);
  }, [data]);

  useEffect(() => {
    let antdashaIndex = 0;
    for (let x = 0; x < data[dasha]?.antardashas?.length; x++) {
      if (antdashaIndex > 0) {
        break;
      }
      antdashaIndex = findCurrentDasha(data[dasha]?.antardashas, x);
    }
    data &&
      data[dasha]?.antardashas?.map((p, i) => {
        antdashaIndex = findCurrentDasha(p, i);
      });
    antdashaIndex != 0 && setAntDasha(antdashaIndex);
  }, [dasha]);
  // console.log(dasha, antDasha);
  console.log(data[dasha]?.planet, data[dasha]?.antardashas[antDasha]?.planet);

  return (
    <div className="av-container">
      <PageTitle />
      <div className="dash-Wrapper">
        {/* {data?.map((dashaPlanet, i) => ( */}
        <div
          className="dashaCard"
          // style={{
          //   border:
          //     dashaPlanet.planet == data[dasha]?.planet &&
          //     // adPlanet == data[dasha]?.antardashas[antDasha]?.planet &&
          //     `2px solid var(--p${dashaPlanet.planet})`,
          // }}
        >
          <div className="dashaTitle">
            <div
              className="dashaLord"
              style={{ background: `var(--p${data[dasha]?.planet})` }}
            >
              {data[dasha]?.planet}
            </div>
            <div className="dashaTime">{`${data[dasha]?.start.split("T")[0]} - ${data[dasha]?.end.split("T")[0]}`}</div>
          </div>
          <div className="antDashaList">
            {data[dasha]?.antardashas.map((adPlanet, i) => (
              <div
                className="antarDashaRow"
                style={{
                  border:
                    data[dasha]?.planet == data[dasha]?.planet &&
                    adPlanet.planet ==
                      data[dasha]?.antardashas[antDasha]?.planet &&
                    `2px solid var(--p${data[dasha]?.planet})`,
                }}
              >
                <div
                  className="antarDashaLord"
                  style={{
                    color: `var(--p${adPlanet.planet})`,
                  }}
                >
                  {adPlanet.planet}
                </div>
                <div>{`${adPlanet.start.split("T")[0]} - ${adPlanet.end.split("T")[0]}`}</div>
              </div>
            ))}
          </div>
        </div>
        {/* ))} */}
        <div
          className="controls"
          style={{ borderTop: `1px solid var(--${data[dasha]?.planet})` }}
        >
          {data.map((p, i) => (
            <div
              key={p.planet}
              onClick={() => setDasha(i)}
              style={{
                padding: "8px 16px",
                backgroundColor:
                  data[dasha]?.planet === p.planet
                    ? `var(--p${data[dasha]?.planet})`
                    : `var(--background)`,
                color:
                  data[dasha]?.planet === p.planet
                    ? `var(--bg-card)`
                    : `var(--pRahu)`,
              }}
              className="controlsButton"
            >
              {p.planet}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dasha;
