import { vec3 } from 'gl-matrix'

const initShading = (gl) => {
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
}

export {
  initShading
}