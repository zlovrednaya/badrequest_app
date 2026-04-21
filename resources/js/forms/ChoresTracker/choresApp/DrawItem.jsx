import React, {useState, useRef, useEffect} from "react";

import './DrawItem.css';
export default function DrawItem() {

    const canvasReference = useRef();
    const contextReferece = useRef();

    const [isPressed, setIfPressed] = useState(false);
    const beginDraw = (e) => {
        contextReferece.current.beginPath();
        contextReferece.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIfPressed(true);
        console.log(e);
    };
    const endDraw = () => {
        contextReferece.current.closePath();
        setIfPressed(false);
    };
    const updateDraw = (e) => {
        if(!isPressed) return;
        contextReferece.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        contextReferece.current.stroke();
    };
    const handleSave = () => {
        const drawing = canvasReference.current.toDataURL();
        axios( window.location.origin+'/chores/add', {
            method: 'POST', 
            data: JSON.stringify({drawing: drawing}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
        })
        .then(res => {
            debugger;
           
            onClose();
        })
        .catch(err => {
            console.log(err);
            let errors = err.response.data.errors;
            let errorText = err.response.data.message;
        })
    };

    useEffect(()=>{
        const canvas = canvasReference.current;
        canvas.width = 400;
        canvas.height = 400;

        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.lineWidth = 5;
        context.strokeStyle = "black";
        
        contextReferece.current = context;
    },[]);
    return (
        <div className="draw-item">
            <canvas id="canvas"
                ref={canvasReference}
                onMouseDown={beginDraw}
                onMouseMove={updateDraw}
                onMouseUp={endDraw}
            />
            <div className="chores-item-footer" onClick={handleSave}>
                <button>Save</button>
            </div>
        </div>
    );
 }