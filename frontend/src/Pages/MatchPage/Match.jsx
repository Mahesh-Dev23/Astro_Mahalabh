import { useState, useEffect } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import Chart from "../../Components/Chart.jsx";

const Match = () => {
  // Data setup
  const [data, setData] = useState(null);
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
    }
  }, []);

  console.log(data);

  return (
    <div className="av-container">
      <PageTitle />
      <div className="chart-wrapper">
        <div className="match-column">
          <Chart
            lagnaRashi={data?.chart?.lagna}
            planets={data?.chart?.planets}
            moonRashi={data?.chart?.moonLongitude}
            type="lagna"
          />
          {/* <div className="username">
            {`${selectedUser.name} : `}
            <span>{`${selectedUser.dob}, ${selectedUser.time}`}</span>
          </div>
          <div className="username">
            Dasha:
            <span>{` ${data?.currentDasha?.dashaLord?.planet} - ${data?.currentDasha?.currentAntarDasha?.planet}: ${dateRearrange(data?.currentDasha?.currentAntarDasha?.start)} - ${dateRearrange(data?.currentDasha?.currentAntarDasha?.end)}`}</span>
          </div> */}
        </div>
        {/* <div className="av-column">
          {secondChart === "M" && (
            <Chart
              lagnaRashi={data?.chart?.planets[1].rashi}
              planets={data?.chart?.planets}
              type="nav"
            />
          )}
          {secondChart === "N" && (
            <Chart
              lagnaRashi={data?.chart?.navmanshaLagna}
              planets={data?.chart?.navmanshaPlanets}
              type="nav"
            />
          )}
          {secondChart === "G" && (
            <Chart
              lagnaRashi={data?.chart?.navmanshaLagna}
              planets={data?.chart?.navmanshaPlanets}
              type="nav"
            />
          )}
          <div className="controls2">
            <ButtonRound
              buttonText="M"
              active={secondChart}
              onClick={(e) => getSecondChart(e)}
            />
            <ButtonRound
              buttonText="N"
              active={secondChart}
              onClick={(e) => setSecondChart(e)}
            />
            <ButtonRound
              buttonText="G"
              active={secondChart}
              onClick={(e) => setSecondChart(e)}
            />
          </div>
        </div> */}
        {/* <div>
          <PlanetsList planets={data?.chart?.planets} />
        </div> */}
        <div className="match-column">1</div>
      </div>
    </div>
  );
};

export default Match;
