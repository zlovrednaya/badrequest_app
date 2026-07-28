import React, {useState, useRef, useEffect} from "react";

import { PiPencilCircleLight } from "react-icons/pi";
import { IoIosCloseCircle } from "react-icons/io";
import { PiPalette } from "react-icons/pi";

import { GrClearOption } from "react-icons/gr";

import '../choresApp.css';
import './DrawItem.css';
type DrawItemProps = {
    actions: any,
};

export default function DrawItem({actions}: DrawItemProps ) {

    const canvasReference = useRef<HTMLCanvasElement | null>(null);
    const contextReference = useRef<CanvasRenderingContext2D | null>(null);

    const [isPressed, setIfPressed] = useState(false);
    const [isVisiblePenSize, setIsVisiblePenSize] = useState(false);
    const [isVisibleColorPalette, setIsVisibleColorPalette] = useState(false);
    const [circleSize, setCircleSize] = useState(10);
    const [penColor, setPenColor] = useState('#000000');

    const beginDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if(!contextReference.current) return;
        contextReference.current.beginPath();
        contextReference.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIfPressed(true);
        console.log(e);
    };
    const endDraw = () => {
        if(!contextReference.current) return;
        contextReference.current.closePath();
        setIfPressed(false);
    };
    const updateDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if(!isPressed || !contextReference.current) return;
        contextReference.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        contextReference.current.stroke();
    };

    const changeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!canvasReference.current) return;
        const canvas = canvasReference.current;
        const context = canvas.getContext("2d");
        if (!context) return;
        const sizeValue = Number(e.currentTarget.value);
        context.lineWidth = sizeValue;
        setCircleSize(sizeValue / 2);
    };

    const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!canvasReference.current) return;
        const canvas = canvasReference.current;
        const context = canvas.getContext("2d");
        if (!context) return;
        const color = e.currentTarget.value;
        setPenColor(color);
        context.strokeStyle = color;
    };
    const clearCanvas = () => {
        if (!canvasReference.current) return;

        const canvas = canvasReference.current;
        const context = canvas.getContext("2d");

        if (!context) return;
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

    };

    const handleSave = () => {
        if (!canvasReference.current) return;
        const drawing = canvasReference.current.toDataURL();

        actions.chore.saveChore({drawing: drawing});
    };

    useEffect(() => {
        const canvas = canvasReference.current;
        if (!canvas) return;
        canvas.width = 400;
        canvas.height = 300;

        const context = canvas.getContext("2d");
        if (!context) return;
        context.lineCap = "round";
        context.lineWidth = 5;
        context.strokeStyle = penColor;

        contextReference.current = context;
    },[]);

    return (
        <div className="overlay-form">
            <div className="chores-form draw-item chores-item-add-edit">
                <div className="chores-form-header chores-item-header">
                    <span className=" chores-form-header-title chores-item-header-title">Draw</span>
                    <div className="close-form" onClick={()=>actions.form.closeForm()}>
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
                <div className="canvas-properties">
                { isVisiblePenSize && (
                    <div className="draw-item-setting-size">
                        <div className="size-value-image">
                            <svg xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50%" cy="50%" r={circleSize} fill={penColor} />
                            </svg>
                        </div>
                        <div className="size-value-left">1</div>
                        <input type="range" min="1" max="20" onChange={changeSize}></input>
                        <div className="size-value-right">20</div>
                        
                    </div>
                    )
                }
                { isVisibleColorPalette && (
                    <div className="draw-item-setting-color">
                        <input type="color" id="favcolor" name="favcolor" onChange={changeColor}></input>
                    </div> )
                }
                </div>
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
        </div>
    );
 }