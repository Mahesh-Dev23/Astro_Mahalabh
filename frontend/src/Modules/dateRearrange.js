export const dateRearrange = (date) => {
  let receivedDate = date?.split("T")[0];
  const newDate = `${receivedDate?.split("-")[2]} / ${receivedDate?.split("-")[1]} / ${receivedDate?.split("-")[0]}`;
  // console.log(newDate);
  return newDate;
};
