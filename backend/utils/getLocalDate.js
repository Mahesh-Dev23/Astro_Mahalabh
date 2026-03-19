export const getLocalDate = (d, a) => {
  const date = new Date(d);
  // console.log("date a d, date ..........", a, d, date);
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    timeZone: "Asia/Kolkata",
    // hour12: false,
  });
};
