import { useState, useEffect } from 'react'
import ImageResult from './components/ImageResult.jsx'
import RealtimeResult from './components/RealtimeResult.jsx';
import SettingMenu from './components/SettingMenu.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
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
        const modelSession = await ort.InferenceSession.create("/model/glassify_V4n-AfterAUG.onnx", {
        executionProviders: ['webgl', 'wasm']
        });
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
        <div className="app-frame">
          <div className="mode-toggle">
              <div 
                className={`toggle-option ${mode === 0 ? 'active' : ''}`} 
                onClick={() => setMode(0)}
              >
                <FontAwesomeIcon icon={faImage} style={{ marginRight: '6px' }} />
                Image Upload
              </div>
              <div 
                className={`toggle-option ${mode === 1 ? 'active' : ''}`} 
                onClick={() => setMode(1)}
              >
                <FontAwesomeIcon icon={faVideo} style={{ marginRight: '6px' }} />
                Real-Time
              </div>
          </div>

          {mode == 0 ? (
            <div className="card-container card-image">
              <div className="viewport-wrapper">
                <SettingMenu drawModeFrame={drawModeFrame} setDrawModeFrame={setDrawModeFrame} />
                {imgState ? (
                  <ImageResult imgSrc={imgState} session={session} drawModeFrame={drawModeFrame} />
                ) : (
                  <label htmlFor="file-upload" className="empty-preview-box">
                    <FontAwesomeIcon icon={faCloudArrowUp} size="2x" style={{ color: 'var(--accent-yellow)', marginBottom: '10px' }} />
                    <span>แตะเพื่อเลือกรูปภาพเครื่องแก้ว</span>
                  </label>
                )}
              </div>

              <form className="controls-form">
                <label htmlFor="file-upload" className="custom-file-btn">
                  <FontAwesomeIcon icon={faImage} style={{ marginRight: '8px' }} />
                  {imgState ? 'เปลี่ยนรูปภาพ' : 'อัปโหลดรูปภาพ'}
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="img_upload_button"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </form>
            </div>
          ) : (
            <div className="card-container">
              <RealtimeResult 
                session={session} 
                drawModeFrame={drawModeFrame} 
                setDrawModeFrame={setDrawModeFrame} 
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App