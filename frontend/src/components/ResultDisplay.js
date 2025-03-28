import React from 'react';

function ResultDisplay({ answer }) {
  return (
    <div className="result-display">
      {answer && (
        <div>
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;
