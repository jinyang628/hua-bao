import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios'; 
import Timer from './Timer'
import logoImage from '../Images/tempLogo.jpg'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'zh-CN'

function Recorder() {

  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false)
  const [audio, setAudio] = useState('')
  const [savedAudio, setSavedAudio] = useState<string[]>([]);
  const apiEndpoint = 'http://localhost:3001/api/process-audio';

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        //do nothing
      }
    }

    mic.onresult = event => {
      let transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      transcript = transcript.replace(/[^\u4e00-\u9fa5]/g, '')
      if (transcript) {
        setAudio(transcript);
        
      }
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveAudio = async () => {
    setIsListening(prevState => !prevState)
    mic.stop()  
    if (audio) {
      // Make a POST request to the backend API endpoint
      const updatedChatHistoryNewInput = [...chatHistory, audio];
      setChatHistory(updatedChatHistoryNewInput);
      try {
        const response = await axios.post(apiEndpoint, { audio });
        const result = response.data.result;
        const updatedChatHistoryNewOutput = [...updatedChatHistoryNewInput, result];
        setChatHistory(updatedChatHistoryNewOutput);
        setSavedAudio(updatedChatHistoryNewOutput); // Append the new response to the existing array (Check if still necessary)
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="conversation-ui-chatbox">
      <div className="logo-container">
        <img src={logoImage} alt="Logo" className="logo-image" />
        <div className="logo-text">华宝</div>
      </div>
      <div className="conversation-ui-messages">
        {chatHistory.map((message, index) => (
          <div key={index} className="message-container">
            {index % 2 === 0 && (
              <FontAwesomeIcon icon={faUser} className="user-image" />
            )}
            <div
              className={`message ${index % 2 === 0 ? 'user-message' : 'api-response'}`}
            >
              {message}
            </div>
            {index % 2 !== 0 && (
              <FontAwesomeIcon icon={faRobot} className="ai-image" />
            )}
          </div>
        ))}
      </div>
      <div className="conversation-ui-input">
        <button className="conversation-ui-input-button microphone-button" 
          onClick={() => setIsListening(prevState => !prevState)}
          disabled={isListening}>
          {/* {"点击此处录音"} */}
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
        
        <div className="conversation-ui-timer-and-button">
          <Timer seconds={300} start={isListening}/>
          <button className="conversation-ui-input-button" 
            onClick={handleSaveAudio} 
            disabled={!isListening}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Recorder