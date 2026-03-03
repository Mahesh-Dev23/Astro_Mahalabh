import "./landingPage.css";
import { useState, useEffect } from "react";
import { baseURL } from "../../Server/server.js";
import Chart from "../../Components/Chart.jsx";
import PlanetsList from "../../Components/PlanetsList.jsx";
import ButtonPrimary from "../../Components/Buttons/ButtonPrimary.jsx";
import ButtonRound from "../../Components/Buttons/ButtonRound.jsx";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import SelectUserModal from "../../Components/Modal/SelectUserModal.jsx";
import { findCurrentDasha } from "../../Modules/findCurrentDasha.js";
import { dateRearrange } from "../../Modules/dateRearrange.js";
import { isSingleDigit } from "../../Modules/checkSingleDigit.js";

const LandingPage = () => {
  const [data, setData] = useState(null);
  const [gochar, setGochar] = useState({});
  const [forLocalStorage, setForLocalStorage] = useState({}); // use to data to update in local storage Astro Data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localData, setLocalData] = useState();
  const [secondChart, setSecondChart] = useState("N");
  const [selectedUser, setSelectedUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDasha, setCurrentDasha] = useState({});

  const date = new Date();
  const today = `${date.getUTCFullYear()}-${isSingleDigit(date.getUTCMonth()) ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth()}-${isSingleDigit(date.getUTCDate()) ? `0${date.getUTCDate()}` : date.getUTCDate()}`;
  const thisTime = `${date.getHours()}:${date.getMinutes()}`;
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
  const fetchAstroData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${baseURL}/api/get-full-chart?dob=${selectedUser.dob}T${selectedUser.time}&lat=${selectedUser.lat}&lon=${selectedUser.lon}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch astrology data");
      }

      const result = await response.json();

      // setData(result);
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
          result.chart.dasha[dashaIndex]?.antardashas,
          x,
        );
      }

      result.chart.dasha[dashaIndex].antardashas?.map((p, i) => {
        antdashaIndex = findCurrentDasha(p, i);
      });

      // console.log("result", {
      //   curretDasha: {
      //     planet: result.chart.dasha[dashaIndex],
      //     currentAntarDasha:
      //       result.chart.dasha[dashaIndex].antardashas[antdashaIndex],
      //   },
      // });

      const currentDasha = {
        dashaLord: result.chart.dasha[dashaIndex],
        currentAntarDasha:
          result.chart.dasha[dashaIndex].antardashas[antdashaIndex],
        dashaIndex,
      };

      // result object with current dasha
      const resultWithCurrentDasha = { ...result, currentDasha, selectedUser };
      // console.log("resultWithCurrentDasha", resultWithCurrentDasha);

      // set data with current dasha
      setData(resultWithCurrentDasha);

      // // To SET data in LOCAL STORAGE ----------------------------------------------------------------------------
      // localStorage.setItem(
      //   "Astro Data",
      //   JSON.stringify(resultWithCurrentDasha),
      // );
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Function to FETCH GOchar DATA -----------------------------------------------------------------------------------
  const fetchGocharData = async (data, today, time, lat, lon) => {
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
      setForLocalStorage({ ...data, gochar: result });
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

  // To check data in Local Storage - On Page Load ----------------------------------------------------------------
  useEffect(() => {
    const storedData = localStorage.getItem("Astro Data");

    if (storedData) {
      setData(JSON.parse(storedData)); //-------------
    }
  }, []);

  // Get locl storage data once saved
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setLocalData(parsedData?.chart?.dasha);
      setSelectedUser(parsedData.selectedUser);
    }
  }, []);
  useEffect(() => {
    fetchAstroData();
  }, [selectedUser]);

  useEffect(() => {
    setForLocalStorage(data);
    fetchGocharData(data, today, thisTime, lat, lon);
  }, [data]);

  useEffect(() => {
    // To SET data in LOCAL STORAGE ----------------------------------------------------------------------------
    localStorage.setItem("Astro Data", JSON.stringify(forLocalStorage));
  }, [forLocalStorage]);

  // To UNSET data from LOCAL STORAGE ----------------------------------------------------------------------------
  const unsetClientData = () => {
    localStorage.removeItem("Astro Data");
    setData(null);
  };

  // // get all users ----------------------------------------------
  // const getAllUsers = async () => {
  //   const user = await import("../../users.json")
  //     .then((res) => res.json)
  //     .then((data) => console.log(data))
  //     .catch((err) => console.error(err));
  //   console.log(user);
  // };
  // console.log("selectedUser", selectedUser);
  // console.log("forLocalStorage", forLocalStorage);
  console.log(today, thisTime);

  return (
    <div className="av-container">
      <PageTitle />

      {/* {error && <p className="error-text">{error}</p>} */}

      {/* Charts Section */}
      {data && (
        <div className="chart-wrapper">
          <div className="av-column">
            <Chart
              lagnaRashi={data?.chart?.lagna}
              planets={data?.chart?.planets}
              moonRashi={data?.chart?.moonLongitude}
              type="lagna"
            />
            <div className="username">
              {`${selectedUser?.name} : `}
              <span>{`${selectedUser?.dob}, ${selectedUser?.time}`}</span>
            </div>
            <div className="username">
              Dasha:
              <span>{` ${data?.currentDasha?.dashaLord?.planet} - ${data?.currentDasha?.currentAntarDasha?.planet}: ${dateRearrange(data?.currentDasha?.currentAntarDasha?.start)} - ${dateRearrange(data?.currentDasha?.currentAntarDasha?.end)}`}</span>
            </div>
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
          buttonText={loading ? "Generating..." : "Creat Chart"}
          onClick={fetchAstroData}
        />

        <ButtonPrimary
          buttonText="Select Chart"
          onClick={() => setModalOpen(true)}
        />
        <ButtonPrimary buttonText="Reset" onClick={unsetClientData} />
      </div>

      {modalOpen && (
        <SelectUserModal
          setModalOpen={setModalOpen}
          onClick={setSelectedUser}
        />
      )}
    </div>
  );
};

export default LandingPage;
