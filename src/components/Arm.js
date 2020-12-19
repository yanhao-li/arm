import { useEffect } from 'react';
import Canvas from './Canvas'
import { mat4, vec3 } from 'gl-matrix'
import ArmVert from './shaders/arm.vert';
import ArmFrag from './shaders/arm.frag';

const Arm = () => {


  const camera = {
    position: vec3.set(vec3.create(), 6, 6, 4),
    gaze_direction: vec3.set(vec3.create(), 0, 0, 0),
    up_direction: vec3.set(vec3.create(), 0, 1, 0)
  };

  const draw = (gl) => {

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
    
    const positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');

    gl.vertexAttribPointer(
      positionAttribLocation,
      2,
      gl.FLOAT, 
      gl.FALSE, 
      2 * Float32Array.BYTES_PER_ELEMENT, 
      0);

    gl.enableVertexAttribArray(positionAttribLocation);
    
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  return (
    <Canvas onGlReady={draw}/>
  );
}

export default Arm