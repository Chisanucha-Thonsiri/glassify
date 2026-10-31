function InfoOverlay({showOverlay, setOverlay}){
    const glassware = showOverlay;
    return <>
    <div className = "overlay">
        <p>Test Overlay</p>
        <button onClick = {() => {setOverlay(null)}}>X</button>
    </div>
    
    </>
}
export default InfoOverlay;