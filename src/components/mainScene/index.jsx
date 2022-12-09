import React, { useRef, useEffect, useState } from 'react';
import {  OrbitControls, useGLTF } from '@react-three/drei';
import gsap from 'gsap';

// import { GachaData } from '../../utils/data';
// import GachaMachine from '../gacha';
// import Floor from '../floor';
// import Atom from '../atom';
// import Cloner from '../cloner';

const MainSceneComponent = ({exitEvent}) => {

  const { nodes, scene } = useGLTF('/asset/model/gacha_2.glb'); //load model
  
  const camera = useRef();
  
  const [viewerType, setViewerType] = useState('zoom-out'); 
  useEffect(() => {
    if(viewerType === 'zoom-in') {
      cameraOutAnimate();
    }
    // eslint-disable-next-line
  }, [exitEvent]);


  

  useEffect(() => {
    console.log('parent scene->', scene);
    
    
  }, [scene]);


  //Camera animation
  const cameraInAnimate = (item) => {
    camera.current.minAzimuthAngle = -Math.PI;
    camera.current.maxAzimuthAngle = Math.PI;
    if (camera) {
      gsap.to(camera.current, {
        duration: 1,
        onStart: () => {
          camera.current.enablePan = false;
          camera.current.enableRotate = false;
        },
        minAzimuthAngle: item.rotation[1],
        maxAzimuthAngle: item.rotation[1],
        minPolarAngle : Math.PI / 2.2,
        maxPolarAngle : Math.PI / 2.2,
        minDistance : 7500,
        maxDistance : 7500,
        onComplete: ()=>{
          camera.current.enableZoom = false;
          setViewerType('zoom-in');
        }
      });
    }
  }

  const cameraOutAnimate = () => {
    if (camera) {
      gsap.to(camera.current, {
        duration: 1,
        onStart: () => {
          setViewerType('zoom-out');
        },
        minPolarAngle : Math.PI / 2.7,
        maxPolarAngle : Math.PI / 2.7,
        minAzimuthAngle : -Infinity,
        maxAzimuthAngle : Infinity,
        minDistance : 10500,
        maxDistance : 10500,
        enablePan : true,
        enableRotate : true,
        onComplete: () => {
          camera.current.minDistance = 7500;
          camera.current.maxDistance = 10500;
          camera.current.minPolarAngle = 0;
          camera.current.maxPolarAngle = Math.PI / 2.2;
          camera.current.enableZoom = true;
        }
      });
    }
  }
  
  return (
    <>
      <pointLight position={[0, 0, 100]} color={0xffffff} intensity={2} />
      {/* <Floor /> */}
      {/* <Atom scene={scene} /> */}
      {/* <Cloner scene={scene} /> */}
      {/* {
        GachaData.map((item, index) => (
          <GachaMachine
            key={index+'gacha'}
            item={item}
            nodes={nodes}
            // scene={scene}
            frontMaterial={frontMaterial}
            backMaterial={backMaterial}
            screenMaterial={screenMaterial}
            onClick={() => cameraInAnimate(item)}
            viewMode={viewerType}
          />
        ))
      } */}
      <primitive object={scene}>
        <mesh />
      </primitive>
      <OrbitControls
        ref={camera}
        minDistance = {7500}
        maxDistance = {10500}
        target={[0, 10, 0]}
        enablePan = {true}
        enableRotate = {true}
        maxPolarAngle = {Math.PI / 2.2}
        enableDamping = {true}
        dampingFactor = {0.07}
      />
    </>
  )
}

useGLTF.preload('/asset/model/gacha_2.glb');
export default MainSceneComponent;