import { useEffect, useRef } from 'react';

const Canvas = ({onGlReady}) => {
  const canvasEl = useRef();

  useEffect(() => {
    const canvas = canvasEl.current;
    const gl = canvas.getContext("webgl2");
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    onGlReady(gl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas ref={canvasEl} width="800" height="600">
      Your browser does not support canvas
    </canvas>
  );
}

export default Canvas;
