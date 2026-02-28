import { useState, useEffect } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";

const Panchang = () => {
  // Data setup
  const [data, setData] = useState({});
  const [objectData, setObjectData] = useState([]);
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData.chart.panchang);
      setObjectData(Object.keys(parsedData.chart.panchang));
    }
  }, []);

  console.log(objectData);

  return (
    <div className="av-container">
      <PageTitle />
      {data && (
        <div className="chart-wrapper">
          <div className="planetList">
            {objectData &&
              objectData.map((object) => (
                <div className="planetRow">
                  <div className="pname">{object}</div>
                  <div className="pname">{data[object]}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Panchang;
