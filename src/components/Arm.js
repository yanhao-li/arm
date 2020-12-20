import Canvas from './Canvas'
import { vec3 } from 'gl-matrix'
import vSource from './shaders/arm.vert';
import fSource from './shaders/arm.frag';
import { initBuffers } from '../Utils';

const Arm = () => {


  const camera = {
    position: vec3.set(vec3.create(), 6, 6, 4),
    gaze_direction: vec3.set(vec3.create(), 0, 0, 0),
    up_direction: vec3.set(vec3.create(), 0, 1, 0)
  };

  const draw = (gl) => {

    const triangleVertices = new Float32Array([
      0.0, 0.5,
      -0.5, -0.5,
      0.5, -0.5
    ]);

    initBuffers({
      gl,
      program: gl.program,
      verticesData: [
        {
          attrVar: 'vertPosition',
          vertices: triangleVertices,
          size: 2,
        }
      ],
    });
    
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