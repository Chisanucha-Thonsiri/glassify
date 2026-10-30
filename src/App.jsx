import { useState, useEffect } from 'react'
import ImageResult from './components/ImageResult.jsx'
import RealtimeResult from './components/RealtimeResult.jsx';
import SettingMenu from './components/SettingMenu.jsx';
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
          {mode == 0 ? (
            <div className="card-container">
              <h5 className="title-text">Upload Image Here!!</h5>
              <ImageResult imgSrc={imgState} session={session} drawModeFrame={drawModeFrame} />

              <form className="controls-form" onSubmit={handleSubmit}>
                <input
                  type="file"
                  className="img_upload_button"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <input type="submit" className="submit-btn" />

                <button type="button" className="mode-btn" onClick={() => setMode(1)}>
                  Real-Time Detection Mode
                </button>
              </form>
            </div>
          ) : (
            <div className="card-container">
              <h5 className="title-text">Real-Time Mode!!</h5>
              <RealtimeResult session={session} drawModeFrame={drawModeFrame} />

              <form className="controls-form" onSubmit={handleSubmit}>
                <input
                  type="file"
                  className="img_upload_button"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <input type="submit" className="submit-btn" />

                <button type="button" className="mode-btn" onClick={() => setMode(0)}>
                  Image Upload Mode
                </button>
              </form>
            </div>
          )}
          <SettingMenu setDrawModeFrame={setDrawModeFrame} />
        </>
      )}
    </div>
  )
}

export default App