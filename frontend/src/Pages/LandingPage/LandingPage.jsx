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
import { getReport } from "../../Modules/report/getReport.js";
import { dateRearrange } from "../../Modules/dateRearrange.js";
import { postAstroData } from "../../Modules/postAstroData.js";

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

  const [secondChart, setSecondChart] = useState("N");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [today, setToday] = useState("");

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
    // setThistime(time);
    const gochar = {
      name: "Gochar",
      dob: day,
      time: time,
      lat: "19.07",
      lon: "72.87",
      tz: 5.5,
    };
    fetchAstroData(gochar).then((res) => {
      const currentDasha = getCurrentDahsa(res.chart.dasha);
      const report = getReport(res, user.dob);
      localStorage.setItem(
        "Gochar Data",
        JSON.stringify({ ...res, currentDasha, selectedUser: user, report }),
      );
      setGochar(res);
    });
  }, []);

  // set Selected user ---------------------------------
  const setUser = (user) => {
    console.log(user);
    // console.log("1 Local is ", local);
    // setSelectedUser(user);

    fetchAstroData(user).then((res) => {
      const currentDasha = getCurrentDahsa(res.chart.dasha);
      // console.log("currentDasha", currentDasha);
      const report = getReport(res, user.dob);
      localStorage.setItem(
        "Astro Data",
        JSON.stringify({ ...res, currentDasha, selectedUser: user, report }),
      );
      setData({ ...res, currentDasha, selectedUser: user, report });
      postAstroData({ [user.name]: res });
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

  // data && console.log(data?.report?.planets);
  // data?.report?.doshas?.map((d) => console.log(Object.keys(d)));
  return (
    <>
      <PageTitle time={gochar?.chart?.currentTime} />
      {!data ? (
        <div className="av-column">
          <p>Today</p>
          {/* <h3>{data?.gochar?.chart?.panchang?.vaar}</h3> */}
          <h3>{today}</h3>
          <p>Select kundali or create new Kundali</p>
          {local}
        </div>
      ) : (
        <>
          <div className="chart-wrapper">
            <div className="av-column">
              <Chart
                lagnaRashi={data?.chart?.lagna}
                planets={data?.chart?.planets}
                moonRashi={data?.chart?.moonLongitude}
                lagna={data?.chart?.lagna}
                type="lagna"
              />
            </div>
            <div className="av-column">
              {secondChart === "M" && (
                <Chart
                  lagnaRashi={data?.chart?.planets[1].rashi}
                  planets={data?.chart?.planets}
                  lagna={data?.chart?.lagna}
                  type="nav"
                />
              )}
              {secondChart === "N" && (
                <Chart
                  lagnaRashi={data?.chart?.navmanshaLagna}
                  planets={data?.chart?.navmanshaPlanets}
                  lagna={data?.chart?.lagna}
                  type="nav"
                />
              )}
              {secondChart === "G" && (
                <Chart
                  lagnaRashi={gochar?.chart?.lagna}
                  planets={gochar?.chart?.planets}
                  lagna={data?.chart?.lagna}
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
            <div className="repotDisplay">
              {/* Personal details ------------------------------------------------------------ */}
              <div className="report-column">
                <div className="report-section">
                  <div>
                    <div className="reportTitle">Person</div>
                    <span className="report-highlight">{`${data?.selectedUser?.name} `}</span>
                    : age{" "}
                    <span className="report-highlight">{`${data?.report?.age}`}</span>
                  </div>
                  <div>
                    Dob:
                    <span className="report-highlight">{` ${dateRearrange(data?.selectedUser?.dob)},`}</span>{" "}
                    Time:{" "}
                    <span className="report-highlight">{`${data?.selectedUser?.time}`}</span>
                  </div>
                </div>
                <div className="report-section">
                  <div className="reportTitle">Dasha</div>
                  <div>{` ${data?.currentDasha?.dashaLord?.planet} - ${data?.currentDasha?.currentAntarDasha?.planet}`}</div>
                  <div>{` ${dateRearrange(data?.currentDasha?.currentAntarDasha?.start)} - ${dateRearrange(data?.currentDasha?.currentAntarDasha?.end)}`}</div>
                </div>
                {/* Planet Details ------------------------------------------------------------ */}
                <div className="report-column">
                  {/* <div className="reportTitle">Planets</div> */}
                  <PlanetsList planets={data?.report?.planets} />
                </div>
              </div>
              {/* Sun and lagna Details ------------------------------------------------------------ */}
              <div className="report-column">
                {/* <div className="report-section">
                  <div className="reportTitle">Sun</div>
                  {data?.report?.lagna?.sun !== "" && (
                    <div>{data?.report?.lagna?.sun}</div>
                  )}
                </div> */}
                <div className="report-section">
                  <div className="reportTitle">Lagna</div>
                  <div>
                    {" "}
                    Lagna Degree{" "}
                    <span className="report-highlight">{`${data?.chart?.lagnaDegree} `}</span>
                  </div>
                  {data?.report?.lagna && (
                    <>
                      <div>{data?.report?.lagna?.lagnLordYuti}</div>
                      <div>{data?.report?.lagna?.weakLagna}</div>
                      <div>{data?.report?.lagna?.lagnaStarStat}</div>
                    </>
                  )}
                </div>
                {/* Yogas and Doshas Details ------------------------------------------------------------ */}
                <div className="report-section">
                  <div className="reportTitle">Yogs</div>
                  {data?.report?.yogas?.length > 0 &&
                    data?.report?.yogas?.map((y) => (
                      <div>
                        {Object.keys(y).toString().replaceAll("_", " ")}
                      </div>
                    ))}
                </div>
                <div className="report-section">
                  <div className="reportTitle">Dosh</div>
                  {data?.report?.doshas?.length > 0 &&
                    data?.report?.doshas?.map((d) => (
                      <div>
                        {Object.keys(d).toString().replaceAll("_", " ")}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
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

      {modalOpen && modalType === "Select charts" && (
        <SelectUserModal setModalOpen={setModalOpen} onClick={setUser} />
      )}
      {modalOpen && modalType === "New charts" && (
        <ModalNewDetails setModalOpen={setModalOpen} />
      )}
    </>
  );
};

export default LandingPage;
