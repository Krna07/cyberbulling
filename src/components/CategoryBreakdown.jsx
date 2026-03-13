function CategoryBreakdown({ categories }) {
  if (!categories) return null;

  const categoryLabels = {
    toxic: { label: 'Toxic', color: 'bg-red-500', icon: '🔴' },
    severe_toxic: { label: 'Severe Toxic', color: 'bg-red-700', icon: '⛔' },
    obscene: { label: 'Obscene', color: 'bg-orange-500', icon: '🚫' },
    threat: { label: 'Threat', color: 'bg-purple-500', icon: '⚠️' },
    insult: { label: 'Insult', color: 'bg-yellow-500', icon: '💢' },
    identity_hate: { label: 'Identity Hate', color: 'bg-pink-500', icon: '🚨' }
  };

  const activeCategories = Object.entries(categories).filter(([_, value]) => value === 1);
  
  if (activeCategories.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Toxicity Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(categories).map(([key, value]) => {
          const config = categoryLabels[key];
          const isActive = value === 1;
          
          return (
            <div
              key={key}
              className={`p-3 rounded-lg border-2 transition-all ${
                isActive
                  ? `${config.color} bg-opacity-10 border-current`
                  : 'bg-gray-50 border-gray-200 opacity-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{config.icon}</span>
                <div>
                  <p className={`text-sm font-semibold ${
                    isActive ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                    {config.label}
                  </p>
                  <p className="text-xs text-gray-600">
                    {isActive ? 'Detected' : 'Not detected'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Multi-label Classification:</span> {activeCategories.length} of 6 toxicity categories detected
        </p>
      </div>
    </div>
  );
}

export default CategoryBreakdown;
