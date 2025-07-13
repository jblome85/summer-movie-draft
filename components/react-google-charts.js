import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { fetchCSV } from "./utils/fetchCSV";

const BoxOfficeChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const sheetId = "1q6gElz8_T2J_GE1j6fB3BAHIve12Vfk0s063h7TVIJY";
    const gid = "1062548989";

    fetchCSV(sheetId, gid).then((data) => {
      if (data.length === 0) return;

      const headers = Object.keys(data[0]);
      const rows = data.map((row) =>
        headers.map((h) =>
          h === "Date" ? row[h] : parseInt(row[h].replace(/\$|,/g, "")) || 0
        )
      );
      setChartData([headers, ...rows]);
    });
  }, []);

  return (
    <Chart
      width={"100%"}
      height={"500px"}
      chartType="LineChart"
      loader={<div>Loading Chart...</div>}
      data={chartData}
      options={{
        title: "Daily Domestic Gross by Movie",
        curveType: "function",
        legend: { position: "bottom" },
      }}
    />
  );
};

export default BoxOfficeChart;
