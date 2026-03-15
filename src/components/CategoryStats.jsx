import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ALL_CATEGORIES = [
  { key: 'toxic',         label: 'Toxic',         color: 'bg-red-500',    border: 'border-red-300',    text: 'text-red-700',    icon: '🔴', chartColor: '#ef4444' },
  { key: 'severe_toxic',  label: 'Severe Toxic',  color: 'bg-red-800',    border: 'border-red-400',    text: 'text-red-900',    icon: '⛔', chartColor: '#991b1b' },
  { key: 'obscene',       label: 'Obscene',       color: 'bg-orange-500', border: 'border-orange-300', text: 'text-orange-700', icon: '🚫', chartColor: '#f97316' },
  { key: 'threat',        label: 'Threat',        color: 'bg-purple-500', border: 'border-purple-300', text: 'text-purple-700', icon: '⚠️', chartColor: '#a855f7' },
  { key: 'insult',        label: 'Insult',        color: 'bg-yellow-500', border: 'border-yellow-300', text: 'text-yellow-700', icon: '💢', chartColor: '#eab308' },
  { key: 'identity_hate', label: 'Identity Hate', color: 'bg-pink-500',   border: 'border-pink-300',   text: 'text-pink-700',   icon: '🚨', chartColor: '#ec4899' },
];

function CategoryStats({ stats }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !stats?.categoryBreakdown) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const total = stats.totalMessages || 1;
    const data = ALL_CATEGORIES.map(c => stats.categoryBreakdown[c.key] || 0);
    const percentages = data.map(v => parseFloat(((v / total) * 100).toFixed(1)));

    chartInstance.current = new Chart(chartRef.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ALL_CATEGORIES.map(c => c.label),
        datasets: [{
          label: '% of Total Messages',
          data: percentages,
          backgroundColor: ALL_CATEGORIES.map(c => c.chartColor),
          borderRadius: 6,
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const count = data[ctx.dataIndex];
                return ` ${ctx.parsed.y}%  (${count} messages)`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { callback: v => v + '%' },
            grid: { color: '#f3f4f6' }
          },
          x: { grid: { display: false } }
        }
      }
    });

    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [stats]);

  if (!stats?.categoryBreakdown) {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Toxicity Category Statistics</h3>
        <p className="text-gray-500 text-center py-4">No data yet. Analyze some messages to see statistics.</p>
      </div>
    );
  }

  const total = stats.totalMessages || 1;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Toxicity Category Statistics</h3>

      {/* Progress bars — all 6 */}
      <div className="space-y-3 mb-6">
        {ALL_CATEGORIES.map(({ key, label, color, icon }) => {
          const count = stats.categoryBreakdown[key] || 0;
          const pct = ((count / total) * 100).toFixed(1);
          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <span>{icon}</span>
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-600">{count} &nbsp;<span className="text-gray-400">({pct}%)</span></span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div
                  className={`${color} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bar chart — all 6 */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Category Distribution (%)</h4>
        <div className="h-52 bg-white rounded-lg border border-gray-200 p-3">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Summary badges */}
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
        {ALL_CATEGORIES.map(({ key, label, icon, border, text }) => {
          const count = stats.categoryBreakdown[key] || 0;
          const pct = ((count / total) * 100).toFixed(1);
          return (
            <div key={key} className={`text-center p-2 bg-white rounded-lg border ${border}`}>
              <div className="text-lg">{icon}</div>
              <div className={`text-xs font-semibold ${text}`}>{label}</div>
              <div className="text-sm font-bold text-gray-800">{pct}%</div>
              <div className="text-xs text-gray-500">{count} msgs</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryStats;
