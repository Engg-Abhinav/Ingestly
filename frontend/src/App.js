import React, { useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleAskQuestion = async (question, content) => {
    setError('');
    setAnswer('');
    try {
      // For local
      // const response = await fetch('http://127.0.0.1:5000/ask', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ question, content })
      // });

      // For render
      const response = await fetch('https://ingestly.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, content })
      });
      
      const data = await response.json();

      if (response.ok) {
        setAnswer(data.answer);
      } else {
        setError(data.error || 'Failed to get an answer');
      }
    } catch (error) {
      setError('Error occurred while fetching the answer.');
    }
  };

  return (
    <div className="App container">
      <h1>Interactive Web Content Q&A</h1>
      <InputForm onAskQuestion={handleAskQuestion} />
      {error && <div className="error-message">{error}</div>}
      <ResultDisplay answer={answer} />
    </div>
  );
}

export default App;
