import "./landingPage.css";
import { useState, useEffect } from "react";
import { baseURL } from "../../Server/server.js";
import Chart from "../../Components/Chart.jsx";
import PlanetsList from "../../Components/PlanetsList.jsx";
import Ashtakvarg from "../../Components/Ashtakvarg.jsx";
import ButtonPrimary from "../../Components/Buttons/ButtonPrimary.jsx";
import PageTitle from "../../Components/PageTItle/PageTitle.jsx";

const LandingPage = () => {
  const [data, setData] = useState(null);

  //   const user = {
  //     name: "",
  //     dob: "1971-09-23",
  //     time: "12:35",
  //     lat: "19.07",
  //     lon: "72.87",
  //   };
  const user = {
    name: "Salil",
    dob: "2002-06-11",
    time: "12:20",
    lat: "19.07",
    lon: "72.87",
  };

  const fetchAstroData = async () => {
    const response = await fetch(
      `${baseURL}/api/get-full-chart?dob=${user.dob}T${user.time}&lat=${user.lat}&lon=${user.lon}`,
    );
    const result = await response.json();

    setData(result);
  };

  // To set the data in the LOCAL STORAGE
  useEffect(() => {
    if (data) {
      localStorage.setItem(`Data for Client - ${user.name}`, JSON.stringify(data));
    }
  }, [data, user.name]);

  const unsetClientData = () => {
    localStorage.removeItem(`Data for Client - ${user.name}`);
    setData(null);
  }

  return (
    <div className="main">

      <PageTitle />
      <ButtonPrimary
        buttonText="Generate Chart"
        onClick={fetchAstroData}
      />

      <ButtonPrimary
        buttonText="Unset Client Data"
        onClick={() => unsetClientData()}
      />

      {data && (
        <div className="app-container">
          <div className="chartsTwo">
            <Chart
              lagnaRashi={data.chart?.lagna}
              planets={data.chart?.planets}
              moonRashi={data.chart?.moonLongitude}
              type="lagna"
            />
            <Chart
              lagnaRashi={data.chart?.navmanshaLagna}
              planets={data.chart?.navmanshaPlanets}
              // moonRashi={data.chart?.navmansha.moonLongitude}
              type="nav"
            />
            {/* <PlanetsList planets={data.chart?.planets} /> */}
          </div>
          <PlanetsList planets={data.chart?.planets} />
          <Ashtakvarg planets={data.chart?.planets} lagna={data.chart?.lagna} />

          {/* <div className="dasha-card">
                        <h3>Vimshottari Dasha</h3>
                        {data.timeline.map((d, i) => (
                            <div key={i} className="dasha-item">
                                <strong>{d.lord}</strong>
                                <span>{new Date(d.end).getFullYear()}</span>
                            </div>
                        ))}
                    </div> */}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
