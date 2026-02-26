import "./landingPage.css";
import { useState, useEffect } from "react";
import { baseURL } from "../../Server/server.js";
import Chart from "../../Components/Chart.jsx";
import PlanetsList from "../../Components/PlanetsList.jsx";
import ButtonPrimary from "../../Components/Buttons/ButtonPrimary.jsx";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";

const LandingPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // CORE Function to FETCH DATA -----------------------------------------------------------------------------------
  const fetchAstroData = async () => {

    // Temporary Client Details 
    const user = {
      name: "Salil",
      dob: "2002-06-11",
      time: "12:20",
      lat: "19.07",
      lon: "72.87",
    };

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${baseURL}/api/get-full-chart?dob=${user.dob}T${user.time}&lat=${user.lat}&lon=${user.lon}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch astrology data");
      }

      const result = await response.json();

      setData(result);

      // To SET data in LOCAL STORAGE ----------------------------------------------------------------------------
      localStorage.setItem("Astro Data", JSON.stringify(result));

    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };


  // To check data in Local Storage - On Page Load ----------------------------------------------------------------
  useEffect(() => {
    const storedData = localStorage.getItem("Astro Data");

    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);


  // To UNSET data from LOCAL STORAGE ----------------------------------------------------------------------------
  const unsetClientData = () => {
    localStorage.removeItem("Astro Data");
    setData(null);
  };

  return (
    <>
      <PageTitle />

      <div className="page-buttons-section">
        <ButtonPrimary
          buttonText={loading ? "Generating..." : "Generate Chart"}
          onClick={fetchAstroData}
        />

        <ButtonPrimary
          buttonText="Unset Client Data"
          onClick={unsetClientData}
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      {/* Charts Section */}
      {data && (
        <div className="charts-detail-section">
          <Chart
            lagnaRashi={data?.chart?.lagna}
            planets={data?.chart?.planets}
            moonRashi={data?.chart?.moonLongitude}
            type="lagna"
          />

          <Chart
            lagnaRashi={data?.chart?.navmanshaLagna}
            planets={data?.chart?.navmanshaPlanets}
            type="nav"
          />

          <PlanetsList planets={data?.chart?.planets} />
        </div>
      )}
    </>
  );
};

export default LandingPage;