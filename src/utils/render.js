import { mat4, vec3 } from 'gl-matrix'

const drawBox = ({ gl, modelMatrix }) => {
  const {
    webglInfo: {
        gl,
        viewProjMatrix,
        u_MvpMatrix,
        u_NormalMatrix,
        u_ModalMatrix
    }
  } = this;
  // Calculate the modelMatrix view project matrix and pass it to u_MvpMatrix
  matrix.mvp = compose(
      matrix => mat4.multiply(matrix, viewProjMatrix, modelMatrix ),
      () => mat4.create()
  )();
  gl.uniformMatrix4fv(u_MvpMatrix, false, this.matrix.mvp);
  // Calculate the normal transformation matrix and pass it to u_NormalMatrix
  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelMatrix);
  mat4.transpose(normalMatrix, normalMatrix);
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix);
  gl.uniformMatrix4fv(u_ModalMatrix, false, modelMatrix);
  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
}

const base = () => {
  const baseHeight = 2.0;
  mat4.fromTranslation(modelMatrix, vec3.set(vec3.create(), 0, -12, 0));
  mat4.rotateX(modelMatrix, modelMatrix, Math.PI/180 * deltaXAngle);  // Rotation around x-axis
  mat4.rotateY(modelMatrix, modelMatrix, Math.PI/180 * deltaYAngle);  // Rotation around y-axis
  matrixCtx.save(modelMatrix);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 10, baseHeight, 10));
  drawBox(gl, { modelMatrix });
  modelMatrix = matrixCtx.restore();
}

const arm1 = () => {
  // Arm1
  const arm1Length = 10.0; // Length of arm1
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, baseHeight, 0.0));  // Move onto the base
  mat4.rotateY(modelMatrix, modelMatrix, Math.PI/180 * angle.arm1);
  matrixCtx.save(modelMatrix);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 3, arm1Length, 3));
  drawBox(gl, { modelMatrix });
  modelMatrix = matrixCtx.restore();
}

const arm2 = () => {
  const arm2Length = 10.0;
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, arm1Length, 0.0));
  mat4.rotateZ(modelMatrix, modelMatrix, Math.PI/180 * angle.joint1);
  matrixCtx.save(modelMatrix);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 4, arm2Length, 4));
  drawBox(gl, { modelMatrix });
  modelMatrix = matrixCtx.restore();
}

const palm = () => {
  const palmLength = 2.0;
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, arm2Length, 0.0));
  mat4.rotateY(modelMatrix, modelMatrix, Math.PI/180 * angle.joint2);
  matrixCtx.save(modelMatrix);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 2, palmLength, 6));
  drawBox(gl, { modelMatrix });
  modelMatrix = matrixCtx.restore();

  // Move to the center of the tip of the palm
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, palmLength, 0.0));
}

const finger1 = () => {
  const fingerLength = 2;
  matrixCtx.save(modelMatrix);
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, 0, fingerLength));
  mat4.rotateX(modelMatrix, modelMatrix, Math.PI/180 * angle.joint3);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 1, fingerLength, 1));
  drawBox(gl, { modelMatrix });
  modelMatrix = matrixCtx.restore();
}

const finger2 = () => {
  matrixCtx.save(modelMatrix);
  mat4.translate(modelMatrix, modelMatrix, vec3.set(vec3.create(), 0, 0, -fingerLength));
  mat4.rotateX(modelMatrix, modelMatrix, -Math.PI/180 * angle.joint3);
  mat4.scale(modelMatrix, modelMatrix, vec3.set(vec3.create(), 1, fingerLength, 1));
  drawBox(gl, { modelMatrix });
  modelMatrix = matrixCtx.restore();
}

export {
  base,
  arm1,
  arm2,
  palm,
  finger1,
  finger2
}