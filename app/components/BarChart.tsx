
// app/components/BarChart.tsx
"use client"; 

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({ data }: { data: any }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Bar Chart Data',
        data: data.data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
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

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
