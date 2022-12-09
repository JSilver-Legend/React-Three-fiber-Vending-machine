import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Environment } from "@react-three/drei";
import './App.css';
import MainSceneComponent from "./components/mainScene";

function Loading () {
  return (
  <Html>
    <div>Loading...</div>
  </Html>
  );
}

function App() {

  const [canvasClick, setCanvasClick] = useState(false);

  return (
    <Canvas
      id    = 'main-canvas'
      dpr   = {2}      
      style = {{
        backgroundColor: 'black', 
        width:'100vw',
        height: '100vh',
        userSelect: 'none'
      }}
      camera = {{
        position: [0, 0, 500],
        fov: 45,
        far: 300000
      }}
      onClick = {(e) => {
        if(e.target.tagName === 'CANVAS') {
          setCanvasClick(!canvasClick);
        }
      }}
    >
      <Environment preset = 'sunset' />
      <fog attach = "fog" args = {['#000000', 18000, 23000]} />
      <color attach = "background" args = {['#000000']} />
      {/* <ambientLight intensity = {0.25} color = "#0E0E0E"/> */}
      <Suspense fallback = {<Loading />}>
        <MainSceneComponent exitEvent = {canvasClick} />
      </Suspense>
    </Canvas>
  );
}

export default App;
