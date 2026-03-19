import "./landingPage.css";
import { useState, useEffect } from "react";
import { fetchAstroData } from "../../Modules/fetchAstroData";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import ButtonPrimary from "../../Components/Buttons/ButtonPrimary.jsx";
import ButtonRound from "../../Components/Buttons/ButtonRound.jsx";
import SelectUserModal from "../../Components/Modal/SelectUserModal.jsx";
import ModalNewDetails from "../../Components/Modal/ModalNewDetails.jsx";
import Chart from "../../Components/Chart.jsx";
import PlanetsList from "../../Components/PlanetsList.jsx";
import { isSingleDigit } from "../../Modules/checkSingleDigit.js";
import { getCurrentDahsa } from "../../Modules/getCurrenDash.js";

const LandingPage = () => {
  const user = {
    name: "Salil Sunil Narvekar",
    dob: "2002-06-11",
    time: "8:45",
    lat: "19.07",
    lon: "72.87",
    tz: 5.5,
  };
  const [local, setLocal] = useState(false);
  const [data, setData] = useState(null);
  const [gochar, setGochar] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [secondChart, setSecondChart] = useState("N");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [today, setToday] = useState("");
  const [thisTime, setThistime] = useState("");

  useEffect(() => {
    let storedData = localStorage.getItem("Astro Data");
    // console.log("3 Local is ", storedData);
    if (storedData) {
      setData(JSON.parse(storedData)); //-------------
      // setSelectedUser(storedData?.selectedUser?.name);
    }
    const date = new Date();
    const day = `${date.getUTCFullYear()}-${isSingleDigit(date.getUTCMonth()) ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth()}-${isSingleDigit(date.getUTCDate()) ? `0${date.getUTCDate()}` : date.getUTCDate()}`;
    const time = `${date.getHours()}:${date.getMinutes()}`;

    setToday(day);
    setThistime(time);
    const gochar = {
      name: "Gochar",
      dob: day,
      time: time,
      lat: "19.07",
      lon: "72.87",
      tz: 5.5,
    };
    fetchAstroData(gochar).then((res) => {
      localStorage.setItem("Gochar Data", JSON.stringify(res));
      setGochar(res);
    });
  }, []);

  // set Selected user ---------------------------------
  const setUser = (user) => {
    // console.log(user);
    // console.log("1 Local is ", local);
    setSelectedUser(user);

    fetchAstroData(user).then((res) => {
      const currentDasha = getCurrentDahsa(res.chart.dasha);
      console.log("currentDasha", currentDasha);
      localStorage.setItem(
        "Astro Data",
        JSON.stringify({ ...res, currentDasha }),
      );
      setData({ ...res, currentDasha });
    });
    setLocal(true);
  };

  //secondchart, moon, navmash and gochar ----------------------------------------------------------------------
  const getSecondChart = (name) => {
    // alert(name);
    setSecondChart(name);
  };

  // select which modal to open
  const getThisModal = (modalType) => {
    setModalType(modalType);
    setModalOpen(true);
  };

  // To UNSET data from LOCAL STORAGE ----------------------------------------------------------------------------
  const unsetClientData = () => {
    localStorage.removeItem("Astro Data");
    setData(null);
  };

  useEffect(() => {
    if (local === true) {
      // console.log("2 Local is ", local);
      let storedData = localStorage.getItem("Astro Data");
      // console.log("3 Local is ", storedData);
      if (storedData) {
        setData(JSON.parse(storedData)); //-------------
        // setSelectedUser(storedData?.selectedUser?.name);
      }
    }
  }, [local]);

  useEffect(() => {
    // Refresh once data is set
  }, [data]);

  data && console.log(data);
  return (
    <>
      <PageTitle
        selectedUser={data?.selectedUser}
        currentDasha={data?.currentDasha}
        time={gochar?.chart?.currentTime}
      />
      {!data ? (
        <div className="av-column">
          <p>Today</p>
          {/* <h3>{data?.gochar?.chart?.panchang?.vaar}</h3> */}
          <h3>{today}</h3>
          <p>Select kundali or create new Kundali</p>
          {local}
        </div>
      ) : (
        <div className="chart-wrapper">
          <div className="av-column">
            <Chart
              lagnaRashi={data?.chart?.lagna}
              planets={data?.chart?.planets}
              moonRashi={data?.chart?.moonLongitude}
              type="lagna"
            />
          </div>
          <div className="av-column">
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
                lagnaRashi={gochar?.chart?.lagna}
                planets={gochar?.chart?.planets}
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
          </div>
          <div>
            <PlanetsList planets={data?.chart?.planets} />
          </div>
        </div>
      )}

      <div className="controls">
        <ButtonPrimary
          buttonText={"New Chart"}
          onClick={() => getThisModal("New charts")}
        />

        <ButtonPrimary
          buttonText="Select Chart"
          onClick={() => getThisModal("Select charts")}
        />
        <ButtonPrimary buttonText="Reset" onClick={unsetClientData} />
      </div>

      {modalOpen && modalType == "Select charts" && (
        <SelectUserModal setModalOpen={setModalOpen} onClick={setUser} />
      )}
      {modalOpen && modalType == "New charts" && (
        <ModalNewDetails setModalOpen={setModalOpen} />
      )}
    </>
  );
};

export default LandingPage;
