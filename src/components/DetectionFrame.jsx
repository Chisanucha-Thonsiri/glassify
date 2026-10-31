import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import InfoOverlay from './InfoOverlay.jsx';
import { useRef, useState } from 'react';
import '../App.css'
function DetectionFrame({det, drawModeFrame}){
    const [showOverlay, setOverlay] = useState(null);
    
    const centerX = det.x_min + (det.w / 2);
    const centerY = det.y_min + (det.h / 2);
return <>{drawModeFrame ? (
        <div onClick = {() => alertRes(det, setOverlay)}
            style={{
                position: 'absolute',
                left: `${det.x_min}px`,
                top: `${det.y_min}px`,
                width: `${det.w}px`,
                height: `${det.h}px`,
                border: '3px solid #00FF00',
                cursor: 'pointer'
            }}
        >
            <span style={{
                backgroundColor: '#00FF00',
                color: 'black',
                padding: '2px 4px',
                fontSize: '12px',
                fontWeight: 'bold',
                position: 'absolute',
                top: '-20px',
                left: '-3px'
            }}>
                Class {det.class_id}
            </span>
        </div>
    ):(
       <div onClick={() => alertRes(det,setOverlay)}
                    style={{
                        position: 'absolute',
                        left: `${centerX}px`,
                        top: `${centerY}px`,
                        transform: 'translate(-50%, -50%)', 
                        cursor: 'pointer',
                        color: '#0096B8'
                    }}
                >
                    <FontAwesomeIcon className = "magnify_glass" icon={faMagnifyingGlass} size="lg" bounce />
                </div> 
    )}
    {showOverlay == null ? <></> : 
    <InfoOverlay showOverlay = {showOverlay} setOverlay={setOverlay} />}
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
    setOverlay(className);
}
export default DetectionFrame;