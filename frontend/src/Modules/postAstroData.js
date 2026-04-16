import { baseURL } from "../Server/server.js";
export const postAstroData = async (UserData) => {
  //   console.log("post", JSON.stringify(UserData));

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "allUsers",
      data: UserData,
    }),
  };
  //   //   console.log(requestOptions.body);
  try {
    const response = await fetch(`${baseURL}/data`, requestOptions);
    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};
