import { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const canvasEl = useRef();

  useEffect(() => {
    const canvas = canvasEl.current;
    const gl = canvas.getContext("webgl2");
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  })

  return (
    <div className="App">
      <h3>Arm</h3>
      <canvas ref={canvasEl} width="800" height="600">
        Your browser does not support canvas
      </canvas>
    </div>
  );
}

export default App;
