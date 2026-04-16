import { useState, useEffect } from "react";
import "./match.css";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import Chart from "../../Components/Chart.jsx";
import ModalNewDetails from "../../Components/Modal/ModalNewDetails.jsx";
import ButtonPrimary from "../../Components/Buttons/ButtonPrimary.jsx";
import { fetchAstroData } from "../../Modules/fetchAstroData.js";
import { getCurrentDahsa } from "../../Modules/getCurrenDash.js";
import { gunaMilan } from "../../Modules/matchmaking/gunaMilan.js";
import SelectUserModal from "../../Components/Modal/SelectUserModal.jsx";

const Match = () => {
  // Data setup
  const [data, setData] = useState(null);
  const [gochar, setGochar] = useState(null);
  const [partner, setPartner] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [match, setMatch] = useState(null);
  const [modalType, setModalType] = useState("");
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
    }

    const gocharData = localStorage.getItem("Gochar Data");

    if (gocharData) {
      const parsedData = JSON.parse(gocharData);
      setGochar(parsedData);
    }
  }, []);

  // set Selected user ---------------------------------
  const setUser = (user) => {
    // console.log("match", user);
    let nerPartner = {
      name: user.name,
      dob: user.dob,
      time: user.time,
      lat: "19.07",
      lon: "72.87",
      tz: 5.5,
    };
    // console.log(nerPartner);

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

  // set modal type false
  useEffect(() => {
    modalOpen === false && setModalType("");
  }, [modalOpen]);

  // select which modal to open
  const getThisModal = (modalType) => {
    console.log(modalType);
    setModalType(modalType);
    setModalOpen(true);
  };

  // To UNSET data from LOCAL STORAGE ----------------------------------------------------------------------------
  const unsetClientData = () => {
    // localStorage.removeItem("Astro Data");
    setPartner(null);
  };

  // console.log(partner);

  return (
    <>
      <PageTitle
        selectedUser={data?.selectedUser}
        currentDasha={data?.currentDasha}
        time={gochar?.chart?.currentTime}
      />
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
            <>
              <Chart
                lagnaRashi={partner?.chart?.lagna}
                planets={partner?.chart?.planets}
                moonRashi={partner?.chart?.moonLongitude}
                type="lagna"
              />
              <ButtonPrimary buttonText="Reset" onClick={unsetClientData} />
            </>
          ) : (
            <>
              <ButtonPrimary
                buttonText={"Create Partner's Chart"}
                onClick={() => getThisModal("New charts")}
              />
              <ButtonPrimary
                buttonText="Select Chart"
                onClick={() => getThisModal("Select charts")}
              />
            </>
          )}
        </div>
      </div>
      {modalOpen && modalType == "New charts" && (
        <ModalNewDetails setModalOpen={setModalOpen} onClick={setUser} />
      )}
      {modalOpen && modalType == "Select charts" && (
        <SelectUserModal setModalOpen={setModalOpen} onClick={setUser} />
      )}
    </>
  );
};

export default Match;
