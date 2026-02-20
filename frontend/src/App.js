import "./App.css";
import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import NorthChart from "./components/NorthChart";

function App() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState({
    name: "",
    dob: "1971-09-23",
    time: "12:35",
    lat: "19.07",
    lon: "72.87",
  });

  const handleCalculate = async () => {
    // Example: User input from a form
    const response = await fetch(
      `http://localhost:5000/api/get-kundli?dob=1971-12-35T15:30&lat=19.07&lon=72.87`,
    );
    const result = await response.json();
    console.log(result);
    setData(result);
  };

  const fetchAstroData = async () => {
    // Replace with your actual API call
    const response = await fetch(
      `http://localhost:5000/api/get-full-chart?dob=${user.dob}T${user.time}&lat=${user.lat}&lon=${user.lon}`,
      // `http://localhost:5000/api/get-full-chart?dob=1971-12-23T15:30&lat=19.07&lon=72.87`,
    );
    const result = await response.json();
    setData(result);
  };

  useEffect(() => console.log("data ", data), [data]);
  return (
    // <div className="App">
    //   <button onClick={handleCalculate}>Generate Kundli</button>
    //   {data && <Chart lagna={data.lagna} planets={data.planets} />}
    // </div>
    <div className="main">
      <button onClick={fetchAstroData}>Calculate Chart</button>
      {data && (
        <div className="app-container">
          {/* <NorthChart
            lagnaRashi={data.chart?.lagna}
            planets={data.chart?.planets}
          /> */}
          <Chart
            lagnaRashi={data.chart?.lagna}
            planets={data.chart?.planets}
            moonRashi={data.chart?.moonLongitude}
            type="moon"
          />
          {/* <div className="dasha-card">
            <h3>Vimshottari Dasha</h3>
            {data.timeline.map((d, i) => (
              <div key={i} className="dasha-item">
                <strong>{d.lord}</strong>
                <span>{new Date(d.end).getFullYear()}</span>
              </div>
            ))}
          </div> */}
        </div>
      )}
    </div>
  );
}

export default App;
