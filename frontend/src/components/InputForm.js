import React, { useState } from 'react';

function InputForm({ onAskQuestion }) {
  const [urls, setUrls] = useState('');
  const [question, setQuestion] = useState('');
  const [content, setContent] = useState('');

  // Handle URL input change
  const handleUrlChange = (e) => setUrls(e.target.value);

  // Handle question input change
  const handleQuestionChange = (e) => setQuestion(e.target.value);

  const handleIngestContent = async () => {
    const response = await fetch('http://127.0.0.1:5000/ingest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls: urls.split(',') }),
    });
    const data = await response.json();
    setContent(data.content); // Set the scraped content
  };

  return (
    <div className="input-form">
      <textarea
        value={urls}
        onChange={handleUrlChange}
        placeholder="Enter URLs (comma-separated)"
      />
      <button onClick={handleIngestContent}>Ingest Content</button>

      <textarea
        value={question}
        onChange={handleQuestionChange}
        placeholder="Ask a question based on the content"
      />
      <button onClick={() => onAskQuestion(question, content)}>Get Answer</button>
    </div>
  );
}

export default InputForm;
