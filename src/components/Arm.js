import { useEffect } from 'react';
import Canvas from './Canvas'
import { mat4, vec3 } from 'gl-matrix'
import vSource from './shaders/arm.vert';
import fSource from './shaders/arm.frag';

const Arm = () => {


  const camera = {
    position: vec3.set(vec3.create(), 6, 6, 4),
    gaze_direction: vec3.set(vec3.create(), 0, 0, 0),
    up_direction: vec3.set(vec3.create(), 0, 1, 0)
  };

  const draw = (gl) => {

    const triangleVertices = [
      0.0, 0.5,
      -0.5, -0.5,
      0.5, -0.5
    ]

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
    
    const positionAttribLocation = gl.getAttribLocation(gl.program, 'vertPosition');

    gl.vertexAttribPointer(
      positionAttribLocation,
      2,
      gl.FLOAT, 
      gl.FALSE, 
      2 * Float32Array.BYTES_PER_ELEMENT, 
      0);

    gl.enableVertexAttribArray(positionAttribLocation);
    
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  return (
    <Canvas
      onGlReady={draw}
      vSource={vSource}
      fSource={fSource}/>
  );
}

export default Arm