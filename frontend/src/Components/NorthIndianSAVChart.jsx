import "../main.css";
const NorthIndianSAVChart = ({
  points = [], // The 12-length array (SAV or BAV)
  ascendantSign = 1, // The Rashi number for the 1st house
  title = "Sarvashtakavarga",
  color,
}) => {
  // Helper to get the Rashi number for a specific house (1-12)
  const getRashiForHouse = (houseNum) => {
    let rashi = (ascendantSign + houseNum - 1) % 12;
    return rashi === 0 ? 12 : rashi;
  };

  // console.log("ashtak", points);
  // Helper for color coding SAV scores
  const getBgColor = (val) => {
    if (val === 0) return "transparent";
    if (val >= 5) return "rgba(76, 175, 80, 1)"; // Green tint
    if (val < 3) return "rgba(244, 67, 54, 1)"; // Red tint
    return "#1a237e";
  };

  // House positions mapping for the Diamond layout
  // These coordinates correspond to the centers of the triangles/diamonds
  const houseLayout = [
    { id: 1, x: "200", y: "105", label: "1st" },
    { id: 2, x: "100", y: "50", label: "2nd" },
    { id: 3, x: "40", y: "105", label: "3rd" },
    { id: 4, x: "100", y: "205", label: "4th" },
    { id: 5, x: "40", y: "305", label: "5th" },
    { id: 6, x: "100", y: "360", label: "6th" },
    { id: 7, x: "200", y: "300", label: "7th" },
    { id: 8, x: "300", y: "360", label: "8th" },
    { id: 9, x: "360", y: "305", label: "9th" },
    { id: 10, x: "300", y: "205", label: "10th" },
    { id: 11, x: "360", y: "105", label: "11th" },
    { id: 12, x: "300", y: "50", label: "12th" },
  ];
  // const houseLayout = [
  //   { id: 1, x: "45%", y: "45%", label: "1st" },
  //   { id: 2, x: "25%", y: "35%", label: "2nd" },
  //   { id: 3, x: "10%", y: "30%", label: "3rd" },
  //   { id: 4, x: "35%", y: "50%", label: "4th" },
  //   { id: 5, x: "10%", y: "70%", label: "5th" },
  //   { id: 6, x: "25%", y: "85%", label: "6th" },
  //   { id: 7, x: "50%", y: "65%", label: "7th" },
  //   { id: 8, x: "75%", y: "85%", label: "8th" },
  //   { id: 9, x: "90%", y: "70%", label: "9th" },
  //   { id: 10, x: "65%", y: "50%", label: "10th" },
  //   { id: 11, x: "90%", y: "30%", label: "11th" },
  //   { id: 12, x: "75%", y: "15%", label: "12th" },
  // ];

  return (
    <>
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="border-2 border-gray-800 bg-white"
      >
        <rect
          x="0"
          y="0"
          width="400"
          height="400"
          fill={`var(--background)`}
          stroke={`var(--${color})`}
          strokeWidth="1"
        />

        {/* The "X" Cross Lines */}
        <line
          x1="0"
          y1="0"
          x2="400"
          y2="400"
          stroke={`var(--${color})`}
          strokeWidth="1"
        />
        <line
          x1="400"
          y1="0"
          x2="0"
          y2="400"
          stroke={`var(--${color})`}
          strokeWidth="1"
        />

        {/* The Inner Diamond Lines */}
        <line
          x1="200"
          y1="0"
          x2="0"
          y2="200"
          stroke={`var(--${color})`}
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="200"
          x2="200"
          y2="400"
          stroke={`var(--${color})`}
          strokeWidth="1"
        />
        <line
          x1="200"
          y1="400"
          x2="400"
          y2="200"
          stroke={`var(--${color})`}
          strokeWidth="1"
        />
        <line
          x1="400"
          y1="200"
          x2="200"
          y2="0"
          stroke={`var(--${color})`}
          strokeWidth="1"
        />
        {houseLayout.map((house) => {
          const rashi = getRashiForHouse(house.id);
          const val = points[rashi - 1] || 0;

          return (
            <text
              x={house.x}
              y={house.y}
              textAnchor="middle"
              style={{
                fontSize: "1.4rem",
                fontWeight: "900",
                fill: getBgColor(val),
              }}
            >
              {val}
            </text>
          );
        })}
        {/* <text x="200" y="185" textAnchor="middle" className="housenode">
          {getRashiForHouse(1)}
        </text> */}
      </svg>
    </>
    // <div
    //   style={{
    //     width: "300",
    //     maxWidth: "300",
    //     margin: "auto",
    //     textAlign: "center",
    //   }}
    // >
    //   <h3 style={{ marginBottom: "10px", color: "#333" }}>{title}</h3>

    //   <div
    //     style={{
    //       position: "relative",
    //       width: "300",
    //       paddingTop: "20",
    //       border: `2px solid var(--chartLine)`,
    //       background: "#fff",
    //     }}
    //   >
    //     {/* SVG Background Lines */}
    //     <svg
    //       style={{
    //         position: "absolute",
    //         top: 0,
    //         left: 0,
    //         width: "100",
    //         height: "100%",
    //       }}
    //       width="300"
    //       height="300"
    //       viewBox="0 0 300 300"
    //     >
    //       <line
    //         x1="0"
    //         y1="0"
    //         x2="100"
    //         y2="100"
    //         stroke={`var(--chartLine)`}
    //         strokeWidth="1"
    //       />
    //       <line
    //         x1="100"
    //         y1="0"
    //         x2="0"
    //         y2="100"
    //         stroke={`var(--chartLine)`}
    //         strokeWidth="1"
    //       />
    //       <line
    //         x1="50"
    //         y1="0"
    //         x2="0"
    //         y2="50"
    //         stroke={`var(--chartLine)`}
    //         strokeWidth="1"
    //       />
    //       <line
    //         x1="0"
    //         y1="50"
    //         x2="50"
    //         y2="100"
    //         stroke={`var(--chartLine)`}
    //         strokeWidth="1"
    //       />
    //       <line
    //         x1="50"
    //         y1="100"
    //         x2="100"
    //         y2="50"
    //         stroke={`var(--chartLine)`}
    //         strokeWidth="1"
    //       />
    //       <line
    //         x1="100"
    //         y1="50"
    //         x2="50"
    //         y2="0"
    //         stroke={`var(--chartLine)`}
    //         strokeWidth="1"
    //       />
    //     </svg>

    //     {/* Data Overlay */}
    // {houseLayout.map((house) => {
    //   const rashi = getRashiForHouse(house.id);
    //   const val = points[rashi - 1] || 0;

    //   return (
    //     <div
    //       key={house.id}
    //       style={{
    //         position: "absolute",
    //         left: house.x,
    //         top: house.y,
    //         transform: "translate(-50%, -50%)",
    //         textAlign: "center",
    //         width: "60px",
    //         height: "40px",
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "center",
    //         color: getBgColor(val),
    //         borderRadius: "4px",
    //       }}
    //         >
    //           {/* Rashi Number (Small, in corner/top) */}
    //           <span
    //             style={{
    //               fontSize: "0.7rem",
    //               fontWeight: "bold",
    //               color: "#666",
    //             }}
    //           >
    //             {rashi}
    //           </span>
    //           {/* SAV Point (Large, Center) */}
    //           <span
    //             style={{
    //               fontSize: "1.4rem",
    //               fontWeight: "900",
    //               color: getBgColor(val),
    //             }}
    //           >
    //             {val}
    //           </span>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
};

export default NorthIndianSAVChart;
