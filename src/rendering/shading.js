import { vec3 } from 'gl-matrix'

const initShading = (gl) => {
  const a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  const u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
  const u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection');
  const u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
  const u_AmbientLightColor = gl.getUniformLocation(gl.program, 'u_AmbientLightColor');
  const lightDirection = vec3.normalize(vec3.create(), vec3.set(vec3.create(), 1, 0.5, 1.2));
  gl.vertexAttrib3f(a_Color, 1, 1, 1);
  gl.uniform3f(u_AmbientLightColor, 0.1, 0.1, 0.1);
  gl.uniform3f(u_LightColor, 1, 1, 1);
  gl.uniform3fv(u_LightDirection, lightDirection);
  gl.uniform3f(u_LightPosition, 2.3, 4.0, 3.5);
}

export {
  initShading
}