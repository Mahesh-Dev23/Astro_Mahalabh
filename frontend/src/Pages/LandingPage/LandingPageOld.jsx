import "./landingPage.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { baseURL } from "../../Server/server.js";
import Chart from "../../Components/Chart.jsx";
import PlanetsList from "../../Components/PlanetsList.jsx";
import ButtonPrimary from "../../Components/Buttons/ButtonPrimary.jsx";
import ButtonRound from "../../Components/Buttons/ButtonRound.jsx";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import SelectUserModal from "../../Components/Modal/SelectUserModal.jsx";
import ModalNewDetails from "../../Components/Modal/ModalNewDetails.jsx";
import { findCurrentDasha } from "../../Modules/findCurrentDasha.js";
import { dateRearrange } from "../../Modules/dateRearrange.js";
import { isSingleDigit } from "../../Modules/checkSingleDigit.js";

const LandingPage = () => {
  const [data, setData] = useState(null);
  const [gochar, setGochar] = useState({});
  const [forLocalStorage, setForLocalStorage] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localData, setLocalData] = useState();
  const [secondChart, setSecondChart] = useState("N");
  const [selectedUser, setSelectedUser] = useState({ name: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentDasha, setCurrentDasha] = useState({});
  const [today, setToday] = useState("");
  const [thisTime, setThistime] = useState("");

  let lat = "19.07";
  let lon = "72.87";

  // Temporary Client Details
  const user = {
    name: "Salil",
    dob: "2002-06-11",
    time: "12:20",
    lat: "19.07",
    lon: "72.87",
  };
  // CORE Function to FETCH DATA -----------------------------------------------------------------------------------
  const fetchAstroData = async (newUser, gochar) => {
    // console.log(newUser);

    try {
      // console.log(2);

      setLoading(true);
      setError(null);

      const response = await fetch(
        // `${baseURL}/api/get-full-chart?dob=${newUser?.dob}&time${newUser?.time}&tz=${newUser?.tz}&lat=${newUser?.lat}&lon=${newUser?.lon}`,
        `${baseURL}/api/get-full-chart?user=${newUser}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch astrology data");
      }

      const result = await response.json();

      // console.log("result", result.chart.dasha); // find all dasha

      // select current dasha -------------------------------------------
      let dashaIndex = 0;
      for (let x = 0; x < result.chart.dasha.length; x++) {
        if (dashaIndex > 0) {
          break;
        }
        dashaIndex = findCurrentDasha(result.chart.dasha[x], x);
      }

      // find antardasha from selected dasha -----------------------------
      let antdashaIndex = 0;
      for (
        let x = 0;
        x < result.chart.dasha[dashaIndex].antardashas?.length;
        x++
      ) {
        if (antdashaIndex > 0) {
          break;
        }
        antdashaIndex = findCurrentDasha(
          result.chart.dasha[dashaIndex]?.antardashas[x],
          x,
        );
      }

      const currentDasha = {
        dashaLord: result.chart.dasha[dashaIndex],
        currentAntarDasha:
          result.chart.dasha[dashaIndex].antardashas[antdashaIndex],
        dashaIndex,
      };

      // result object with current dasha
      const resultWithCurrentDasha = {
        ...result,
        currentDasha,
        selectedUser,
        gochar,
      };
      // console.log("resultWithCurrentDasha", resultWithCurrentDasha);

      // set data with current dasha
      setData(resultWithCurrentDasha);

      // To SET data in LOCAL STORAGE ----------------------------------------------------------------------------
      localStorage.setItem(
        "Astro Data",
        JSON.stringify(resultWithCurrentDasha),
      );
    } catch (err) {
      console.error(Object.keys(err));
      setError(`Fetching error. ${err}`);
      // setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to FETCH GOchar DATA -----------------------------------------------------------------------------------
  const fetchGocharData = async (today, time, lat, lon) => {
    // console.log("fetchGocharData", today, data);
    try {
      // setLoading(true);
      // setError(null);

      const response = await fetch(
        `${baseURL}/api/get-full-chart?dob=${today}T${time}&lat=${lat}&lon=${lon}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch gochar data");
      }

      const result = await response.json();
      // console.log("gochar ", result);

      // set gochar data for loca storage
      setGochar(result);
      // setForLocalStorage({ ...data, gochar: result });
      // console.log({ ...forLocalStorage, gochar: result });
    } catch (err) {
      console.error("error in gochar", err);
      setError("Something went wrong while fetching Gochar data.");
    }
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

  // step 1 To check data in Local Storage - On Page Load ----------------------------------------------------------------
  useEffect(() => {
    const date = new Date();
    const day = `${date.getUTCFullYear()}-${isSingleDigit(date.getUTCMonth()) ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth()}-${isSingleDigit(date.getUTCDate()) ? `0${date.getUTCDate()}` : date.getUTCDate()}`;
    const time = `${date.getHours()}:${date.getMinutes()}`;

    setToday(day);
    setThistime(time);
    // console.log("Step 1 completed");
    const storedData = localStorage.getItem("Astro Data");
    // console.log("localStorage", storedData);
    if (storedData) {
      setData(JSON.parse(storedData)); //-------------
      setSelectedUser(storedData?.selectedUser?.name);
    }
  }, []);

  // step 2 set gochar details and setGochar() --------------------------------------------------------------------------------
  useEffect(() => {
    // today != "" && thisTime != "" && fetchGocharData(today, thisTime, lat, lon); Gochar ------------------------------------
    // console.log("Step 2 completed");
  }, [today, thisTime]);

  // step 3 fetch data once selectes user in set with Modal event and set complete data object  ------------------------------------------------------------
  useEffect(() => {
    !data && selectedUser?.name && fetchAstroData(selectedUser, gochar);
    data &&
      selectedUser?.name != data?.currentUser?.name &&
      fetchAstroData(selectedUser, gochar);
    // console.log("Step 3 completed");
  }, [selectedUser]);

  // step 4 set local storage one the data is set -------------------------------------------------------------------------------

  useEffect(() => {
    // setForLocalStorage({ ...data, gochar });
    // data && setSelectedUser(data?.selectedUser);
    // localStorage.setItem("Astro Data", JSON.stringify(data));
    // console.log(data);
    // console.log("Step 4 completed");
  }, [data]);

  // Get locl storage data once saved
  // useEffect(() => {
  //   const savedData = localStorage.getItem("Astro Data");

  //   if (savedData) {
  //     const parsedData = JSON.parse(savedData);
  //     // setLocalData(parsedData?.chart?.dasha);
  //   }
  // }, []);

  // useEffect(() => {
  //   // To SET data in LOCAL STORAGE ----------------------------------------------------------------------------
  //   // console.log(forLocalStorage);
  // }, [forLocalStorage]);

  // To UNSET data from LOCAL STORAGE ----------------------------------------------------------------------------
  const unsetClientData = () => {
    localStorage.removeItem("Astro Data");
    setData(null);
  };

  // console.log(selectedUser, data);

  return (
    <>
      <PageTitle
        selectedUser={data?.selectedUser}
        currentDasha={data?.currentDasha}
        time={data?.gochar?.chart?.currentTime}
      />

      {/* Charts Section */}
      {selectedUser?.name == "" && error && (
        <div className="chart-wrapper">
          <p className="error-text">{error}</p>
        </div>
      )}
      {selectedUser?.name == "" && !error && (
        <div className="av-column">
          <p>Today</p>
          <h3>{data?.gochar?.chart?.panchang?.vaar}</h3>
          <h3>{today}</h3>
          <p>Select kundali or create new Kundali</p>
        </div>
      )}
      {selectedUser?.name != "" && data?.chart && (
        <div className="chart-wrapper">
          <div className="av-column">
            <Chart
              lagnaRashi={data?.chart?.lagna}
              planets={data?.chart?.planets}
              moonRashi={data?.chart?.moonLongitude}
              type="lagna"
            />
            {/* <div className="username">
              {`${selectedUser?.name} : `}
              <span>{`${selectedUser?.dob}, ${selectedUser?.time}`}</span>
            </div>
            <div className="username">
              Dasha:
              <span>{` ${data?.currentDasha?.dashaLord?.planet} - ${data?.currentDasha?.currentAntarDasha?.planet}: ${dateRearrange(data?.currentDasha?.currentAntarDasha?.start)} - ${dateRearrange(data?.currentDasha?.currentAntarDasha?.end)}`}</span>
            </div> */}
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
          </div>
          <div>
            <PlanetsList planets={data?.chart?.planets} />
          </div>
        </div>
      )}

      <div className="controls">
        <ButtonPrimary
          buttonText={loading ? "Generating..." : "New Chart"}
          onClick={() => getThisModal("New charts")}

          // onClick={() => fetchAstroData(selectedUser, data?.currentUser)}
        />

        <ButtonPrimary
          buttonText="Select Chart"
          onClick={() => getThisModal("Select charts")}
        />
        <ButtonPrimary buttonText="Reset" onClick={unsetClientData} />
      </div>

      {modalOpen && modalType == "Select charts" && (
        <SelectUserModal
          setModalOpen={setModalOpen}
          onClick={setSelectedUser}
        />
      )}
      {modalOpen && modalType == "New charts" && (
        <ModalNewDetails setModalOpen={setModalOpen} />
      )}
    </>
  );
};

export default LandingPage;
