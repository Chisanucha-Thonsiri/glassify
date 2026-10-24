function DetectionFrame({det}){
return (
        <div 
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
    );
}
export default DetectionFrame;