import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

function PieChart({ data, labels }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // If a Chart instance already exists, destroy it
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("myChart").getContext("2d");
    const newChartInstance = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            borderColor: ["#3cba9f", "#ffa500", "#c45850"],
            backgroundColor: ["rgb(60,186,159,0.1)", "rgb(255,165,0,0.1)", "rgb(196,88,80,0.1)"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        // scales: {
        //   xAxes: [
        //     {
        //       display: false,
        //     },
        //   ],
        //   yAxes: [
        //     {
        //       display: false,
        //     },
        //   ],
        // },
      },
    });

    // Store the Chart instance in the ref for cleanup
    chartRef.current = newChartInstance;

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, labels]);

  return (
    <>
      <h1 className="w-[110px] mx-auto mt-10 text-xl font-semibold capitalize">Pie Chart</h1>
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className="border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto shadow-xl pb-2">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </>
  );
}

export default PieChart;
