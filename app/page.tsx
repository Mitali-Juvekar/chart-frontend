
// app/page.tsx
import React from 'react';
import dynamic from 'next/dynamic';

const CandlestickChart = dynamic(() => import('./components/CandlestickChart'), { ssr: false });
const LineChart = dynamic(() => import('./components/LineChart'), { ssr: false });
const BarChart = dynamic(() => import('./components/BarChart'), { ssr: false });
const PieChart = dynamic(() => import('./components/PieChart'), { ssr: false });

const fetchData = async (endpoint: string) => {
  try {
    // const res = await fetch(`http://127.0.0.1:8000/api/${endpoint}`);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Use environment variable
    const res = await fetch(`${apiUrl}/api/${endpoint}`);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
};

const Page = async () => {
  const [candlestickData, lineChartData, barChartData, pieChartData] = await Promise.all([
    fetchData('candlestick-data/'),
    fetchData('line-chart-data/'),
    fetchData('bar-chart-data/'),
    fetchData('pie-chart-data/'),
  ]);

  const renderChart = (ChartComponent: React.ComponentType<any>, data: any, name: string) => {
    if (!data) {
      return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> Failed to load {name} Chart data.</span>
      </div>;
    }
    return (
      <div className="chart-container">
        <h2 className="text-lg font-bold mb-2">{name} Chart</h2>
        <ChartComponent data={data} />
      </div>
    );
  };

  return (
    <div className="container">
      {renderChart(CandlestickChart, candlestickData, 'Candlestick')}
      {renderChart(LineChart, lineChartData, 'Line')}
      {renderChart(BarChart, barChartData, 'Bar')}
      {renderChart(PieChart, pieChartData, 'Pie')}
    </div>
  );
};

export default Page;