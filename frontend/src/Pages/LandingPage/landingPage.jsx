import "../../main.css";
import { useState } from "react";
import { baseURL } from "../../Server/server";
import Chart from "../../Components/Chart";
import PlanetsList from "../../Components/PlanetsList";
import Ashtakvarg from "../../Components/Ashtakvarg";

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
    name: "",
    dob: "2006-10-09",
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

  return (
    <div className="main">
      <button onClick={fetchAstroData}>Calculate Chart</button>
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
