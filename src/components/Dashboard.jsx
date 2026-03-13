import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import CategoryStats from './CategoryStats';

function Dashboard({ analytics }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !analytics) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Safe Messages', 'Cyberbullying Detected'],
        datasets: [{
          data: [analytics.safeCount, analytics.bullyingCount],
          backgroundColor: ['#10b981', '#ef4444'],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [analytics]);

  if (!analytics) return null;

  const toxicityPercentage = analytics.totalMessages > 0
    ? ((analytics.bullyingCount / analytics.totalMessages) * 100).toFixed(1)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-blue-600 text-sm font-semibold mb-1">Total Messages</p>
          <p className="text-3xl font-bold text-blue-700">{analytics.totalMessages}</p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <p className="text-red-600 text-sm font-semibold mb-1">Bullying Detected</p>
          <p className="text-3xl font-bold text-red-700">{analytics.bullyingCount}</p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <p className="text-purple-600 text-sm font-semibold mb-1">Toxicity Rate</p>
          <p className="text-3xl font-bold text-purple-700">{toxicityPercentage}%</p>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Message Distribution</h3>
        <div className="h-64">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      <CategoryStats stats={analytics} />
    </div>
  );
}

export default Dashboard;
