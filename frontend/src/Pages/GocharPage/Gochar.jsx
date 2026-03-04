import { useState, useEffect } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import Chart from "../../Components/Chart.jsx";
import PlanetsList from "../../Components/PlanetsList.jsx";
import ButtonPrimary from "../../Components/Buttons/ButtonPrimary.jsx";

const Gochar = () => {
  // Data setup
  const [data, setData] = useState({});
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData?.gochar);
    }
  }, []);

  // console.log(data?.chart?.planets);

  return (
    <>
      <PageTitle />
      {data && (
        <div className="chart-wrapper">
          <Chart
            lagnaRashi={data?.chart?.lagna}
            planets={data?.chart?.planets}
            moonRashi={data?.chart?.moonLongitude}
            type="lagna"
          />
          <div>
            <Chart
              lagnaRashi={data?.chart?.navmanshaLagna}
              planets={data?.chart?.navmanshaPlanets}
              type="nav"
            />
            {/* <div className="controls">
              <ButtonPrimary buttonText="M" onClick={fetchAstroData} />
              <ButtonPrimary buttonText="N" onClick={fetchAstroData} />
              <ButtonPrimary buttonText="G" onClick={fetchAstroData} />
            </div> */}
          </div>

          <PlanetsList planets={data?.chart?.planets} />
        </div>
      )}
      {/* <div className="controls">
        <ButtonPrimary
          buttonText={loading ? "Generating..." : "Creat Chart"}
          onClick={fetchAstroData}
        />

        <ButtonPrimary
          buttonText="Unset Client Data"
          onClick={unsetClientData}
        />
      </div> */}
    </>
  );
};

export default Gochar;
