import { useEffect, useRef } from 'react';
import ArmVert from './components/shaders/arm.vert';
import ArmFrag from './components/shaders/arm.frag';
import './App.css';

function App() {
  const canvasEl = useRef();

  useEffect(() => {
    const canvas = canvasEl.current;
    const gl = canvas.getContext("webgl2");
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, ArmVert);
    gl.shaderSource(fragmentShader, ArmFrag);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('ERROR Linking program!', gl.getProgramInfoLog(program));
      return;
    }

    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
      console.error('ERROR validating program!', gl.getProgramInfoLog(program));
      return;
    }

    const triangleVertices = [
      0.0, 0.5,
      -0.5, -0.5,
      0.5, -0.5
    ]

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
    
    const positionArrribLocation = gl.getAttribLocation(program, 'vertPosition');
    gl.vertexAttribPointer(
      positionArrribLocation,
      2,
      gl.FLOAT, 
      gl.FALSE, 
      2 * Float32Array.BYTES_PER_ELEMENT, 
      0);

    gl.enableVertexAttribArray(positionArrribLocation);
    
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }, [])

  return (
    <div className="App">
      <h3>WebGL Robot Arm</h3>
      <canvas ref={canvasEl} width="800" height="600">
        Your browser does not support canvas
      </canvas>
    </div>
  );
}

export default App;
