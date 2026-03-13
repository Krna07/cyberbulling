function HighlightedText({ text, toxicKeywords }) {
  if (!toxicKeywords || toxicKeywords.length === 0) {
    return <p className="text-gray-700">{text}</p>;
  }

  let highlightedText = text;
  const parts = [];
  let lastIndex = 0;

  // Create regex pattern from toxic keywords
  const pattern = new RegExp(
    `(${toxicKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi'
  );

  const matches = [...text.matchAll(pattern)];
  
  matches.forEach((match, i) => {
    const matchIndex = match.index;
    
    // Add text before match
    if (matchIndex > lastIndex) {
      parts.push(
        <span key={`text-${i}`}>{text.slice(lastIndex, matchIndex)}</span>
      );
    }
    
    // Add highlighted match
    parts.push(
      <span key={`match-${i}`} className="bg-red-200 text-red-800 font-semibold px-1 rounded">
        {match[0]}
      </span>
    );
    
    lastIndex = matchIndex + match[0].length;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(<span key="text-end">{text.slice(lastIndex)}</span>);
  }

  return <p className="text-gray-700 leading-relaxed">{parts}</p>;
}

export default HighlightedText;
