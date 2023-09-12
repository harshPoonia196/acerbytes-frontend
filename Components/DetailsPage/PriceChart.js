import { Chart } from "react-google-charts";

export const data = [
  ["Month", "Fresh unit", "Resale unit"],
  ["08/23", 8.4, 7.9],
  ["09/23", 6.9, 6.5],
  ["10/23", 6.5, 6.4],
  ["11/23", 4.4, 6.2],
  ["11/23", 4.4, 6.2],
  ["11/23", 4.4, 6.2],
  ["11/23", 4.4, 6.2],
  ["11/23", 4.4, 6.2],
  ["11/23", 4.4, 6.2],
  ["11/23", 4.4, 6.2],
  ["11/23", 4.4, 6.2],
  ["11/23", 4.4, 6.2],
];

export const options = {
  title: "Price trend (Price per sqft)",
  // vAxis: { title: "Price (per sqft)" },
  isStacked: true,
  fontSize: 12,
  legend: { position: "top" },
};

function PriceChart() {
  return (
    <Chart
      chartType="SteppedAreaChart"
      width="100%"
      height="250px"
      data={data}
      options={options}
      legendToggle
    />
  );
}

export default PriceChart;
