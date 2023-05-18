import React from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import TopicSelectionPage from './TopicSelectionFiles/TopicSelectionPage';
import PracticePage from './PracticeFiles/PracticePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopicSelectionPage />} />
        <Route path="/practice" element={<PracticePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App