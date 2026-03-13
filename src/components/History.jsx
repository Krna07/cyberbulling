import { useState, useEffect } from 'react';
import AnalysisDetailModal from './AnalysisDetailModal';

function History({ refreshKey }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, [refreshKey]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://cyberbully-backend.onrender.com/api/history?limit=20', {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        setHistory(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch history:', response.status);
        setHistory([]);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this analysis?')) return;
    
    setDeleting(id);
    try {
      const response = await fetch(`https://cyberbully-backend.onrender.com/api/analysis/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        setHistory(history.filter(item => item._id !== id));
      } else {
        alert('Failed to delete analysis');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete analysis');
    } finally {
      setDeleting(null);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm('Are you sure you want to delete ALL analyses? This cannot be undone!')) return;
    
    setLoading(true);
    try {
      const response = await fetch('https://cyberbully-backend.onrender.com/api/analysis', {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        setHistory([]);
        alert('All analyses deleted successfully');
      } else {
        alert('Failed to delete all analyses');
      }
    } catch (error) {
      console.error('Delete all error:', error);
      alert('Failed to delete all analyses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Analysis</h2>
        <div className="text-center py-4 text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Recent Analysis</h2>
        {history.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="text-xs text-red-600 hover:text-red-800 font-semibold px-3 py-1 rounded border border-red-300 hover:bg-red-50 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No analysis history yet</p>
      ) : (
        <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {Array.isArray(history) && history.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedAnalysis(item)}
              className={`p-3 rounded-lg border transition-all hover:shadow-md relative group cursor-pointer ${
                item.prediction === 'Cyberbullying Detected'
                  ? 'bg-red-50 border-red-200 hover:border-red-300'
                  : 'bg-green-50 border-green-200 hover:border-green-300'
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item._id);
                }}
                disabled={deleting === item._id}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-800 p-1 rounded hover:bg-white z-10"
                title="Delete this analysis"
              >
                {deleting === item._id ? (
                  <span className="text-xs">⏳</span>
                ) : (
                  <span className="text-sm">🗑️</span>
                )}
              </button>
              
              <div className="flex justify-between items-start mb-2 pr-6">
                <p className="text-xs text-gray-700 flex-1 mr-2 line-clamp-2">
                  {item.text}
                </p>
                <span className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${
                  item.prediction === 'Cyberbullying Detected'
                    ? 'bg-red-200 text-red-800'
                    : 'bg-green-200 text-green-800'
                }`}>
                  {(item.confidence * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span className="font-medium">
                  {item.prediction === 'Cyberbullying Detected' ? '⚠️ Bullying' : '✅ Safe'}
                </span>
                <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="mt-2 text-xs text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to view full report →
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAnalysis && (
        <AnalysisDetailModal
          analysis={selectedAnalysis}
          onClose={() => setSelectedAnalysis(null)}
        />
      )}
    </div>
  );
}

export default History;
