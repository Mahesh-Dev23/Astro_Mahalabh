import React, { useState } from "react";
import "./styles.css";

const DashaTimeline = ({ dashaData }) => {
  const [expandedLord, setExpandedLord] = useState(null);
  const now = new Date();

  return (
    <div className="timeline-container">
      <div className="timeline-track"></div>

      {dashaData.map((dasha, index) => {
        const isCurrent = now >= dasha.start && now <= dasha.end;
        const isExpanded = expandedLord === dasha.lord;

        return (
          <div
            key={index}
            className={`dasha-item ${isCurrent ? "active" : ""}`}
          >
            {/* The Dot on the timeline */}
            <div className="timeline-dot"></div>

            <div
              className="dasha-card"
              onClick={() => setExpandedLord(isExpanded ? null : dasha.lord)}
            >
              <div className="card-header">
                <div>
                  <span className="lord-name">{dasha.lord}</span>
                  <span className="date-range">
                    {dasha.start.getFullYear()} - {dasha.end.getFullYear()}
                  </span>
                </div>
                {isCurrent && <span className="status-badge">Current</span>}
              </div>

              {/* Antardasha (Nested List) - Only shows when clicked */}
              {isExpanded && (
                <div className="antardasha-list">
                  {/* Assuming your backend logic provided these sub-periods */}
                  {dasha.subPeriods?.map((sub, sIdx) => (
                    <div key={sIdx} className="sub-item">
                      <span>{sub.lord}</span>
                      <span className="sub-date">
                        {sub.end.toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                  <p className="hint text-muted">Click to collapse</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
