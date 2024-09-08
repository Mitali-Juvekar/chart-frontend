// // app/page.tsx
// import React from 'react';
// import dynamic from 'next/dynamic';

// const CandlestickChart = dynamic(() => import('./components/CandlestickChart'), { ssr: false });
// const LineChart = dynamic(() => import('./components/LineChart'), { ssr: false });
// const BarChart = dynamic(() => import('./components/BarChart'), { ssr: false });
// const PieChart = dynamic(() => import('./components/PieChart'), { ssr: false });

// const fetchData = async (endpoint: string) => {
//   try {
//     const res = await fetch(`http://127.0.0.1:8000/api/${endpoint}`);
//     if (!res.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return res.json();
//   } catch (error) {
//     console.error(`Error fetching ${endpoint}:`, error);
//     return null;
//   }
// };

// const Page = async () => {
//   const [candlestickData, lineChartData, barChartData, pieChartData] = await Promise.all([
//     fetchData('candlestick-data/'),
//     fetchData('line-chart-data/'),
//     fetchData('bar-chart-data/'),
//     fetchData('pie-chart-data/'),
//   ]);

//   const renderChart = (ChartComponent: React.ComponentType<any>, data: any, name: string) => {
//     if (!data) {
//       return (
//         <div className="alert alert-error shadow-lg">
//           <div>
//             <span>Error! Failed to load {name} Chart data.</span>
//           </div>
//         </div>
//       );
//     }
//     return (
//       <div className="card w-full max-w-md bg-base-100 shadow-lg mx-auto mb-4">
//         <div className="card-body p-4">
//           <h2 className="card-title text-center">{name} Chart</h2>
//           <div className="chart-container" style={{ height: '300px' }}>
//             <ChartComponent data={data} />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
//         {renderChart(CandlestickChart, candlestickData, 'Candlestick')}
//         {renderChart(LineChart, lineChartData, 'Line')}
//         {renderChart(BarChart, barChartData, 'Bar')}
//         {renderChart(PieChart, pieChartData, 'Pie')}
//       </div>
//     </div>
//   );
// };

// export default Page;

// app/page.tsx
import React from 'react';
import dynamic from 'next/dynamic';

const CandlestickChart = dynamic(() => import('./components/CandlestickChart'), { ssr: false });
const LineChart = dynamic(() => import('./components/LineChart'), { ssr: false });
const BarChart = dynamic(() => import('./components/BarChart'), { ssr: false });
const PieChart = dynamic(() => import('./components/PieChart'), { ssr: false });

const fetchData = async (endpoint: string) => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/${endpoint}`);
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