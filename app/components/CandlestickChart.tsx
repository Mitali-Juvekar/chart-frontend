"use client";

import { Chart, ChartConfiguration, ChartTypeRegistry, registerables } from 'chart.js';
import { CandlestickController, CandlestickElement, OhlcElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns'; // For date parsing
import enUS from 'date-fns/locale/en-US'; // Date locale
import { useEffect, useRef } from 'react';

// Register Chart.js components and the financial chart types
Chart.register(...registerables, CandlestickController, CandlestickElement, OhlcElement);

interface CandlestickDataItem {
  x: string;  // Date or timestamp as string
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickData {
  data: CandlestickDataItem[];  // Array of data items
}

// Candlestick chart type definition
type CandlestickChartType = 'candlestick'; // Specify the candlestick chart type

const CandlestickChart = ({ data }: { data: CandlestickData }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);  // Reference to the canvas element
  const chartInstanceRef = useRef<Chart | null>(null);  // Reference to the Chart.js instance

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    if (ctx && data && data.data.length > 0) {
      // Destroy previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Define the chart configuration
      const chartConfig: ChartConfiguration<CandlestickChartType> = {
        type: 'candlestick', // Specify the candlestick chart type
        data: {
          datasets: [
            {
              label: 'Candlestick Chart Data',
              data: data.data.map((item) => ({
                x: new Date(item.x).getTime(),  // Convert the timestamp to milliseconds
                o: item.open,                   // Open price
                h: item.high,                   // High price
                l: item.low,                    // Low price
                c: item.close,                  // Close price
              })),
            },
          ],
        },
        options: {
          responsive: true,  // Make the chart responsive
          plugins: {
            legend: {
              position: 'top', // Place the legend at the top
            },
          },
          scales: {
            x: {
              type: 'time',  // Use time scale for x-axis
              time: {
                unit: 'day',  // Display data by day
              },
              adapters: {
                date: {
                  locale: enUS,  // Set the locale for date formatting
                },
              },
            },
          },
        },
      };

      // Create the Chart.js instance and store it in chartInstanceRef
      chartInstanceRef.current = new Chart(ctx, chartConfig);
    }

    // Cleanup function to destroy the chart on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]); // Re-run the effect when the data changes

  // If no data is provided, show a message
  if (!data || !Array.isArray(data.data) || data.data.length === 0) {
    return <div>No data available for the Candlestick Chart</div>;
  }

  // Render the canvas element for the chart
  return <canvas ref={chartRef} />;
};

export default CandlestickChart;
