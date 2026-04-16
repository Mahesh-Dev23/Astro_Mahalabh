import { useState, useEffect } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import Chart from "../../Components/Chart.jsx";
import PlanetsList from "../../Components/PlanetsList.jsx";
import ButtonPrimary from "../../Components/Buttons/ButtonPrimary.jsx";

const Gochar = () => {
  // Data setup
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const savedData = localStorage.getItem("Gochar Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
    }

    const mainData = localStorage.getItem("Astro Data");

    if (mainData) {
      const parsedData = JSON.parse(mainData);
      setUser(parsedData);
    }
  }, []);

  // console.log(user);
  // console.log(data);

  return (
    <>
      <PageTitle
        selectedUser={user?.selectedUser}
        currentDasha={user?.currentDasha}
        time={data?.chart?.currentTime}
      />
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

          <PlanetsList planets={data?.report?.planets} />
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
