import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { ReactSketchCanvas } from 'react-sketch-canvas';


const MAX_BRUSH_SIZE = 20;
const MIN_BRUSH_SIZE = 2;
const DEFAULT_BRUSH_SIZE = 8;
const BRUSH_SIZE_STEP = 2;

export const Workspace = props => {
    const canvasRef = useRef();
    const [brushSize, setBrushSize] = useState(DEFAULT_BRUSH_SIZE);
    const [eraseMode, setEraseMode] = useState(false);

    return (
        <>
            <div>
                MODE: {eraseMode ? 'ERASING' : 'DRAWING'}
            </div>
            <button
                onClick={() => {
                        canvasRef.current.eraseMode(!eraseMode);
                        setEraseMode(!eraseMode);
                    }
                }
            >
                {eraseMode ? 'DRAW' : 'ERASE'}
            </button>
            <button
            // TODO: functionality to do undo by CTRL + Z keydown
                onClick={() => canvasRef.current.undo()}
            >
                UNDO
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
            {/* <CanvasDraw
                ref={canvasRef}
                erase={true}
                lazyRadius={0}
                canvasWidth={600}
                canvasHeight={600}
                brushRadius={brushSize}
            /> */}
            <ReactSketchCanvas
                // style={styles}
                ref={canvasRef}
                width={600}
                height={600}
                strokeWidth={brushSize}
                eraserWidth={brushSize}
                strokeColor="#000"
            />
        </>
    );
};