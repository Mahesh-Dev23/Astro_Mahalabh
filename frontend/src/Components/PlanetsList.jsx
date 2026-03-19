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
                  {`${p.name} ${p?.degree.toFixed(2)}`}
                </div>

                <div
                  className="pnakshatra"
                  style={{ color: `var(--p${p.nakShatraLord})` }}
                >
                  {/* <div className="pdeg" style={{ color: `var(--text-main)` }}>
                    {p?.degreeInRashi}
                  </div> */}
                  {p.nakshtra}

                  <div
                    className="nPada"
                    style={{ background: `var(--p${p.nakShatraLord})` }}
                  >
                    {p.pada}
                  </div>
                  <div style={{ color: `var(--p${p.nakShatraLord})` }}>
                    {p.nakShatraLord}
                  </div>
                </div>
              </div>
            ),
        )}
    </div>
  );
}

export default PlanetsList;
