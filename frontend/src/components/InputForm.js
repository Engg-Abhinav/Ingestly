import React, { useState } from 'react';

function InputForm({ onAskQuestion }) {
  const [urls, setUrls] = useState('');
  const [question, setQuestion] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ingested, setIngested] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);

  const handleIngestContent = async () => {
    setIsLoading(true);
    const response = await fetch('http://127.0.0.1:5000/ingest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls: urls.split(',') }),
    });
    const data = await response.json();
    setContent(data.content);
    setIsLoading(false);
    setIngested(true);
  };

  const handleIngestAgain = () => {
    setUrls('');
    setContent('');
    setIngested(false);
  };

  const handleGetAnswer = async () => {
    setIsAnswering(true);
    await onAskQuestion(question, content);
    setIsAnswering(false);
  };

  return (
    <div className="input-form">
      {!ingested ? (
        <>
          <textarea
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            placeholder="Enter URLs (comma-separated)"
            rows={4}
          />
          <button onClick={handleIngestContent} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Ingest Content'}
          </button>
        </>
      ) : (
        <div className="ingestion-complete">
          <span>✅ Ingestion Completed!</span>
          <button onClick={handleIngestAgain}>Ingest Again</button>
        </div>
      )}

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question based on the content"
        rows={3}
      />
      <button onClick={handleGetAnswer} disabled={isAnswering}>
        {isAnswering ? 'Answering...' : 'Get Answer'}
      </button>
    </div>
  );
}

export default InputForm;
