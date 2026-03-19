import { useState, useEffect } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import "./panchang.css";

const Panchang = () => {
  // Data setup
  const [data, setData] = useState(null);
  const [objectData, setObjectData] = useState([]);

  const [dataKeys, setDataKeys] = useState([]);
  const [sectionKeys, setSectionKeys] = useState([]);
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      console.log(parsedData?.chart?.panchang);
      setData(parsedData?.chart?.panchang);
    }
  }, []);
  useEffect(() => {
    // data?.chart?.panchan && setObjectData(Object.keys(data?.chart?.panchang));
  }, [data]);
  useEffect(() => {
    data && setDataKeys(Object.keys(data));
  }, [data]);

  useEffect(() => {
    let sectionArray = [];
    dataKeys.map((sec) => sectionArray.push(Object.keys(data[sec])));
    // console.log(sectionArray);
    setSectionKeys(sectionArray);
  }, [dataKeys]);

  // console.log(data?.chart);

  return (
    <>
      <PageTitle />
      {data == null ? (
        <></>
      ) : (
        <div className="chart-wrapper">
          {data &&
            dataKeys &&
            sectionKeys?.map((sec, i) => (
              <div className="planetList">
                <div className="panchangSectionTitle">{`${dataKeys[i]}`}</div>
                {sec.map((s, index) => (
                  <div className="panchangRow">
                    <div className="panchangSubTitle">{`${s}`}</div>

                    <div className="panchangSubValue">
                      {typeof data[dataKeys[i]][s] != "object" ? (
                        ` ${data[dataKeys[i]][s]}`
                      ) : (
                        <>
                          {data &&
                            dataKeys &&
                            Object.keys(data && data[dataKeys[i]][s])?.map(
                              (ky) => (
                                <div className="panchangSubValue">
                                  {<span>{`${ky}`}</span>}
                                  {`: ${data[dataKeys[i]][s][ky]}`}
                                </div>
                              ),
                            )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Panchang;
