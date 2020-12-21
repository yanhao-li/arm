import { mat4, vec3 } from 'gl-matrix';
import { compose } from 'utils/helpers';
import MatrixContext from 'utils/MatrixContext';
import scene from 'scene';

const matrixContext = new MatrixContext();

const angle = {
  step: 3.0,
  arm1: 90,
  joint1: 45.0,
  joint2: 0,
  joint3: 0
};

let gl;

const drawBox = (matrix) => {
  const near = 1, far = 300;
  const { camera } = scene;
  const { canvas } = gl;

  const u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
  const u_ModalMatrix = gl.getUniformLocation(gl.program, 'u_ModalMatrix');
  const u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  const viewMatrix = mat4.lookAt(mat4.create(), camera.position, camera.gaze_direction, camera.up_direction);
  const perspectiveMatrix = mat4.perspective(mat4.create(), Math.PI/180 * 50, canvas.width/canvas.height, near, far);
  let viewProjMatrix = mat4.multiply(mat4.create(), perspectiveMatrix, viewMatrix);
  
  const modelMatrix = matrix.model;

  // Calculate the modelMatrix view project matrix and pass it to u_MvpMatrix
  matrix.mvp = compose(
      matrix => mat4.multiply(matrix, viewProjMatrix, modelMatrix ),
      () => mat4.create()
  )();
  gl.uniformMatrix4fv(u_MvpMatrix, false, matrix.mvp);
  // Calculate the normal transformation matrix and pass it to u_NormalMatrix
  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelMatrix);
  mat4.transpose(normalMatrix, normalMatrix);
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix);
  gl.uniformMatrix4fv(u_ModalMatrix, false, modelMatrix);
  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
}

const baseHeight = 2.0;
const arm1Length = 10.0;
const arm2Length = 10.0;
const palmLength = 2.0;
const fingerLength = 2;

const drawBase = (matrix, mouse) => {
  const modelMatrix = matrix.model;
  mat4.fromTranslation(modelMatrix, vec3.set(vec3.create(), 0, -12, 0));
  mat4.rotateX(modelMatrix, modelMatrix, Math.PI/180 * mouse.deltaXAngle);  // Rotation around x-axis
  mat4.rotateY(modelMatrix, modelMatrix, Math.PI/180 * mouse.deltaYAngle);  // Rotation around y-axis
  matrixContext.save(modelMatrix);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 10, baseHeight, 10));
  drawBox(matrix);
  return matrixContext.restore();
}

const drawArm1 = (matrix) => {
  const modelMatrix = matrix.model;
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, baseHeight, 0.0));  // Move onto the base
  mat4.rotateY(modelMatrix, modelMatrix, Math.PI/180 * angle.arm1);
  matrixContext.save(modelMatrix);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 3, arm1Length, 3));
  drawBox(matrix);
  return matrixContext.restore();
}

const drawArm2 = (matrix) => {
  const modelMatrix = matrix.model;
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, arm1Length, 0.0));
  mat4.rotateZ(modelMatrix, modelMatrix, Math.PI/180 * angle.joint1);
  matrixContext.save(modelMatrix);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 4, arm2Length, 4));
  drawBox(matrix);
  return matrixContext.restore();
}

const drawPalm = (matrix) => {
  const modelMatrix = matrix.model;
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, arm2Length, 0.0));
  mat4.rotateY(modelMatrix, modelMatrix, Math.PI/180 * angle.joint2);
  matrixContext.save(modelMatrix);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 2, palmLength, 6));
  drawBox(matrix);
  
  // Move to the center of the tip of the palm
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, palmLength, 0.0));
  return matrixContext.restore();
}

const drawFinger1 = (matrix) => {
  const modelMatrix = matrix.model;
  matrixContext.save(modelMatrix);
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, 0, fingerLength));
  mat4.rotateX(modelMatrix, modelMatrix, Math.PI/180 * angle.joint3);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 1, fingerLength, 1));
  drawBox(matrix);
  return matrixContext.restore();
}

const drawFinger2 = (matrix) => {
  const modelMatrix = matrix.model;
  matrixContext.save(modelMatrix);
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, 0, -fingerLength));
  mat4.rotateX(modelMatrix, modelMatrix, -Math.PI/180 * angle.joint3);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 1, fingerLength, 1));
  drawBox(matrix);
  return matrixContext.restore();
}

const draw = (g, mouse) => {
  gl = g;

  const matrix = {
    model: mat4.create(),
    mvp: mat4.create()
  };

  // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  matrix.model = drawBase(matrix, mouse);
  matrix.model = drawArm1(matrix);
  matrix.model = drawArm2(matrix);
  matrix.model = drawPalm(matrix);
  matrix.model = drawFinger1(matrix);
  matrix.model = drawFinger2(matrix);
}

export default draw;