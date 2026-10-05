import { useState,useEffect } from 'react'
import ImageResult from './components/ImageResult.jsx'
import './App.css'
import * as ort from 'onnxruntime-web';

function App() {
  const [imgState, setImageState] = useState(null)
  const [session, setSession] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);

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
      </form>
      <ImageResult imgSrc = {imgState} session={session}/> 
      </>   
    )}
      
    </>
  )
}

export default App
