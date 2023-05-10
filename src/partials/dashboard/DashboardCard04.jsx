import React, { useState, useEffect } from "react";
import BarChart from "../../charts/BarChart01";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard04() {
  const [revenueData, setRevenueData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://assignment-1-fc7lwmf3uq-el.a.run.app/revenue"
        );
        const jsonData = await response.json();
        setRevenueData(jsonData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const directData =
    revenueData?.data?.revenue?.map((item) => item.direct) ?? [4.56, 5.34, 6.78, 8.98, 8.67, 6.34];
  const indirectData =
    revenueData?.data?.revenue?.map((item) => item.indirect) ?? [9.56, 7.34, 1.78, 5.98, 3.67, 10.34];
  console.log("heeelo", directData);

  // const labels = revenueData?.data?.revenue?.map(item => formatDate(item.month)) ?? [];
  const formatDate = dateStr => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [monthName, year] = dateStr.split(', ');
    const month = monthNames.indexOf(monthName);
    return new Date(year, month, 1).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
  };

  const labels = revenueData?.data?.revenue?.map(item => formatDate(item.month)) ?? [];

  console.log("lanels", labels);

  const chartData = {
    labels: [
      "12-01-2020",
      "01-01-2021",
      "02-01-2021",
      "03-01-2021",
      "04-01-2021",
      "05-01-2021",
    ],
    // labels: labels,




    
    datasets: [
      // Light blue bars
      {
        label: "Direct",
        data: directData,
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: "Indirect",
        data: indirectData,
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Direct VS Indirect</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;
