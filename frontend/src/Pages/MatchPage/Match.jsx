import { useState, useEffect } from "react";
import PageTitle from "../../Components/PageTItle/PageTitle.jsx";

const Match = () => {

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
    </div>
  )
}

export default Match