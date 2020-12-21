import { useState } from 'react';
import Canvas from './Canvas'
import { mat4 } from 'gl-matrix'
import vSource from './shaders/arm.vert';
import fSource from './shaders/arm.frag';
import { initBuffers } from 'utils/buffers';
import scene from '../scene';
import draw from 'rendering/draw'
import { initShading } from '../rendering/shading';

const Arm = () => {

  const [ mouse, setMouse ] = useState({
    isDragging: false,
    lastX: -1,
    lastY: -1,
    deltaXAngle: 0,
    deltaYAngle: 0
  });

  const { vertices, normals, indices } = scene;

  // Will be called when canvas ready
  const init = (gl) => {
    initShading(gl);
    initBuffers(gl, gl.program, vertices, normals, indices);
    // Set the clear color and enable the depth test
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    draw(gl);
  }

  const handleMouseUp = () => {

  }

  const handleMouseDown = () => {
    
  }

  return (
    <Canvas
      onGlReady={init}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      vSource={vSource}
      fSource={fSource}/>
  );
}

export default Arm