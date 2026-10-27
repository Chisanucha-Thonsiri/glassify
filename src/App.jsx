import { useState,useEffect } from 'react'
import ImageResult from './components/ImageResult.jsx'
import RealtimeResult from './components/RealtimeResult.jsx';
import './App.css'
import * as ort from 'onnxruntime-web';

function App() {
  const [imgState, setImageState] = useState(null)
  const [session, setSession] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [mode, setMode] = useState(0);

  useEffect( () => {
    const loadModel = async() => {
      try{
        const modelSession = await ort.InferenceSession.create("/model/glassify_V2.onnx");
        //executionProviders: ['webgl', 'wasm'] -> for GPU
        setSession(modelSession);
        setIsModelLoading(false);
        console.log("Model Loaded Successfully");
      }catch(error){
        console.log("Failed Loading Model");
      }
       
    };
    loadModel();
  }
  ,[]);

  const handleImageChange = (event) => {
  const uploaded_img = event.target.files[0]
  if(uploaded_img){
    const img_url = URL.createObjectURL(uploaded_img);
    setImageState(img_url)
  }
  
}
  const handleSubmit = (event) => {
    event.preventDefault();
  }
  return (
    <>
    {isModelLoading? (
      <h1>Loading</h1>
    ):(
      <>
      <h5>Upload Image Here!!</h5>
      <form onSubmit={handleSubmit} >
      <input type = "file" 
      className = "img_upload_button"
      accept="image/*" 
      onChange={handleImageChange}
      />
      <input type = "submit"/>
      {mode == 0?
      <button onClick={() => setMode(1)}>Real-Time Detetcion Mode</button>
      :
      <button onClick={() => setMode(0)}>Image Upload Mode</button>}
      </form>
      <>
      {mode == 0?
      <ImageResult imgSrc = {imgState} session={session}/>
      :
      <RealtimeResult session={session}/>}
      {/*<ImageResult imgSrc = {imgState} session={session}/> */}
      </>
      </>   
    )}
      
    </>
  )
}

export default App
