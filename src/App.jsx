import { useState, useEffect } from 'react';
import MessageInput from './components/MessageInput';
import ResultCard from './components/ResultCard';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Auth from './components/Auth';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzedText, setAnalyzedText] = useState('');
  const [analytics, setAnalytics] = useState({
    totalMessages: 0,
    bullyingCount: 0,
    safeCount: 0,
    categoryBreakdown: {}
  });
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      try {
        const response = await fetch('https://cyberbully-backend.onrender.com/api/auth/verify', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          setUser(JSON.parse(savedUser));
          fetchStats();
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
      }
    }
    setAuthLoading(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    fetchStats();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setAnalytics({
      totalMessages: 0,
      bullyingCount: 0,
      safeCount: 0,
      categoryBreakdown: {}
    });
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch('https://cyberbully-backend.onrender.com/api/stats', {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        setAnalytics({
          totalMessages: data.totalMessages,
          bullyingCount: data.bullyingCount,
          safeCount: data.safeCount,
          categoryBreakdown: data.categoryBreakdown || {}
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleAnalyze = async (text) => {
    setLoading(true);
    setResult(null);
    setAnalyzedText(text);
    
    try {
      const response = await fetch('https://cyberbully-backend.onrender.com/api/analyze', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ text })
      });
      
      const data = await response.json();
      setResult(data);
      
      if (!data.error) {
        fetchStats();
      }
    } catch (error) {
      setResult({ error: 'Failed to analyze message' });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Cyberbullying Detection Platform
            </h1>
            <p className="text-gray-600">
              AI-powered message analysis to detect harmful content
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Welcome,</p>
              <p className="font-semibold text-gray-800">{user.username}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Dashboard & Input */}
          <div className="lg:col-span-2 space-y-6">
            <Dashboard analytics={analytics} />
            <MessageInput onAnalyze={handleAnalyze} loading={loading} />
            {result && <ResultCard result={result} originalText={analyzedText} />}
          </div>
          
          {/* Right Column - History */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <History refreshKey={analytics.totalMessages} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
