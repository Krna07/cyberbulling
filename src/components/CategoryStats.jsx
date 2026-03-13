import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function CategoryStats({ stats }) {
  const pieChartRef = useRef(null);
  const pieChartInstance = useRef(null);

  useEffect(() => {
    if (!pieChartRef.current || !stats || !stats.categoryBreakdown) return;

    if (pieChartInstance.current) {
      pieChartInstance.current.destroy();
    }

    const ctx = pieChartRef.current.getContext('2d');
    
    // Pie chart data for threat, insult, identity_hate
    const pieData = {
      threat: stats.categoryBreakdown.threat || 0,
      insult: stats.categoryBreakdown.insult || 0,
      identity_hate: stats.categoryBreakdown.identity_hate || 0
    };

    pieChartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Threat', 'Insult', 'Identity Hate'],
        datasets: [{
          data: [pieData.threat, pieData.insult, pieData.identity_hate],
          backgroundColor: ['#a855f7', '#eab308', '#ec4899'],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 10,
              font: {
                size: 11
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    });

    return () => {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
    };
  }, [stats]);

  if (!stats || !stats.categoryBreakdown) {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Toxicity Category Statistics</h3>
        <p className="text-gray-500 text-center py-4">No category data available yet. Analyze some messages to see statistics.</p>
      </div>
    );
  }

  // Progress bar categories
  const barCategories = [
    { key: 'toxic', label: 'Toxic', color: 'bg-red-500', icon: '🔴' },
    { key: 'severe_toxic', label: 'Severe Toxic', color: 'bg-red-700', icon: '⛔' },
    { key: 'obscene', label: 'Obscene', color: 'bg-orange-500', icon: '🚫' }
  ];

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Toxicity Category Statistics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progress Bars Section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Primary Categories (Progress Bars)</h4>
          <div className="space-y-3">
            {barCategories.map(({ key, label, color, icon }) => {
              const count = stats.categoryBreakdown[key] || 0;
              const percentage = stats.totalMessages > 0 
                ? ((count / stats.totalMessages) * 100).toFixed(1)
                : 0;
              
              return (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{icon}</span>
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                    </div>
                    <span className="text-sm text-gray-600 font-semibold">{count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div
                      className={`${color} h-3 rounded-full transition-all duration-500 shadow-sm`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pie Chart Section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Secondary Categories (Pie Chart)</h4>
          <div className="h-48 flex items-center justify-center bg-white rounded-lg border border-gray-200 p-2">
            <canvas ref={pieChartRef}></canvas>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="text-center p-2 bg-purple-50 rounded border border-purple-200">
              <div className="font-semibold text-purple-700">⚠️ Threat</div>
              <div className="text-gray-600">{stats.categoryBreakdown.threat || 0}</div>
            </div>
            <div className="text-center p-2 bg-yellow-50 rounded border border-yellow-200">
              <div className="font-semibold text-yellow-700">💢 Insult</div>
              <div className="text-gray-600">{stats.categoryBreakdown.insult || 0}</div>
            </div>
            <div className="text-center p-2 bg-pink-50 rounded border border-pink-200">
              <div className="font-semibold text-pink-700">🚨 Hate</div>
              <div className="text-gray-600">{stats.categoryBreakdown.identity_hate || 0}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryStats;
