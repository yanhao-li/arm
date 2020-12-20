const loadShader = ({gl, type, source}) => {
  const shader = gl.createShader(gl[type]);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

export const initShader = ({gl, vSource, fSource}) => {
  const vertexShader = loadShader({type: 'VERTEX_SHADER', source: vSource, gl});
  const fragmentShader = loadShader({type: 'FRAGMENT_SHADER', source: fSource, gl});

  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('ERROR Linking program!', gl.getProgramInfoLog(program));
    return;
  }

  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error('ERROR validating program!', gl.getProgramInfoLog(program));
    return;
  }

  gl.useProgram(program);
  gl.program = program;
}

export const initBuffers = ({ gl, verticesData, program, indices }) => {
  verticesData.forEach(data => {
    const { attrVar, size, stride = 0, offset = 0, vertices } = data;
    const attrLoc = gl.getAttribLocation(program, attrVar);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.vertexAttribPointer(attrLoc, size, gl.FLOAT, false, stride, offset);
    gl.enableVertexAttribArray(attrLoc);
  });

  if (indices) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  }
}