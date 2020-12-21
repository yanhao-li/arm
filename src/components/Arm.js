import Canvas from './Canvas'
import { mat4 } from 'gl-matrix'
import vSource from './shaders/arm.vert';
import fSource from './shaders/arm.frag';
import { initBuffers } from 'utils/buffers';
import scene from '../scene';
import { 
  drawBase,
  drawArm1,
  drawArm2,
  drawPalm,
  drawFinger1,
  drawFinger2
} from 'rendering/draw'
import { initShading } from '../rendering/shading';

const Arm = () => {
  const { vertices, normals, indices } = scene;

  // Will be called when canvas ready
  const init = (gl) => {
    initShading(gl);
    initBuffers(
        gl,
        gl.program,
        vertices,
        normals,
        indices
    );

    // Set the clear color and enable the depth test
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    draw(gl);
  }

  const draw = (gl) => {
    const matrix = {
      model: mat4.create(),
      mvp: mat4.create()
    };

    // Clear color and depth buffer
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    matrix.model = drawBase({gl, matrix});
    matrix.model = drawArm1({gl, matrix});
    matrix.model = drawArm2({gl, matrix});
    matrix.model = drawPalm({gl, matrix});
    matrix.model = drawFinger1({gl, matrix});
    matrix.model = drawFinger2({gl, matrix});
  }

  return (
    <Canvas
      onGlReady={init}
      vSource={vSource}
      fSource={fSource}/>
  );
}

export default Arm