import "../main.css";

function PlanetsList({ planets }) {
  // console.log(planets);
  return (
    <div className="planetList">
      {planets &&
        planets?.map(
          (p) =>
            p.name != "Uranus" &&
            p.name != "Neptune" &&
            p.name != "Pluto" && (
              <div className="planetRow" key={`planet${p.name}`}>
                <div
                  className="pname"
                  style={{
                    background: `var(--p${p.name})`,
                  }}
                >
                  {p.name}
                </div>

                <div
                  className="pnakshatra"
                  style={{ color: `var(--p${p.nakshtra.lord})` }}
                >
                  <div className="pdeg" style={{ color: `var(--text-main)` }}>
                    {p.degreeInRashi.toFixed(2)}
                  </div>
                  {p.nakshtra.name}

                  <div
                    className="nPada"
                    style={{ background: `var(--p${p.nakshtra.lord})` }}
                  >
                    {p.nakshtra.pada}
                  </div>
                  <div style={{ color: `var(--p${p.nakshtra.lord})` }}>
                    {p.nakshtra.lord}
                  </div>
                </div>
              </div>
            ),
        )}
    </div>
  );
}

export default PlanetsList;
