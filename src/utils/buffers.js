export const initBuffers = ({ gl, vertices, program, verticesInfo, indices, isSplitMode = false }) => {
  verticesInfo.forEach(info => {
      let { attrVar, size, stride = 0, offset = 0, vertice } = info;
      let attrLoc = gl.getAttribLocation(program, attrVar);
      if (isSplitMode) {
          // Bind the buffer object to target
          gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
          // Write date into the buffer object
          gl.bufferData(gl.ARRAY_BUFFER, vertice, gl.STATIC_DRAW);
      }
      // Assign the buffer object to attrLoc variable
      gl.vertexAttribPointer(attrLoc, size, gl.FLOAT, false, stride, offset);
      // Enable the assignment to attrLoc variable
      gl.enableVertexAttribArray(attrLoc);
      // gl.bindBuffer(gl.ARRAY_BUFFER, null);
  });
  if (indices) {
      // Write the indices to the buffer object
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  }
}