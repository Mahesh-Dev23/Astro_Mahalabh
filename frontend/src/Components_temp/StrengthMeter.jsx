const StrengthMeter = ({ strengths }) => {
  return (
    <div className="strength-card">
      <h3>Planetary Strength (Bala)</h3>
      <div className="meter-list">
        {strengths
          .sort((a, b) => b.totalScore - a.totalScore)
          .map((p) => (
            <div key={p.name} className="meter-item">
              <div className="meter-label">
                <span>{p.name}</span>
                <span>{p.percentage}%</span>
              </div>
              <div className="progress-bg">
                <div
                  className="progress-fill"
                  style={{
                    width: `${p.percentage}%`,
                    backgroundColor:
                      p.percentage > 70 ? "var(--success)" : "var(--primary)",
                  }}
                ></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
