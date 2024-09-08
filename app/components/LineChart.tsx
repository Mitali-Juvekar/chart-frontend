
// app/components/LineChart.tsx
"use client"; 

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const LineChart = ({ data }: { data: any }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Line Chart Data',
        data: data.data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Ensure TypeScript knows this is a valid value
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
