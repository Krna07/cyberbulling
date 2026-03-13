import { useState } from 'react';

function SearchAnalysis() {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchText.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: searchText })
      });
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults({ error: 'Failed to search' });
    } finally {
      setLoading(false);
    }
  };

  const categoryConfig = {
    toxic: { label: 'Toxic', color: 'bg-red-500', icon: '🔴' },
    severe_toxic: { label: 'Severe Toxic', color: 'bg-red-700', icon: '⛔' },
    obscene: { label: 'Obscene', color: 'bg-orange-500', icon: '🚫' },
    threat: { label: 'Threat', color: 'bg-purple-500', icon: '⚠️' },
    insult: { label: 'Insult', color: 'bg-yellow-500', icon: '💢' },
    identity_hate: { label: 'Identity Hate', color: 'bg-pink-500', icon: '🚨' }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🔍 Search & Categorize</h2>
      
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Enter word or sentence to check categories..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !searchText.trim()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {results && !results.error && (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg border-2 ${
            results.isToxic 
              ? 'bg-red-50 border-red-300' 
              : 'bg-green-50 border-green-300'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">
                {results.isToxic ? '⚠️ Toxic Content Detected' : '✅ Safe Content'}
              </h3>
              <span className="text-sm font-semibold px-3 py-1 rounded bg-white">
                {(results.confidence * 100).toFixed(0)}% Confidence
              </span>
            </div>
            <p className="text-sm text-gray-700 italic">"{searchText}"</p>
          </div>

          {results.isToxic && results.categories && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Detected Categories:</h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(results.categories).map(([key, value]) => {
                  const config = categoryConfig[key];
                  const isDetected = value === 1;
                  
                  return (
                    <div
                      key={key}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isDetected
                          ? `${config.color} bg-opacity-10 border-current shadow-md`
                          : 'bg-gray-50 border-gray-200 opacity-40'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{config.icon}</span>
                        <div className="flex-1">
                          <p className={`text-sm font-bold ${
                            isDetected ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                            {config.label}
                          </p>
                          <p className="text-xs text-gray-600">
                            {isDetected ? '✓ Detected' : '✗ Not detected'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {results.toxicKeywords && results.toxicKeywords.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-semibold text-yellow-800 mb-2">
                    Toxic Keywords Found:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {results.toxicKeywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-yellow-200 text-yellow-900 rounded text-xs font-semibold"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {results && results.error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-semibold">Error: {results.error}</p>
        </div>
      )}
    </div>
  );
}

export default SearchAnalysis;
