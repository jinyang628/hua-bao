import React from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import PracticePage from '../PracticeFiles/PracticePage';

function TopicSelectionPage() {
  const navigate = useNavigate();

  const handleTopicSelection = (topicId: string) => {
    navigate(`/practice?topic=${encodeURIComponent(topicId)}`);
  };
  

  return (
    <div>
      <h1>选择一个主题</h1>
      <button onClick={() => handleTopicSelection('环保')}>环保</button>
      <button onClick={() => handleTopicSelection('体育')}>体育</button>
      <button onClick={() => handleTopicSelection('科技')}>科技</button>
      <button onClick={() => handleTopicSelection('公共意识')}>公共意识</button>
      <button onClick={() => handleTopicSelection('教育')}>教育</button>
    </div>
  )
}

export default TopicSelectionPage