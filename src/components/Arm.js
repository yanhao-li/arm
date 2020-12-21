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

  const [ angle, setAngle ] = useState({
    step: 3.0,
    arm1: 90,
    joint1: 45.0,
    joint2: 0,
    joint3: 0
  });

  const requestRef = useRef();

  const [gl, setGl] = useState(null);

  const { vertices, normals, indices } = scene;

  useEffect(() => {
    if (gl) {
      requestRef.current = requestAnimationFrame(() => draw(gl, mouse, angle));
    }
  }, [mouse, gl, angle])

  // Will be called when canvas ready
  const init = (gl) => {
    setGl(gl);
    initShading(gl);
    initBuffers(gl, gl.program, vertices, normals, indices);
    // Set the clear color and enable the depth test
    gl.clearColor(1, 1, 1, 1.0);
    gl.enable(gl.DEPTH_TEST);
    document.addEventListener("keydown", handleKeyDown);
  }

  const handleKeyDown = (e) => {
    e.preventDefault();
    const maxAngle = 120;
    const { keyCode } = e;
    switch (keyCode) {
      // up arrow
      case 38:
        setAngle(prevState => {
          if (prevState.joint1 > -maxAngle) {
            return {
              ...prevState,
              joint1: prevState.joint1 - prevState.step
            }
          } else {
            return prevState
          }
        })
        break;
      // down arrow
      case 40:
        setAngle(prevState => {
          if (prevState.joint1 < maxAngle) {
            return {
              ...prevState,
              joint1: prevState.joint1 + prevState.step
            }
          } else {
            return prevState
          }
        })
        break;
      // right arrow
      case 39:
        setAngle(prevState => {
          return {
            ...prevState,
            arm1: prevState.arm1 + prevState.step
          }
        })
        break;
      // left arrow
      case 37:
        setAngle(prevState => {
          return {
            ...prevState,
            arm1: prevState.arm1 - prevState.step
          }
        })
        break;
      // r
      case 82:
        setAngle(prevState => {
          return {
            ...prevState,
            joint2: prevState.joint2 + prevState.step
          }
        })
        break;
      // e
      case 69:
        setAngle(prevState => {
          return {
            ...prevState,
            joint2: prevState.joint2 - prevState.step
          }
        })
        break;
      // a
      case 65:
        setAngle(prevState => {
          if (prevState.joint3 < 30) {
            return {
              ...prevState,
              joint3: prevState.joint3 + prevState.step
            }
          } else {
            return prevState
          }
        })
        break;
      // s
      case 83:
        setAngle(prevState => {
          if (prevState.joint3 > -30) {
            return {
              ...prevState,
              joint3: prevState.joint3 - prevState.step
            }
          } else {
            return prevState
          }
        })
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