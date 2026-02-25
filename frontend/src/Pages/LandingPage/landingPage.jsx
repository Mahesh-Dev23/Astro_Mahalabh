import "./landingPage.css";
import { useState, useEffect } from "react";
import { baseURL } from "../../Server/server.js";
import Chart from "../../Components/Chart.jsx";
import PlanetsList from "../../Components/PlanetsList.jsx";
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

  //Temporay Client Details for Testing Purpose ---------------------------------------------------------------
  const user = {
    name: "Salil",
    dob: "2002-06-11",
    time: "12:20",
    lat: "19.07",
    lon: "72.87",
  };


  // To Fetch the MAIN ASTRO DATA based upon the client details from the SERVER --------------------------------- 
  const fetchAstroData = async () => {
    const response = await fetch(
      `${baseURL}/api/get-full-chart?dob=${user.dob}T${user.time}&lat=${user.lat}&lon=${user.lon}`,
    );
    const result = await response.json();
    setData(result);
  };


  // To SET the data in the LOCAL STORAGE -----------------------------------------------------------------------
  useEffect(() => {
    if (data) {
      localStorage.setItem(`Astro Data`, JSON.stringify(data));
    }
  }, [data]);


  // To UNSET the data in the LOCAL STORAGE -----------------------------------------------------------------------
  const unsetClientData = () => {
    localStorage.removeItem(`Astro Data`);
    setData(null);
  }

  return (
    <>
      <PageTitle />

      <div className="page-buttons-section">
        <ButtonPrimary
          buttonText="Generate Chart"
          onClick={fetchAstroData}
        />

        <ButtonPrimary
          buttonText="Unset Client Data"
          onClick={() => unsetClientData()}
        />
      </div>

      {/* Chart and Planets Details Section --------------------------------------------------------------------------------- */}
      {
        data && (
          <div className="charts-detail-section">
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

            <PlanetsList planets={data.chart?.planets} />
          </div>
        )}
    </>
  );
};

export default LandingPage;
