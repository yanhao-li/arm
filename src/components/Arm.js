import Canvas from './Canvas'
import { mat4, vec3 } from 'gl-matrix'
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
} from 'utils/render'

const Arm = () => {
  const { vertices, normals, indices } = scene;

  // Will be called when canvas ready
  const init = (gl) => {
    // Initialize selected surface
    const a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    const u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
    const u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection');
    const u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
    const u_AmbientLightColor = gl.getUniformLocation(gl.program, 'u_AmbientLightColor');
    const lightDirection = vec3.normalize(vec3.create(), vec3.set(vec3.create(),0.5, 3.0, 4.0));
    gl.vertexAttrib3f(a_Color, 1, 0, 0.7);
    gl.uniform3f(u_AmbientLightColor, 0.2, 0.2, 0.2);
    // Set the light color (white)
    gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
    // Set the light direction (in the world coordinate)
    gl.uniform3fv(u_LightDirection, lightDirection);
    // Set the light direction (in the world coordinate)
    gl.uniform3f(u_LightPosition, 2.3, 4.0, 3.5);

    initBuffers({
        gl,
        isSplitMode: true,
        program: gl.program,
        verticesInfo: [
            {
                attrVar: 'a_Position',
                vertice: vertices,
                size: 3
            },
            {
                attrVar: 'a_Normal',
                vertice: normals,
                size: 3
            },
        ],
        indices
    });

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