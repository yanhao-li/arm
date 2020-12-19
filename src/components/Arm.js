import Canvas from './Canvas'
import { mat4, vec3 } from 'gl-matrix'
import { useCanvasContext } from '../CanvasContext';

const Arm = () => {

  const canvas = useCanvasContext();

  const camera = {
    position: vec3.set(vec3.create(), 6, 6, 4),
    gaze_direction: vec3.set(vec3.create(), 0, 0, 0),
    up_direction: vec3.set(vec3.create(), 0, 1, 0)
  };

  const draw = () => {
    
  }



  return (
    <Canvas />
  );
}

export default Arm