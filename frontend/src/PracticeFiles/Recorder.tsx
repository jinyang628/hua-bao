import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
    
    // mic.onstart = () => {
    //   console.log('Mics on')
    // }

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

    console.log(audio);
  
    if (audio) {
      // Make a POST request to the backend API endpoint
      try {
        const response = await axios.post(apiEndpoint, { audio });
        console.log("error arrives here");
        const result = response.data.result;
        console.log(result);
        setSavedAudio(prevSavedAudio => [...prevSavedAudio, result]); // Append the new response to the existing array
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
        <p>{savedAudio[savedAudio.length - 1]}</p>
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