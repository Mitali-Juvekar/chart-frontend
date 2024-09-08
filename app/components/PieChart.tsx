// app/components/PieChart.tsx
"use client"; // Add this line at the top

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }: { data: any }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Pie Chart Data',
        data: data.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
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

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
