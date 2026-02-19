import React from "react";

const DashaList = ({ dashas }) => {
  return (
    <div className="dasha-container">
      <h3 style={{ color: "var(--primary)" }}>Vimshottari Dasha Timeline</h3>
      <div className="timeline-wrapper">
        {dashas.map((d, i) => (
          <div key={i} className="timeline-card">
            <div className="dot"></div>
            <div className="content">
              <strong>{d.lord}</strong>
              <span>
                {new Date(d.start).getFullYear()} -{" "}
                {new Date(d.end).getFullYear()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashaList;
