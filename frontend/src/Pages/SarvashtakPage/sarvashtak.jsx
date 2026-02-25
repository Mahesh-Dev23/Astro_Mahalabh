import "./sarvashtak.css";
import { useState, useEffect } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle.jsx";
import Ashtakvarg from "../../Components/AshtakvargaComponents/Ashtakvarg.jsx";

const Sarvashtak = () => {

  // Data setup 
  const [data, setData] = useState(null);
  useEffect(() => {
    const savedData = localStorage.getItem("Astro Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
    }
  }, []);

  return (
    <div>
      <PageTitle />

      {
        data && (
          <Ashtakvarg
            planets={data.chart?.planets}
            lagna={data.chart?.lagna}
          />
        )}
    </div>
  );
};

export default Sarvashtak;