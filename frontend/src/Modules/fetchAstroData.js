import { baseURL } from "../Server/server.js";
export const fetchAstroData = async (newUser) => {
  // if seconds are missing in the time
  let newTime =
    newUser?.time?.split(":")?.length == 2
      ? newUser?.time + ":00"
      : newUser?.time;
  let timezone = newUser.tz ? newUser.tz : 5.5;
  try {
    const response = await fetch(
      `${baseURL}/api/get-full-chart?dob=${newUser?.dob}&time=${newTime}&tz=${timezone}&lat=${newUser?.lat}&lon=${newUser?.lon}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch astrology data");
    }

    const result = await response.json();
    // console.log("fetch", result);
    return result;
  } catch (err) {
    console.error(err);
    // setError(`Fetching error. ${err}`);
    // setError(err);
  }
};
