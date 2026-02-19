import groupPlanetsByHouse from "../module/groupPlanetsByHouse";
import PlanetStack from "./PlanetStack";
// This uses the mapping logic we discussed
export const Chart = ({ lagna, planets }) => {
  const grouped = groupPlanetsByHouse(planets, lagna.rashi);
  return (
    <svg viewBox="0 0 400 400">
      {/* Render the SVG Diamond Lines here */}
      {Object.entries(grouped).map(([house, pList]) => (
        <PlanetStack key={house} house={house} pList={pList} />
        // <div>Planet</div>
      ))}
    </svg>
  );
};
