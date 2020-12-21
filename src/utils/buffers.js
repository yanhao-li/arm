const initBuffer = (gl, program, vertices, attrVar) => {
    const attrLoc = gl.getAttribLocation(program, attrVar);
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // Assign the buffer object to attrLoc variable
    gl.vertexAttribPointer(attrLoc, 3, gl.FLOAT, false, 0, 0);
    // Enable the assignment to attrLoc variable
    gl.enableVertexAttribArray(attrLoc);
    // gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

export const initBuffers = (gl, program, positions, normals, indices) => {
    initBuffer(gl, program, positions, 'a_Position');
    initBuffer(gl, program, normals, 'a_Normal');

    // Write the indices to the buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
}