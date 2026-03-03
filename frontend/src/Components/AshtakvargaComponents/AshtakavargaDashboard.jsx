import { useEffect, useState } from "react";
import NorthIndianSAVChart from "../NorthIndianSAVChart"; // Your existing component

const AshtakavargaDashboard = ({ avData }) => {
  // 'total' represents SAV, others (sun, moon, etc.) represent BAV
  const [activeView, setActiveView] = useState("total");
  const [activeColor, setActiveColor] = useState("Total");

  const planetList = [
    { id: "total", name: "Total" },
    { id: "lagna", name: "Lagna" },
    { id: "sun", name: "Sun" },
    { id: "moon", name: "Moon" },
    { id: "mars", name: "Mars" },
    { id: "mercury", name: "Mercury" },
    { id: "jupiter", name: "Jupiter" },
    { id: "venus", name: "Venus" },
    { id: "saturn", name: "Saturn" },
  ];

  // Helper to determine color based on SAV score
  const getScoreColor = (score, type) => {
    if (type !== "Total") return "#333"; // Default for individual BAV
    if (score >= 30) return "#2e7d32"; // Strong Green
    if (score >= 25) return "#fbc02d"; // Neutral Yellow
    return "#d32f2f"; // Weak Red
  };

  useEffect(() => {
    getScoreColor(avData?.[activeView], activeView);
    let stateColor = "";
    planetList.map((p, i) => {
      if (p.id == activeView) return (stateColor = planetList[i].name);
    });
    stateColor == "Total"
      ? setActiveColor("pRahu")
      : stateColor == "Lagna"
        ? setActiveColor("primary-color")
        : setActiveColor(`p${stateColor}`);
  }, [activeView, avData]);
  // console.log("activeView ", activeView, `var(--${activeColor})`);

  return (
    <div className="av-container">
      <div
        className="chart-wrapper"
        // main.css
        // style={{ justifySelf: "center" }}
      >
        <NorthIndianSAVChart
          points={avData?.[activeView]}
          ascendantSign={avData?.ascendant}
          title="Sarvashtakavarga"
          color={activeColor}
        />
      </div>
      <div
        className="controls"
        style={{ borderTop: `1px solid var(--${activeColor})` }}
      >
        {planetList.map((p) => (
          <div
            key={p.id}
            onClick={() => setActiveView(p.id)}
            style={{
              padding: "8px 16px",
              backgroundColor:
                activeView === p.id
                  ? `var(--${activeColor})`
                  : `var(--background)`,
              color: activeView === p.id ? `var(--bg-card)` : `var(--pRahu)`,
            }}
            className="controlsButton"
          >
            {p.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AshtakavargaDashboard;
