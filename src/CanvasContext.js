import React, { useState, useContext } from 'react';

export const CanvasContext = React.createContext();
export const CanvasUpdateContext = React.createContext();

// custom hook
export const useCanvasContext = () => {
  return useContext(CanvasContext);
}

export const useCanvasUpdateContext = () => {
  return useContext(CanvasUpdateContext);
}

export const CanvasContextProvider = ({ children }) => {

  const [canvas, setCanvas] = useState({
    gl: null
  });

  const updateCanvas = (newCanvas) => {
    setCanvas({
      ...canvas,
      ...newCanvas,
    });
  }

  return (
    <CanvasContext.Provider value={canvas}>
      <CanvasUpdateContext.Provider value={updateCanvas}>
        {children}
      </CanvasUpdateContext.Provider>
    </CanvasContext.Provider>
  )
}