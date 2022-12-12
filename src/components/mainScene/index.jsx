import React, { useRef, useEffect, useState } from 'react';
import { Scene } from 'three';
import { OrbitControls, useGLTF } from '@react-three/drei';
import gsap from 'gsap';

import GachaMachine from '../gacha';
import { GachaData } from '../../utils/gachaData';
import Floor from '../floor';
import Atom from '../atom';
import Cloner from '../cloner';
import { ClonerData } from '../../utils/clonerData'

const MainSceneComponent = ({exitEvent}) => {

  const { nodes, materials, scene } = useGLTF('/asset/model/gacha_2.glb');   // load model

  const camera = useRef();    // select camera in OrbitControls
  const [viewerType, setViewerType] = useState('zoom-out');   // view mode hook

  const atomObj         = nodes['Atom_Array1'].children[0];
  const gachaScreenObj  = nodes['Null6'].children[0].children[0];
  const gachaScreenMat  = materials['Mat'];
  const gachaBackObj    = nodes['Null6'].children[1];
  // const gachaBackMat    = scene.children[2].children[5].children[1].material;
  const gachaFrontObj   = nodes['Null6'].children[2];
  // const gachaFrontMat   = scene.children[2].children[5].children[2].material;
  
  useEffect(() => {
    // console.log("cloner ===> ",nodes['Cloner'].children[0]);
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
      {/* <primitive object={scene} >
        <mesh />
      </primitive> */}
      <Atom atomObj = {atomObj} />
      {
        ClonerData.map((item, index) => (
          <Cloner
            key  = {index + 'cloner'}
            item = {item}
          />
        ))
      }
      {
        GachaData.map((item, index) => (
          <GachaMachine
            key           = {index + 'gacha'}
            item          = {item}
            screenObj     = {gachaScreenObj}
            screenMat     = {gachaScreenMat}
            backObj       = {gachaBackObj}
            // backMat       = {gachaBackMat}
            frontObj      = {gachaFrontObj}
            // frontMat      = {gachaFrontMat}
            viewMode      = {viewerType}
            onClick       = {() => cameraInAnimate(item)}
          />
        ))
      }
      <Floor />
      <OrbitControls
        ref           = {camera}
        // minDistance   = {7500}
        minDistance   = {20500}
        maxDistance   = {20500}
        target        = {[0, 10, 0]}
        enablePan     = {true}
        enableRotate  = {true}
        maxPolarAngle = {Math.PI / 3}
        enableDamping = {true}
        dampingFactor = {0.07}
      />
    </>
  )
}

useGLTF.preload('/asset/model/gacha_2.glb');
export default MainSceneComponent;