"use client";
import { useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import { Chart, ChartConfiguration, ChartType } from "chart.js/auto";
interface PieChartProps {
  chartName: string;
  data: number[];
  labels: string[];
  id: string;
  chartType: string;
}

function PieChart({ chartName, data, labels, id, chartType }: PieChartProps) {
  const chartRef = useRef<Chart | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (chartRef.current) {
      // If a Chart instance already exists, destroy it
      chartRef.current.destroy();
    }

    const canvas = document.getElementById(id) as HTMLCanvasElement | null;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const chartConfig: ChartConfiguration = {
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
        onClick: (event, elements) => {
          // Check if a slice was clicked
          if (elements && elements.length > 0) {
            console.log(chartType);
            const index = elements[0].index;
            const label = labels[index];
            const value = data[index];
            if (chartType != "positions") {
              router.push(`/${chartType}/${label}`);
            }
          }
        },
      },
    };

    const newChartInstance = new Chart(ctx, chartConfig);

    // Store the Chart instance in the ref for cleanup
    chartRef.current = newChartInstance;

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, labels, id]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h1 className="w-[100px] mx-auto mt-10 text-lg font-semibold capitalize">{chartName}</h1>
        <div style={{ width: "80%", height: "80%" }}>
          <canvas id={id}></canvas>
        </div>
      </div>
    </>
  );
}

export default PieChart;
