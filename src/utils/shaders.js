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