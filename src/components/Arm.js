import { useState, useRef, useEffect } from 'react';
import Canvas from './Canvas'
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

  const requestRef = useRef();

  const [gl, setGl] = useState(null);

  const { vertices, normals, indices } = scene;

  const tick = (gl, mouse) => {
    draw(gl, mouse);
  }

  useEffect(() => {
    if (gl) {
      requestRef.current = requestAnimationFrame(() => tick(gl, mouse));
    }
  }, [mouse, gl])

  // Will be called when canvas ready
  const init = (gl) => {
    setGl(gl);
    initShading(gl);
    initBuffers(gl, gl.program, vertices, normals, indices);
    // Set the clear color and enable the depth test
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    document.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => tick(gl, mouse));
  }

  const handleKeyDown = (e) => {
    e.preventDefault();
    const { keyCode } = e;
    switch (keyCode) {
      // up arrow
      case 38:
        break;
      // down arrow
      case 40:
        break;
      // right arrow
      case 39:
        break;
      // left arrow
      case 37:
        break;
      // r
      case 82:
        break;
      // e
      case 69:
        break;
      // a
      case 65:
        break;
      // s
      case 83:
        break;
      default:
        break;
    }
  }

  const handleMouseDown = (e) => {
    setMouse({
      ...mouse,
      isDragging: true,
      lastX: e.clientX,
      lastY: e.clientY
    })
  }

  const handleMouseUp = () => {
    setMouse({
      ...mouse,
      isDragging: false
    });
  }

  const handleMouseMove = (e) => {
    if (mouse.isDragging) {
      const factor = 100 / gl.canvas.height;
      setMouse({
        ...mouse,
        lastX: e.clientX,
        lastY: e.clientY,
        deltaXAngle: mouse.deltaXAngle + factor * (e.clientY - mouse.lastY),
        deltaYAngle: mouse.deltaYAngle + factor * (e.clientX - mouse.lastX)
      })
    }
  }

  return (
    <Canvas
      onGlReady={init}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      vSource={vSource}
      fSource={fSource}/>
  );
}

export default Arm