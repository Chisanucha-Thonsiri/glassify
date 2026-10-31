import glasswares  from '../data/glasswares';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCircleExclamation, faCirclePlay, faFlask } from '@fortawesome/free-solid-svg-icons';
function InfoOverlay({showOverlay, setOverlay}){
    const data = glasswares[showOverlay];
return (
        <div className="overlay">
            <div className="overlay-header">
                {/*<div className="overlay-header-text">
                    <h2 style={{ margin: 0, color: '#333' }}>{data.nameTH}</h2>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>{data.nameEN}</p>
                </div>*/}
                <div className="overlay-header-text">
                    <FontAwesomeIcon icon={faFlask} />
                    <h2 style={{ margin: 0, color: '#ffffff' }}>ข้อมูลเครื่องแก้ว</h2>
                </div>
                <button className="close-btn" onClick={() => setOverlay(null)}>
                    <FontAwesomeIcon icon={faXmark} size="xl" />
                </button>
            </div>

            <div className="overlay-content">
                <h3>=== {data.nameTH} ===</h3>
                <img 
                src={`https://placehold.co/320x320?text=${data.nameEN.replace(/\s+/g, '+')}`} 
                alt={data.nameEN} 
                className="glassware-img" 
                />
                <div className="type-badge">
                    <FontAwesomeIcon icon={faFlask} /> <span>{data.type}</span>
                </div>

                <h3>คำอธิบาย</h3>
                <p>{data.desc}</p>

                <h3>วิธีใช้งาน</h3>
                <ul className="usage-list">
                    {data.usageStep.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ul>

                <div className="caution-box">
                    <FontAwesomeIcon icon={faCircleExclamation} className="caution-icon" />
                    <div>
                        <strong>ข้อควรระวัง:</strong>
                        <p style={{ margin: 0 }}>{data.caution}</p>
                    </div>
                </div>

                <a href={data.guideVideo} target="_blank" rel="noreferrer" className="video-btn">
                    <FontAwesomeIcon icon={faCirclePlay} size="lg" /> ดูวิดีโอสาธิต
                </a>
            </div>
        </div>
    );
}
export default InfoOverlay;