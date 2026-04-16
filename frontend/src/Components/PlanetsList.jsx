import "../main.css";
import { useState, useEffect } from "react";

function PlanetsList({ planets }) {
  const [active, setActive] = useState();
  const [planetList, setPlanetList] = useState();
  useEffect(() => {
    planets && setActive(planets?.sun);
    planets && setPlanetList(Object.keys(planets));
  }, []);
  // console.log(planets);
  return (
    planets && (
      <div className="planet_Wrapper">
        <div
          className="planetRow"
          // style={{ border: `1px solid var(--p${active?.name})` }}
        >
          <div
            className="planetName"
            style={{ background: `var(--p${active?.name})` }}
          >
            {`${active?.name} ${active?.degree?.toFixed(2)} `}{" "}
            <span>{`${active?.nakshatra} ${active?.pada}`}</span>
          </div>
          {active?.kartari !== "" && <div>{active?.kartari}</div>}
          {active && <div>{active.houseComfort}</div>}
          {active?.retrograde ||
            active?.combust ||
            (active?.dignity !== "Normal" && (
              <div>
                {active?.retrograde && <span>Retro</span>}{" "}
                {active?.combust && <span>Combust</span>}{" "}
                {active?.dignity !== "Normal" && <span>{active?.dignity}</span>}
              </div>
            ))}
          <div>
            <span>{active?.avastha}</span>
            avastha in
            <span>{active?.houseName}</span> bhav
          </div>
          <div>
            {active?.yutis?.length > 0 && `Yuti: `}
            {active?.yutis?.length > 0 &&
              active?.yutis?.map((y) => <span>{y}</span>)}
          </div>
          <div>
            {active?.stat === "affected" && "Affected by "}

            {active?.stat === "affected" &&
              active?.drushti?.length > 0 &&
              active?.drushti?.map((d) => <span>{d}</span>)}
          </div>
        </div>
        <div className="planetList">
          {planetList &&
            planetList?.map(
              (p) =>
                planets[p].name != "Uranus" &&
                planets[p].name != "Neptune" &&
                planets[p].name != "Pluto" && (
                  <div key={`planet${planets[p]?.name}`}>
                    <div
                      className="pname"
                      style={{
                        background: `var(--p${planets[p]?.name})`,
                      }}
                      onClick={() => setActive(planets[p])}
                    >
                      {planets[p]?.name.slice(0, 2)}
                      {/* {`${p.name} ${p?.degree?.toFixed(2)}`} */}
                    </div>
                  </div>
                ),
            )}
        </div>
      </div>
    )
  );
}

export default PlanetsList;
