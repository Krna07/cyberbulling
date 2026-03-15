import HighlightedText from './HighlightedText';
import { useState, useEffect, useRef } from 'react';
import ReportModal from './ReportModal';
import Chart from 'chart.js/auto';

const CATEGORY_CONFIG = {
  toxic:         { label: 'Toxic',         icon: '🔴', color: '#ef4444' },
  severe_toxic:  { label: 'Severe Toxic',  icon: '⛔', color: '#991b1b' },
  obscene:       { label: 'Obscene',       icon: '🚫', color: '#f97316' },
  threat:        { label: 'Threat',        icon: '⚠️', color: '#a855f7' },
  insult:        { label: 'Insult',        icon: '💢', color: '#eab308' },
  identity_hate: { label: 'Identity Hate', icon: '🚨', color: '#ec4899' },
};

function CategoryPieChart({ categories }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !categories) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const keys = Object.keys(CATEGORY_CONFIG);
    const values = keys.map(k => (categories[k] || 0) * 100);
    const hasAny = values.some(v => v > 0);

    // if all zero show equal slices greyed out
    const data = hasAny ? values : keys.map(() => 1);
    const colors = hasAny
      ? keys.map(k => CATEGORY_CONFIG[k].color)
      : keys.map(() => '#e5e7eb');

    chartInstance.current = new Chart(chartRef.current.getContext('2d'), {
      type: 'pie',
      data: {
        labels: keys.map(k => CATEGORY_CONFIG[k].label),
        datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: '#fff' }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { font: { size: 11 }, padding: 8 } },
          tooltip: {
            callbacks: {
              label: (ctx) => hasAny
                ? ` ${ctx.label}: ${ctx.parsed === 100 ? 'Detected' : ctx.parsed === 0 ? 'Not detected' : ctx.parsed + '%'}`
                : ` ${ctx.label}: Not detected`
            }
          }
        }
      }
    });

    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [categories]);

  return <canvas ref={chartRef}></canvas>;
}


function ResultCard({ result, originalText }) {
  const [showReportModal, setShowReportModal] = useState(false);
  if (result.error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-700 font-semibold">Error: {result.error}</p>
      </div>
    );
  }

  const isBullying = result.prediction === "Cyberbullying Detected";
  const bgColor = isBullying ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200';
  const textColor = isBullying ? 'text-red-700' : 'text-green-700';
  const icon = isBullying ? '⚠️' : '✅';

  const getSeverityLevel = (confidence) => {
    if (confidence >= 0.8) return { label: 'High', color: 'text-red-600 bg-red-100' };
    if (confidence >= 0.6) return { label: 'Medium', color: 'text-orange-600 bg-orange-100' };
    return { label: 'Low', color: 'text-yellow-600 bg-yellow-100' };
  };

  const severity = isBullying ? getSeverityLevel(result.confidence) : null;

  return (
    <div className={`${bgColor} border rounded-lg p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-bold ${textColor} flex items-center gap-2`}>
          <span>{icon}</span>
          {result.prediction}
        </h2>
        <div className="flex items-center gap-2">
          {result.language && (
            <span className="text-xs font-semibold px-3 py-1 rounded bg-blue-100 text-blue-800">
              {result.language === 'hindi' ? '🇮🇳 Hindi' : 
               result.language === 'telugu' ? '🇮🇳 Telugu' : 
               '🇬🇧 English'}
            </span>
          )}
          {severity && (
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${severity.color}`}>
              {severity.label} Severity
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-700 font-semibold mb-2">Confidence Score</p>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full ${isBullying ? 'bg-red-500' : 'bg-green-500'}`}
              style={{ width: `${result.confidence * 100}%` }}
            />
          </div>
          <span className={`font-bold text-lg ${textColor}`}>
            {(result.confidence * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Category Labels Pie Chart — always shown */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-gray-700 font-semibold mb-3">Toxicity Label Breakdown</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Pie chart */}
          <div className="h-52 bg-white rounded-lg border border-gray-200 p-2">
            <CategoryPieChart categories={result.categories} />
          </div>
          {/* Label badges */}
          <div className="grid grid-cols-2 gap-2 content-start">
            {Object.entries(CATEGORY_CONFIG).map(([key, { label, icon, color }]) => {
              const active = result.categories?.[key] === 1;
              return (
                <div
                  key={key}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-sm font-medium transition-all ${
                    active
                      ? 'bg-white border-gray-300 text-gray-800 shadow-sm'
                      : 'bg-gray-50 border-gray-200 text-gray-400'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: active ? color : '#d1d5db' }}
                  />
                  <span>{icon} {label}</span>
                  {active && (
                    <span className="ml-auto text-xs font-bold" style={{ color }}>✓</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>


        <div className="mt-6 pt-4 border-t border-red-200">
          <p className="text-gray-700 font-semibold mb-2">Analyzed Message</p>
          <div className="bg-white p-4 rounded border border-red-200">
            <HighlightedText text={originalText} toxicKeywords={result.toxicKeywords} />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {result.toxicKeywords.length} toxic keyword(s) detected
          </p>
        </div>
      )}

      {isBullying && (
        <div className="mt-6 pt-4 border-t border-red-200">
          <button
            onClick={() => setShowReportModal(true)}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <span>📢</span>
            Report to Authorities
          </button>
          <p className="text-xs text-gray-600 mt-2 text-center">
            File a complaint with official cybercrime portals using this analysis as evidence
          </p>
        </div>
      )}

      {showReportModal && (
        <ReportModal
          result={result}
          originalText={originalText}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
}

export default ResultCard;
