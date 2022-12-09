import React, { useRef, useEffect, useState } from 'react';
import {  OrbitControls, useGLTF } from '@react-three/drei';
import gsap from 'gsap';

import { GachaData } from '../../utils/data';
import GachaMachine from '../gacha';
import Floor from '../floor';
import Atom from '../atom';
// import Cloner from '../cloner';

const MainSceneComponent = ({exitEvent}) => {

  const { nodes, scene } = useGLTF('/asset/model/gacha_2.glb');   // load model

  const camera = useRef();    // select camera in OrbitControls
  const [viewerType, setViewerType] = useState('zoom-out');   // view mode hook

  const atomObj         = nodes['Atom_Array1'].children[0];
  const gachaScreenObj  = nodes['Null6'].children[0].children[0];
  const gachaBackObj    = nodes['Null6'].children[1];
  const gachaFrontObj   = nodes['Null6'].children[2];

  //params
  useEffect(() => {
    console.log("nodes ===> ", atomObj);
  }, [nodes]);

  /**
   * 
   * Camera View Mode------------------------------
   * 
   * @param
   */

  // camera outside mode change by `exitEvent` props from `App component`
  useEffect(() => {
    if(viewerType === 'zoom-in') {
      cameraOutAnimate();
    }
    // eslint-disable-next-line
  }, [exitEvent]);    

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
      <pointLight
        position  = {[0, 0, 100]}
        color     = {0xffffff}
        intensity = {2}
      />
      <Floor />
      <Atom atomObj = {atomObj} />
      {/* <Cloner scene={scene} /> */}
      {
        GachaData.map((item, index) => (
          <GachaMachine
            key           = {index+'gacha'}
            item          = {item}
            screenObj     = {gachaScreenObj}
            backObj       = {gachaBackObj}
            frontObj      = {gachaFrontObj}
            viewMode      = {viewerType}
            onClick = {() => cameraInAnimate(item)}
          />
        ))
      }
      <OrbitControls
        ref           = {camera}
        minDistance   = {7500}
        maxDistance   = {10500}
        target        = {[0, 10, 0]}
        enablePan     = {true}
        enableRotate  = {true}
        maxPolarAngle = {Math.PI / 2.2}
        enableDamping = {true}
        dampingFactor = {0.07}
      />
    </>
  )
}

useGLTF.preload('/asset/model/gacha_2.glb');
export default MainSceneComponent;