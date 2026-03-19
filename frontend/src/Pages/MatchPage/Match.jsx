import { useState, useEffect } from "react";
import "./match.css";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import Chart from "../../Components/Chart.jsx";
import ModalNewDetails from "../../Components/Modal/ModalNewDetails.jsx";
import ButtonPrimary from "../../Components/Buttons/ButtonPrimary.jsx";
import { fetchAstroData } from "../../Modules/fetchAstroData.js";
import { getCurrentDahsa } from "../../Modules/getCurrenDash.js";
import { gunaMilan } from "../../Modules/matchmaking/gunaMilan.js";

const Match = () => {
  // Data setup
  const [data, setData] = useState(null);
  const [partner, setPartner] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [match, setMatch] = useState(null);
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
    }
  }, []);
  // select which modal to open
  const getThisModal = () => {
    setModalOpen(true);
  };

  // set Selected user ---------------------------------
  const setUser = (user) => {
    console.log("match", user);
    let nerPartner = {
      name: user.name,
      dob: user.dob,
      time: user.time,
      lat: "19.07",
      lon: "72.87",
      tz: 5.5,
    };
    console.log(nerPartner);

    fetchAstroData(nerPartner).then((res) => {
      const currentDasha = getCurrentDahsa(res.chart.dasha);
      console.log("partner", res);
      //  localStorage.setItem(
      //    "Partner Data",
      //    JSON.stringify({ ...res, currentDasha }),
      //  );
      setPartner({ ...res, currentDasha });
    });
  };
  useEffect(() => {
    partner &&
      setMatch(gunaMilan(data?.chart?.planets[1], partner?.chart?.planets[1]));
  }, [partner]);

  useEffect(() => {
    // console.log(match);
  }, [match]);

  // console.log(partner);

  return (
    <>
      <PageTitle />
      <div className="chart-wrapper">
        <div className="match-column">
          <Chart
            lagnaRashi={data?.chart?.lagna}
            planets={data?.chart?.planets}
            moonRashi={data?.chart?.moonLongitude}
            type="lagna"
          />
        </div>

        <div className="match-column">
          <div className="matchTitle">Match Points</div>
          <div className="planetList">
            {match &&
              Object.keys(match).map((gun) => (
                <div className="matchRow">{`${gun} - ${match[gun]}`}</div>
              ))}
          </div>
        </div>
        <div className="match-column">
          {partner ? (
            <Chart
              lagnaRashi={partner?.chart?.lagna}
              planets={partner?.chart?.planets}
              moonRashi={partner?.chart?.moonLongitude}
              type="lagna"
            />
          ) : (
            <ButtonPrimary
              buttonText={"Create Partner's Chart"}
              onClick={() => setModalOpen(true)}
            />
          )}
        </div>
      </div>
      {modalOpen && (
        <ModalNewDetails setModalOpen={setModalOpen} onClick={setUser} />
      )}
    </>
  );
};

export default Match;
