import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import InfoOverlay from './InfoOverlay.jsx';
import { useRef, useState } from 'react';
import '../App.css'
function DetectionFrame({det, drawModeFrame, onOpenOverlay}){
    const [showOverlay, setOverlay] = useState(null);

    
    const centerX = det.x_min + (det.w / 2);
    const centerY = det.y_min + (det.h / 2);
    const classId = det.class_id;
    let color;
    if(classId == 0){
        color = "#00FF00"
    }else if(classId == 1){
        color = "#FF3B30"
    }else if(classId == 2){
        color = "#FFCC00"
    }else if(classId == 3){ 
        color = "#FF2D95"
    }else if(classId == 4){
        color = "#BF5AF2"
    }else{
        color = "#FFFFFF"
    }
return <>{drawModeFrame ? (
        <div onClick={onOpenOverlay}
            style={{
                position: 'absolute',
                left: `${det.x_min}px`,
                top: `${det.y_min}px`,
                width: `${det.w}px`,
                height: `${det.h}px`,
                border: `3px solid ${color}`,
                cursor: 'pointer'
            }}
        >
        </div>
    ):(
       <div onClick={onOpenOverlay}
                    style={{
                        position: 'absolute',
                        left: `${centerX}px`,
                        top: `${centerY}px`,
                        transform: 'translate(-50%, -50%)', 
                        cursor: 'pointer',
                        color: `${color}`
                    }}
                >
                    <FontAwesomeIcon className = "magnify_glass" icon={faMagnifyingGlass} size="lg" bounce />
                </div> 
    )}
    {/*{showOverlay == null ? <></> : 
    <InfoOverlay showOverlay = {showOverlay} setOverlay={setOverlay} />}*/}
</>
}
function alertRes(det,setOverlay){
    const classId = det.class_id;
    //console.log(classId);
    let className;
    if(classId == 0){
        className = "Beaker";
    }else if(classId == 1){
        className = "Erlenmeyer Flask";
    }else if(classId == 2){
        className = "Test Tube";
    }else if(classId == 3){
        className = "Measuring Cylinder";
    }else if(classId == 4){
        className = "Volumetric Flask";
    }else{
        className = "Not found!"
    }
    console.log(className);
    setOverlay(classId);
}
export default DetectionFrame;