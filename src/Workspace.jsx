import React, { useEffect, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { ReactSketchCanvas } from 'react-sketch-canvas';


const MAX_BRUSH_SIZE = 20;
const MIN_BRUSH_SIZE = 2;
const DEFAULT_BRUSH_SIZE = 8;
const BRUSH_SIZE_STEP = 2;
const MOCK_RGB_URL = 'https://portalvhdskzpngkvpz6x48.blob.core.windows.net/tangiblee-static-dev/shared/temp-images/item00001.jpeg';
const MOCK_MASK_URL = 'https://portalvhdskzpngkvpz6x48.blob.core.windows.net/tangiblee-static-dev/shared/temp-images/item00001.png';

export const Workspace = props => {
    const canvasRef = useRef();
    const [brushSize, setBrushSize] = useState(DEFAULT_BRUSH_SIZE);
    const [eraseMode, setEraseMode] = useState(false);
    const [rgbImageUrl, setRgbImageUrl] = useState(null);
    const [maskImageUrl, setMaskImageUrl] = useState(null);

    useEffect(() => {
        setRgbImageUrl(MOCK_RGB_URL)
        setMaskImageUrl(MOCK_MASK_URL);
    }, []);

    const [old, setOld] = useState({x: 0, y: 0});
    const [isPress, setIsPress] = useState(false);

    const mouseDown = (e) => {
        setIsPress(true);
        // console.log(e)
        setOld({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
    };

    const mouseMove = e => {
        if (isPress) {
            var canvas = canvasRef.current;
            var ctx = canvas.getContext('2d');
            var x = e.nativeEvent.offsetX;
            var y = e.nativeEvent.offsetY;

            if (eraseMode) {
                ctx.fillStyle = "transparent";
                ctx.strokeStyle = "transparent";
            } else {
                ctx.fillStyle = "black";
                ctx.strokeStyle = "black";
            }
            ctx.beginPath();
            ctx.moveTo(old.x, old.y);
            ctx.lineTo(x, y);
            ctx.lineWidth = 20;
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.fill();
            setOld({x: x, y: y});
        }
    };

    const mouseUp = e => {
        setIsPress(false);
    };

    useEffect(() => {
        if (!canvasRef.current) return;

        var url = maskImageUrl;
        var canvas = canvasRef.current;
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = url;
        img.crossOrigin="anonymous";
        img.onload = function () {
        var width = Math.min(500, img.width);
        var height = img.height * (width / img.width);

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        };
    }, [canvasRef.current]);


    return (
        <main>
            <div>
                MODE: {eraseMode ? 'ERASING' : 'DRAWING'}
            </div>
            <button
                onClick={() => {
                        // canvasRef.current.eraseMode(!eraseMode);
                        setEraseMode(!eraseMode);
                    }
                }
            >
                {eraseMode ? 'DRAW' : 'ERASE'}
            </button>
            <button
                onClick={() => setBrushSize(Math.min(brushSize + BRUSH_SIZE_STEP, MAX_BRUSH_SIZE))}
            >
                BRUSH SIZE +
            </button>
            <button
                onClick={() => setBrushSize(Math.max(brushSize - BRUSH_SIZE_STEP, MIN_BRUSH_SIZE))}
            >
                BRUSH SIZE -
            </button>
            <button
                onClick={() => {
                    const canvas = canvasRef.current;
                    var dataURL = canvas.toDataURL();
                    console.log(dataURL)
                }}
            >
                SEND IMAGE
            </button>

            <div 
                className="container"
                style={{
                    display: 'inline-block',
                    backgroundImage: `url(${MOCK_RGB_URL}`,
                    backgroundSize: 'cover',
                }}
            >
                <canvas
                    ref={canvasRef}
                    onMouseDown={mouseDown}
                    onMouseMove={mouseMove}
                    onMouseUp={mouseUp}
                >
                </canvas>
            </div>
        </main>
    );
};