import { mat4, vec3 } from 'gl-matrix';
import { compose } from '../utils/helpers';
import MatrixContext from '../utils/MatrixContext';
import scene from '../scene';

const matrixContext = new MatrixContext();

let matrix = {
  model: mat4.create(),
  mvp: mat4.create()
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

  matrix.mvp = compose(
      matrix => mat4.multiply(matrix, viewProjMatrix, modelMatrix ),
      () => mat4.create()
  )();
  gl.uniformMatrix4fv(u_MvpMatrix, false, matrix.mvp);
  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelMatrix);
  mat4.transpose(normalMatrix, normalMatrix);
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix);
  gl.uniformMatrix4fv(u_ModalMatrix, false, modelMatrix);
  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
}

const baseHeight = 1.0;
const arm1Length = 10.0;
const arm2Length = 15.0;
const palmLength = 1.0;
const fingerLength = 3;

const drawBase = (mouse) => {
  let {model: modelMatrix} = matrix;
  mat4.fromTranslation(modelMatrix, vec3.set(vec3.create(), 0, -12, 0));
  mat4.rotateX(modelMatrix, modelMatrix, Math.PI/180 * mouse.deltaXAngle);
  mat4.rotateY(modelMatrix, modelMatrix, Math.PI/180 * mouse.deltaYAngle);
  matrixContext.save(modelMatrix);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 10, baseHeight, 10));
  drawBox(matrix);
  return matrixContext.restore();
}

const drawArm1 = (angle) => {
  const modelMatrix = matrix.model;
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, baseHeight, 0.0));
  mat4.rotateY(modelMatrix, modelMatrix, Math.PI/180 * angle.arm1);
  matrixContext.save(modelMatrix);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 3, arm1Length, 3));
  drawBox(matrix);
  return matrixContext.restore();
}

const drawArm2 = (angle) => {
  const modelMatrix = matrix.model;
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, arm1Length, 0.0));
  mat4.rotateZ(modelMatrix, modelMatrix, Math.PI/180 * angle.joint1);
  matrixContext.save(modelMatrix);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 2, arm2Length, 2));
  drawBox(matrix);
  return matrixContext.restore();
}

const drawPalm = (angle) => {
  const modelMatrix = matrix.model;
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, arm2Length, 0.0));
  mat4.rotateY(modelMatrix, modelMatrix, Math.PI/180 * angle.joint2);
  matrixContext.save(modelMatrix);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 2, palmLength, 6));
  drawBox(matrix);
  return matrixContext.restore();
}

const drawFinger1 = (angle) => {
  const modelMatrix = matrix.model;
  // Move to the center of the tip of the palm
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, palmLength, 0.0));

  matrixContext.save(modelMatrix);
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, 0, fingerLength - 0.5));
  mat4.rotateX(modelMatrix, modelMatrix, Math.PI/180 * angle.joint3);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0.5, fingerLength, 0.5));
  drawBox(matrix);
  
  return matrixContext.restore();
}

const drawFinger2 = (angle) => {
  const modelMatrix = matrix.model;
  matrixContext.save(modelMatrix);
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, 0, -fingerLength + 0.5));
  mat4.rotateX(modelMatrix, modelMatrix, -Math.PI/180 * angle.joint3);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0.5, fingerLength, 0.5));
  drawBox(matrix);
  return matrixContext.restore();
}

const draw = (g, mouse, angle) => {
  gl = g;

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  matrix.model = drawBase(mouse);
  matrix.model = drawArm1(angle);
  matrix.model = drawArm2(angle);
  matrix.model = drawPalm(angle);
  matrix.model = drawFinger1(angle);
  matrix.model = drawFinger2(angle);
}

export default draw;