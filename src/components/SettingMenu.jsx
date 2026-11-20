import { useRef, useState, useEffect } from 'react';
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faObjectGroup, faMagnifyingGlass, faStopwatch } from '@fortawesome/free-solid-svg-icons';

function SettingMenu({drawModeFrame, setDrawModeFrame}){
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        {isOpen ? (
            <div className = "camera-hud-menu">
            <div className = "nav-bar">
              <div className="setting-header" onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faGear} spin />
              </div>
              {drawModeFrame ? (
                <>
                <div className = "nav-btn-1 active-hud" title="Bounding Box">
                  <FontAwesomeIcon icon={faObjectGroup}/>
                </div>
                <div className = "nav-btn-2" title="Magnify Icon" onClick = {() => {setDrawModeFrame(false);}}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                </>
              ):(
                <>
                <div className = "nav-btn-1" title="Bounding Box" onClick = {() => {setDrawModeFrame(true);}}>
                  <FontAwesomeIcon icon={faObjectGroup}/>
                </div>
                <div className = "nav-btn-2 active-hud" title="Magnify Icon">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                </>
              )}
                
            </div>
            </div>
        ) : (
            <div className = "camera-hud-menu">
            <div className = "nav-bar" onClick={() => setIsOpen(true)}>
              <div className="setting-closed" >
              <FontAwesomeIcon icon={faGear} />
              </div>
            </div>
            </div>
        )}
        </>
    );
}

export default SettingMenu;