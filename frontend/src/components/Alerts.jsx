import React from "react";

const Alerts = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="alerts-container">
      {alerts.map((alert, i) => (
        <div key={i} className={`alert-card ${alert.severity.toLowerCase()}`}>
          <div className="alert-icon">🔔</div>
          <div className="alert-content">
            <h4>{alert.type}</h4>
            <p>{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Alerts;
