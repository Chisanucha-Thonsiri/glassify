import { useState, useEffect } from 'react'
import ImageResult from './components/ImageResult.jsx'
import RealtimeResult from './components/RealtimeResult.jsx';
import SettingMenu from './components/SettingMenu.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import './App.css'
import * as ort from 'onnxruntime-web';

function App() {
  const [imgState, setImageState] = useState(null)
  const [session, setSession] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [mode, setMode] = useState(0);
  const [drawModeFrame, setDrawModeFrame] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelSession = await ort.InferenceSession.create("/model/glassify_V2.onnx");
        //executionProviders: ['webgl', 'wasm'] -> for GPU (To be implemented)
        setSession(modelSession);
        setIsModelLoading(false);
        console.log("Model Loaded Successfully");
      } catch (error) {
        console.log("Failed Loading Model");
      }
    };
    loadModel();
  }, []);

  const handleImageChange = (event) => {
    const uploaded_img = event.target.files[0]
    if (uploaded_img) {
      const img_url = URL.createObjectURL(uploaded_img);
      setImageState(img_url)
    }
  }



  return (
    <div className="app-layout">
      {isModelLoading ? (
        <h1 className="loading-text">Loading...</h1>
      ) : (
        <>
          {mode == 0 ? (
            <div className="card-container card-image">
              <div className="mode-toggle">
                  <div 
                    className={`toggle-option ${mode === 0 ? 'active' : ''}`} 
                    onClick={() => setMode(0)}
                  >
                    <FontAwesomeIcon icon={faImage} style={{ marginRight: '5px' }} />
                    Image Upload
                  </div>
                  <div 
                    className={`toggle-option ${mode === 1 ? 'active' : ''}`} 
                    onClick={() => setMode(1)}
                  >
                    <FontAwesomeIcon icon={faVideo} style={{ marginRight: '5px' }} />
                    Real-Time
                  </div>
                </div>
              <ImageResult imgSrc={imgState} session={session} drawModeFrame={drawModeFrame} />

              <form className="controls-form">
                <input
                  type="file"
                  className="img_upload_button"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </form>
            </div>
          ) : (
            <div className="card-container">
              <div className="mode-toggle">
                  <div 
                    className={`toggle-option ${mode === 0 ? 'active' : ''}`} 
                    onClick={() => setMode(0)}
                  >
                    <FontAwesomeIcon icon={faImage} style={{ marginRight: '5px' }} />
                    Image Upload
                  </div>
                  <div 
                    className={`toggle-option ${mode === 1 ? 'active' : ''}`} 
                    onClick={() => setMode(1)}
                  >
                    <FontAwesomeIcon icon={faVideo} style={{ marginRight: '5px' }} />
                    Real-Time
                  </div>
                </div>
              <RealtimeResult session={session} drawModeFrame={drawModeFrame} />
            </div>
          )}
          <SettingMenu setDrawModeFrame={setDrawModeFrame} />
        </>
      )}
    </div>
  )
}

export default App