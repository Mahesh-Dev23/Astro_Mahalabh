import { useEffect, useState } from "react";
import NorthIndianSAVChart from "./NorthIndianSAVChart"; // Your existing component

const AshtakavargaDashboard = ({ avData }) => {
  // 'total' represents SAV, others (sun, moon, etc.) represent BAV
  const [activeView, setActiveView] = useState("total");

  const planetList = [
    { id: "total", name: "SAV (Total)" },
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
    if (type !== "total") return "#333"; // Default for individual BAV
    if (score >= 30) return "#2e7d32"; // Strong Green
    if (score >= 25) return "#fbc02d"; // Neutral Yellow
    return "#d32f2f"; // Weak Red
  };

  useEffect(() => {
    getScoreColor(avData?.[activeView], activeView);
  }, [activeView, avData]);

  return (
    <div
      className="av-container"
      style={{ padding: "20px", fontFamily: "sans-serif" }}
    >
      <h2>Sarvashtak{activeView.toUpperCase()} Chart</h2>

      <div
        className="controls"
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {planetList.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveView(p.id)}
            style={{
              padding: "8px 16px",
              backgroundColor: activeView === p.id ? "#007bff" : "#f0f0f0",
              color: activeView === p.id ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div
        className="chart-wrapper"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        {/* Pass the 12-sign array to your existing Diamond Chart component */}
        <NorthIndianSAVChart
          points={avData?.[activeView]}
          ascendantSign={avData?.ascendant}
          title="Sarvashtakavarga"
        />
      </div>

      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <strong>Grand Total: {avData?.grandTotalPoints}</strong>
      </div>
    </div>
  );
};

export default AshtakavargaDashboard;
