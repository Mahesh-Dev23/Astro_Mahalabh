import { useState, useEffect } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import "./panchang.css";

const Panchang = () => {
  // Data setup
  const [data, setData] = useState(null);
  const [objectData, setObjectData] = useState([]);
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      setData(parsedData?.chart?.panchang);
    }
  }, []);
  useEffect(() => {
    // data?.chart?.panchan && setObjectData(Object.keys(data?.chart?.panchang));
  }, [data]);

  console.log(data?.chart?.panchang);

  return (
    <>
      <PageTitle />
      {data && (
        <div className="chart-wrapper">
          <div className="planetList">
            {data &&
              data?.chart?.panchang.map((object) => (
                <div className="panchangRow">
                  <div className="panchangSubTitle">{object}</div>
                  <div className="panchangSubValue">{data[object]}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Panchang;
