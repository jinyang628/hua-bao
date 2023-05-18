import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ConversationUI from './ConversationUI';
import '../App.css';





function PracticePage() {
  

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get('topic');

  // Render the relevant content based on the selected topic
  let content;
  switch (topic) {
    case '环保':
      content = <div>环保练习内容</div>;
      break;
    case '体育':
      content = <div>体育练习内容</div>;
      break;
    case '科技':
      content = <div>科技练习内容</div>;
      break;
    case '公共意识':
      content = <div>公共意识练习内容</div>;
      break;
    case '教育':
      content = <div>教育练习内容</div>;
      break;
    default:
      content = <div>请选择一个主题</div>;
      break;
  }
  return (
    <div className="practice-page-container">
      {content}
      <div className="practice-page-content">
        <div className="prompt-container">
          <div className="prompt-label">
            口试视频
          </div>
          <div className="practice-page-image">
          <div className="practice-page-big-image">
            <img src="dummy-photo.png" alt="dummy photo" />
            <div className="caption">This is a caption</div>

          </div>
          <div className="practice-page-small-images">
          <div className="practice-page-small-image">
            <img src="small-image-1.png" alt="small image 1" />
          </div>
          <div className="practice-page-small-image">
            <img src="small-image-2.png" alt="small image 2" />
          </div>
          <div className="practice-page-small-image">
            <img src="small-image-3.png" alt="small image 3" />
          </div>
          </div>
          </div>
        </div>
        <ConversationUI />
      </div>
    </div>
  );
}

export default PracticePage;
