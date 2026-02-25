import { useState, useEffect } from "react";
import PageTitle from "../../Components/PageTItle/PageTitle.jsx";

const Dasha = () => {

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
  )
}

export default Dasha