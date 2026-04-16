import "./sarvashtak.css";
import { useState, useEffect } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import Ashtakvarg from "../../Components/AshtakvargaComponents/Ashtakvarg.jsx";

const Sarvashtak = () => {
  // Data setup
  const [data, setData] = useState(null);
  const [gochar, setGochar] = useState(null);
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

  return (
    <>
      <PageTitle
        selectedUser={data?.selectedUser}
        currentDasha={data?.currentDasha}
        time={gochar?.chart?.currentTime}
      />

      {data && (
        <Ashtakvarg planets={data.chart?.planets} lagna={data.chart?.lagna} />
      )}
    </>
  );
};

export default Sarvashtak;
