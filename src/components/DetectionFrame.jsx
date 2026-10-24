function DetectionFrame({det}){
return (
        <div onClick = {() => alertRes(det)}
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
function alertRes(det){
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
    alert(className);
}
export default DetectionFrame;