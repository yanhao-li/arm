import { useEffect, useRef } from 'react';
import { initShader } from "utils/shaders";

const Canvas = ({
  onGlReady,
  vSource,
  fSource,
  onMouseUp,
  onMouseDown,
  onMouseMove,
  onMouseLeave
}) => {
  const canvasEl = useRef();

  useEffect(() => {
    const canvas = canvasEl.current;
    const gl = canvas.getContext("webgl2");

    initShader({ gl, vSource, fSource })

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    onGlReady(gl);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasEl}
      width="400"
      height="400"
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      Your browser does not support canvas
    </canvas>
  );
}

export default Canvas;
