import React from 'react';

function ResultDisplay({ answer }) {
  return (
    <div className="result-display">
      {answer && (
        <>
          <h3>Answer</h3>
          <p>{answer}</p>
        </>
      )}
    </div>
  );
}

export default ResultDisplay;
