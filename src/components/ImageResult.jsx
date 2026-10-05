import { useRef } from 'react';
import * as ort from 'onnxruntime-web';

function ImageResult({imgSrc, session}){

    const imageRef = useRef(null);
    const canvasRef = useRef(null);

    const processImage = async () => {
    if (!imageRef.current || !session) return;

    const image = imageRef.current;
    const canvas = canvasRef.current;

    //const ctx = canvas.getContext("2d");
    //Note: This is canvas for og size image
    canvas.width = image.width;
    canvas.height = image.height;
    
    //Note: This id canvas for 640 * 640 but invisible. Used to feed into model
    const aiCanvas = document.createElement('canvas');
    aiCanvas.width = 640;
    aiCanvas.height = 640;
    const aiCtx = aiCanvas.getContext("2d");
    //ctx.drawImage(image, 0, 0, 640, 640);
    aiCtx.drawImage(image, 0, 0, 640, 640);

    //Note: This section is for normalization (Reminder: Attention needed) <!>

    const imagePixelData = aiCtx.getImageData(0, 0, 640, 640).data;
    const float32Data = new Float32Array(3 * 640 * 640);

    for (let i = 0; i < 640 * 640; i++) {
      float32Data[i] = imagePixelData[i * 4] / 255.0; 
      float32Data[i + 640 * 640] = imagePixelData[i * 4 + 1] / 255.0; 
      float32Data[i + 2 * 640 * 640] = imagePixelData[i * 4 + 2] / 255.0; 
    }

    const tensor = new ort.Tensor('float32', float32Data, [1, 3, 640, 640]);
    
    try{
        const feeds = {images: tensor}; //Note: YoloV8 รับข้อมูลผ่าน images เราจึงแปะ tensor เข้าไป
        const results = await session.run(feeds);
        const outputName = session.outputNames[0];
        const output = results[outputName].data;
        //console.log("feed success");
        const displayCtx = canvas.getContext('2d');
      displayCtx.clearRect(0, 0, canvas.width, canvas.height); 
      displayCtx.strokeStyle = "#00FF00"; 
      displayCtx.lineWidth = 3;
      displayCtx.font = "18px Arial";
      displayCtx.fillStyle = "#00FF00";

      const scaleX = image.width / 640;
      const scaleY = image.height / 640;

      const dims = results[outputName].dims; 
      const num_classes = dims[1] - 4; 
      const num_boxes = dims[2];

      for (let i = 0; i < num_boxes; i++) {
        let max_prob = 0;
        let class_id = -1;

        for (let c = 0; c < num_classes; c++) {
            let prob = output[(4 + c) * num_boxes + i];
            if (prob > max_prob) {
                max_prob = prob;
                class_id = c;
            }
        }

        if (max_prob > 0.5) {
            let cx = output[0 * num_boxes + i];
            let cy = output[1 * num_boxes + i];
            let w = output[2 * num_boxes + i];
            let h = output[3 * num_boxes + i];

            let x_min = (cx - w / 2) * scaleX;
            let y_min = (cy - h / 2) * scaleY;
            let box_w = w * scaleX;
            let box_h = h * scaleY;

            displayCtx.strokeRect(x_min, y_min, box_w, box_h);
            displayCtx.fillText(`Class ${class_id} (${(max_prob * 100).toFixed(1)}%)`, x_min, y_min - 5);
        }
    }
    }catch(error){
        console.error(error);
    }
    
  };

    if(!imgSrc){
        return null;
    }
    else{
        return(
            <>
            <div style={{ marginTop: '20px' }}>
            <p>Preview:</p>
            <div style={{ position: 'relative', display: 'inline-block' }}>
          
          <img 
            ref={imageRef} 
            src={imgSrc} 
            alt="Uploaded" 
            width="300" 
            style={{ display: 'block' }}
            onLoad={processImage}
          />
          
          <canvas 
            ref={canvasRef} 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0 
            }} 
          />
          
        </div>
            </div>
            </>
        )
    }
}

function calIOU(box1, box2){ 
  //A เทียบ max ของ min 2ตัว B เทียบ min ของ max 2 ตัว
  const xA = Math.max(box1.x_min, box2.x_min);
  const yA = Math.max(box1.y_min, box2.y_min);
  const xB = Math.min(box1.x_max, box2.x_max);
  const yB = Math.min(box1.y_max, box2.y_max);

  const intersect = Math.max(0, xB - xA) * Math.max(0, yB - yA);
  //union = areabox1 + areabox2 - intersect;
  const areaBox1 = (box1.x_max - box1.x_min) * (box1.y_max - box1.y_min);
  const areaBox2 = (box2.x_max - box2.x_min) * (box2.y_max - box2.y_min);
  const union = areaBox1 + areaBox2 - intersect;
  const iou = intersect / union;
  return iou;
}
export default ImageResult