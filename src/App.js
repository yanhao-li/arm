import './App.css';
import Arm from './components/Arm';
import { CanvasContextProvider } from './CanvasContext';

function App() {
  
  return (
    <CanvasContextProvider>
      <div className="App">
        <h3>WebGL Robot Arm</h3>
        <Arm />
      </div>
    </CanvasContextProvider>
  );
}

export default App;