import { getSelectedDChart } from "../talika/getSelectedDChart";
export const getDtaforDChart = (data, chart) => {
  // console.log("personal data", data);
  if (!data) return "no data";
  const ch = getSelectedDChart(
    data?.chart?.planets,
    data?.chart?.lagna,
    data?.chart?.lagnaDegree,
    chart,
  );
  // console.log("ch", ch);

  return ch;
};
