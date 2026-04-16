import { useState, useEffect } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import "./panchang.css";

const Panchang = () => {
  // Data setup
  const [data, setData] = useState(null);
  const [gochar, setGochar] = useState(null);

  const [dataKeys, setDataKeys] = useState([]);
  const [sectionKeys, setSectionKeys] = useState([]);
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // console.log(parsedData?.chart?.panchang);
      setData(parsedData);
    }

    const gocharData = localStorage.getItem("Gochar Data");

    if (gocharData) {
      const parsedData = JSON.parse(gocharData);
      setGochar(parsedData);
    }
  }, []);

  useEffect(() => {
    data && setDataKeys(Object.keys(data?.chart?.panchang));
  }, [data]);

  useEffect(() => {
    let sectionArray = [];
    dataKeys.map((sec) =>
      sectionArray.push(Object.keys(data?.chart?.panchang[sec])),
    );
    // console.log(sectionArray);
    setSectionKeys(sectionArray);
  }, [dataKeys]);

  // console.log(data?.chart?.panchang);

  return (
    <>
      <PageTitle
        selectedUser={data?.selectedUser}
        currentDasha={data?.currentDasha}
        time={gochar?.chart?.currentTime}
      />
      {data == null ? (
        <></>
      ) : (
        <div className="panchang-wrapper">
          {data &&
            dataKeys &&
            sectionKeys?.map((sec, i) => (
              <div className="panchangSection">
                <div className="panchangSectionTitle">{`${dataKeys[i]}`}</div>
                <div className="panchangList">
                  {sec.map((s, index) => (
                    <div className="panchangRow">
                      <div className="panchangSubTitle">{`${s}`}</div>

                      <div className="panchangSubValue">
                        {typeof data.chart?.panchang[dataKeys[i]][s] !=
                        "object" ? (
                          ` ${data.chart?.panchang[dataKeys[i]][s]}`
                        ) : (
                          <>
                            {data &&
                              dataKeys &&
                              Object.keys(
                                data && data.chart?.panchang[dataKeys[i]][s],
                              )?.map((ky) => (
                                <div className="panchangSubValue">
                                  {<span>{`${ky}`}</span>}
                                  {`: ${data.chart?.panchang[dataKeys[i]][s][ky]}`}
                                </div>
                              ))}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Panchang;
