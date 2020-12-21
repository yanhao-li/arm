import './App.css';
import Arm from './components/Arm';

function App() {
  
  return (
    <div className="App">
      <h3>WebGL Robot Arm</h3>
      <ul>
        <li>Drag to adjust viewport</li>
        <br />
        <li><kbd>E</kbd>: Rotate the palm clockwisely</li>
        <li><kbd>R</kbd>: Rotate the palm counter-clockwisely</li>
        <li><kbd>↑</kbd>: Rise the arm</li>
        <li><kbd>↓</kbd>: Fall the arm</li>
        <li><kbd>←</kbd>: Rotate the base clockwisely</li>
        <li><kbd>→</kbd>: Rotate the base counter-clockwisely</li>
      </ul>
      <br />
      <Arm />
    </div>
  );
}

export default App;