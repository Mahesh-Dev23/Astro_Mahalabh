import { fetchAstroData } from "../fetchAstroData";
import { postAstroData } from "../postAstroData";
export const setUser = async (data) => {
  // console.log(data);

  let allUsers = [];
  data.map((u, i) => {
    // if (name === "default") return;
    // console.log(u);

    let user = {
      name: u.name,
      dob: u.dob,
      time: u.time,
      lat: u.lat,
      lon: u.lon,
      tz: 5.5,
    };
    // console.log(user);
    fetchAstroData(user).then((res) => {
      allUsers.push({ [u.name]: res });
      postAstroData({ [u.name]: res });
    });
  });
  // allUsers.length > 0 && console.log(allUsers.length, data.length);
  // console.log(JSON.stringify(localStorage).length / 1024 / 1024 + " MB");
  // postAstroData(allUsers);
  // console.log("data fetched");
  // localStorage.setItem("All Astro Data", JSON.stringify(allUsers));
  return allUsers;
};
