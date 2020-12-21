const initBuffer = (gl, program, vertices, attrVar) => {
    const attrLoc = gl.getAttribLocation(program, attrVar);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(attrLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attrLoc);
}

export const initBuffers = (gl, program, positions, normals, indices) => {
    initBuffer(gl, program, positions, 'a_Position');
    initBuffer(gl, program, normals, 'a_Normal');

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
}