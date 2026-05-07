import React, {useState, useRef, useEffect} from "react";

import { PiPencilCircleLight } from "react-icons/pi";
import { IoIosCloseCircle } from "react-icons/io";
import { PiPalette } from "react-icons/pi";

import { GrClearOption } from "react-icons/gr";

import '../choresApp.css';
import './DrawItem.css';

export default function DrawItem({onClose}) {

    const canvasReference = useRef();
    const contextReference = useRef();

    const [isPressed, setIfPressed] = useState(false);
    const [isVisiblePenSize, setIsVisiblePenSize] = useState(false);
    const [isVisibleColorPalette, setIsVisibleColorPalette] = useState(false);
    const [circleSize, setCircleSize] = useState(10);

    const beginDraw = (e) => {
        contextReference.current.beginPath();
        contextReference.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIfPressed(true);
        console.log(e);
    };
    const endDraw = () => {
        contextReference.current.closePath();
        setIfPressed(false);
    };
    const updateDraw = (e) => {
        if(!isPressed) return;
        contextReference.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        contextReference.current.stroke();
    };

    const changeSize = (e) => {
        debugger;
        const canvas = canvasReference.current;
        const context = canvas.getContext("2d");
        let sizeValue = e.currentTarget.value;
        context.lineWidth = sizeValue;
        setCircleSize(sizeValue/2);
    };

    const changeColor = (e) => {
        const canvas = canvasReference.current;
        const context = canvas.getContext("2d");
        context.strokeStyle = e.currentTarget.value;
    };
    const clearCanvas = () => {
        const canvas = canvasReference.current;
        const context = canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

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

    useEffect(() => {
        const canvas = canvasReference.current;
        canvas.width = 400;
        canvas.height = 300;

        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.lineWidth = 5;
        context.strokeStyle = "black";

        contextReference.current = context;
    },[]);

    return (
        <div className="chores-form draw-item chores-item-add-edit">
            <div className="chores-form-header chores-item-header">
                <span className=" chores-form-header-title chores-item-header-title">Draw</span>
                <div className="close-form" onClick={onClose}>
                    <IoIosCloseCircle />
                </div>
            </div>
            <hr />
            <div className="draw-item-menu">
                <div className="draw-item-menu-item" onClick={()=>{setIsVisiblePenSize(!isVisiblePenSize)}}>
                    <PiPencilCircleLight />
                </div>
                <div className="draw-item-menu-item" onClick={()=>{setIsVisibleColorPalette(!isVisibleColorPalette)}}>
                    <PiPalette />
                </div>
                <div className="draw-item-menu-item-clear" onClick={clearCanvas}>
                    <GrClearOption />
                    <span>Clear</span>
                </div>
            </div>
            { isVisiblePenSize && (
                <div className="draw-item-setting-size">
                    <div className="size-value-left">1</div>
                    <input type="range" min="1" max="20" onChange={changeSize}></input>
                    <div className="size-value-right">20</div>
                    <div className="size-value-image">
                        <svg xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50%" cy="50%" r={circleSize} fill="black" />
                        </svg>
                    </div>
                </div>
                )
            }
            { isVisibleColorPalette && (
                <div className="draw-item-setting-color">
                    <input type="color" id="favcolor" name="favcolor" value="#000000" onChange={changeColor}></input>
                </div> )
            }
            <canvas id="canvas"
                ref={canvasReference}
                onMouseDown={beginDraw}
                onMouseMove={updateDraw}
                onMouseUp={endDraw}
            />
            <div className="chores-form-footer chores-item-footer" onClick={handleSave}>
                <button>Save</button>
            </div>
        </div>
    );
 }