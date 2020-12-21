import Canvas from './Canvas'
import { mat4, vec3 } from 'gl-matrix'
import vSource from './shaders/arm.vert';
import fSource from './shaders/arm.frag';
import { initBuffers } from 'utils/buffers';
import scene from '../scene';

const Arm = () => {
  const { camera, vertices, normals, indices } = scene;
  const near = 1, far = 300;

  // Will be called when canvas ready
  const draw = (gl) => {
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

    const u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
    const u_ModalMatrix = gl.getUniformLocation(gl.program, 'u_ModalMatrix');
    const { canvas } = gl;
    const u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
    const viewMatrix = mat4.lookAt(mat4.create(), camera.position, camera.gaze_direction, camera.up_direction);
    const perspectiveMatrix = mat4.perspective(mat4.create(), Math.PI/180 * 50, canvas.width/canvas.height, near, far);
    let viewProjMatrix = mat4.multiply(mat4.create(), perspectiveMatrix, viewMatrix);
    
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

    // Clear color and depth buffer
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  return (
    <Canvas
      onGlReady={draw}
      vSource={vSource}
      fSource={fSource}/>
  );
}

export default Arm