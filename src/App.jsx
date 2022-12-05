import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import './App.css';
import MainSceneComponent from "./components/mainScene";

function App() {

  const [canvasClick, setCanvasClick] = useState(false);

  return (
    <Canvas
      dpr={2}      
      style = {{
        backgroundColor: 'black', 
        width:'100vw',
        height: '100vh'
      }}
      camera = {{
        position: [0, 0, 500],
        fov: 45,
        far: 50000
      }}
      onClick = {(e)=>{
        if(e.target.tagName === 'CANVAS') {
          setCanvasClick(!canvasClick);
        }
      }}
    >
      <MainSceneComponent exitEvent={canvasClick} />
    </Canvas>
  );
}

export default App;
