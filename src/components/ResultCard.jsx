import HighlightedText from './HighlightedText';
import { useState } from 'react';
import ReportModal from './ReportModal';

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

      {isBullying && result.toxicKeywords && result.toxicKeywords.length > 0 && (
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
