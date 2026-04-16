export const getLocalData = () => {
  // console.log("get data");
  let allAstro = localStorage.getItem("All Astro Data");
  //   console.log(allAstro);
  return JSON.parse(allAstro);
};
