import { useState, useEffect } from 'react'
import ImageResult from './components/ImageResult.jsx'
import RealtimeResult from './components/RealtimeResult.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faObjectGroup, faMagnifyingGlass, faStopwatch, faGear } from '@fortawesome/free-solid-svg-icons';
import './App.css'
import * as ort from 'onnxruntime-web';

function App() {
  const [imgState, setImageState] = useState(null)
  const [session, setSession] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [mode, setMode] = useState(0);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelSession = await ort.InferenceSession.create("/model/glassify_V2.onnx");
        //executionProviders: ['webgl', 'wasm'] -> for GPU
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

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="app-layout">
      {isModelLoading ? (
        <h1 className="loading-text">Loading...</h1>
      ) : (
        <>
        <div className="card-container">
          <h5 className="title-text">Upload Image Here!!</h5>

          <div className="preview-section">
            {mode == 0 ? (
              <ImageResult imgSrc={imgState} session={session} />
            ) : (
              <RealtimeResult session={session} />
            )}
          </div>

          <form className="controls-form" onSubmit={handleSubmit}>
            <input
              type="file"
              className="img_upload_button"
              accept="image/*"
              onChange={handleImageChange}
            />
            <input type="submit" className="submit-btn" />
            
            {mode == 0 ? (
              <button type="button" className="mode-btn" onClick={() => setMode(1)}>
                Real-Time Detection Mode
              </button>
            ) : (
              <button type="button" className="mode-btn" onClick={() => setMode(0)}>
                Image Upload Mode
              </button>
            )}
          </form>
        </div>
        <div className = "side-menu">
        <div className = "nav-bar">
          <div className="setting-header">
          <FontAwesomeIcon icon={faGear} spin />
          </div>
            <div className = "nav-btn-1">
              <FontAwesomeIcon icon={faObjectGroup}/>
            </div>
            <div className = "nav-btn-2">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <div className = "nav-btn-3">
              <FontAwesomeIcon icon={faStopwatch} />
            </div>
        </div>
        </div>
        </>
      )}
    </div>
)
}

export default App