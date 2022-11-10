import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";


const MAX_BRUSH_SIZE = 20;
const MIN_BRUSH_SIZE = 2;
const DEFAULT_BRUSH_SIZE = 8;
const BRUSH_SIZE_STEP = 2;

export const Workspace = props => {
    const canvasRef = useRef();
    const [brushSize, setBrushSize] = useState(DEFAULT_BRUSH_SIZE);
    const [mode, setMode] = useState('drawing');

    return (
        <>
            <div>
                MODE: ${mode}
            </div>
            <button
                onClick={() => setMode(mode === 'drawing' ? 'erasing' : 'drawing')}
            >
                {mode === 'drawing' ? 'erasing' : 'drawing'}
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
            <CanvasDraw
                ref={canvasRef}
                erase={true}
                lazyRadius={0}
                canvasWidth={600}
                canvasHeight={600}
                brushRadius={brushSize}
            /> 
        </>
    );
};