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

        var isPress = false;
        var old = null;
        canvas.addEventListener('mousedown', function (e){
        isPress = true;
        old = {x: e.offsetX, y: e.offsetY};
        });
        canvas.addEventListener('mousemove', function (e){
        if (isPress) {
            var x = e.offsetX;
            var y = e.offsetY;
            ctx.globalCompositeOperation = 'destination-out';

            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.fill();

            ctx.lineWidth = 20;
            ctx.beginPath();
            ctx.moveTo(old.x, old.y);
            ctx.lineTo(x, y);
            ctx.stroke();

            old = {x: x, y: y};

        }
        });

        canvas.addEventListener('mouseup', function (e){
        isPress = false;
        });
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
            {/* <button
            // TODO: functionality to do undo by CTRL + Z keydown
                // onClick={() => canvasRef.current.undo()}
            >
                UNDO
            </button> */}
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

            {/* <CanvasDraw
                ref={canvasRef}
                lazyRadius={0}
                canvasWidth={600}
                canvasHeight={600}
                brushRadius={brushSize}
                brushColor={eraseMode ? 'white' : 'black'}
                hideGrid={true}
                imgSrc={maskImageUrl}
            /> */}
            {/* <ReactSketchCanvas
                // style={styles}
                ref={canvasRef}
                width={600}
                height={600}
                strokeWidth={brushSize}
                eraserWidth={brushSize}
                strokeColor="#000"
            /> */}
            <canvas
                ref={canvasRef}
            >
            </canvas>
        </main>
    );
};