import { useRef, useState, useEffect } from 'react';
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faObjectGroup, faMagnifyingGlass, faStopwatch } from '@fortawesome/free-solid-svg-icons';
function SettingMenu({setDrawModeFrame}){
    const [isDetectionFrame, setIsDetectionFrame] = useState(true);
    const [isTimer, setIsTimer] = useState(false);

    return (
        <div className = "side-menu">
        <div className = "nav-bar">
          <div className="setting-header">
          <FontAwesomeIcon icon={faGear} spin />
          </div>
          {isDetectionFrame ? (
            <>
            <div className = "nav-btn-1" style = {{border: "2px solid white", boxShadow: "0 0 8px white" }} >
              <FontAwesomeIcon icon={faObjectGroup}/>
            </div>
            <div className = "nav-btn-2" onClick = {() => {setIsDetectionFrame(false); setDrawModeFrame(false);}}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            </>
          ):(
            <>
            <div className = "nav-btn-1" onClick = {() => {setIsDetectionFrame(true); setDrawModeFrame(true);}}>
              <FontAwesomeIcon icon={faObjectGroup}/>
            </div>
            <div className = "nav-btn-2" style = {{border: "2px solid white", boxShadow: "0 0 8px white" }}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            </>
          )}
          {isTimer? (
            <div className = "nav-btn-3" style = {{border: "2px solid white", boxShadow: "0 0 8px white" }} onClick = {() => {setIsTimer(false)}}>
              <FontAwesomeIcon icon={faStopwatch} />
            </div>
          ) 
          :
          (
            <div className = "nav-btn-3" onClick = {() => {setIsTimer(true)}}>
              <FontAwesomeIcon icon={faStopwatch} />
            </div>
          )
          }
            
        </div>
        </div>
    );

}

export default SettingMenu;