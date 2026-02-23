import "../main.css";

function PlanetsList({ planets }) {
  //   console.log(planets);
  return (
    <div className="planetList">
      {planets.map((p) => (
        <div className="planetRow">
          <div
            className="pname"
            style={{
              color: `var(--p${p.name})`,
            }}
          >
            {p.name}
            {/* {` ${`var(--p${p.name})`.includes(p.name) ? p.name : `no`}`} */}
          </div>
          <div className="pdeg" style={{ color: `var(--p${p.name})` }}>
            {p.degreeInRashi.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlanetsList;
