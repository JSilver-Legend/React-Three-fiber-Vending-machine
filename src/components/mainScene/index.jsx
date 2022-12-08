import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import {  OrbitControls, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import GachaMachine from '../gacha';
import { GachaData } from '../../utils/data';
import Floor from '../floor';

const MainSceneComponent = ({exitEvent}) => {

  const sourceObject = useRef();
  const camera = useRef();
  //Outside click event
  const [viewerType, setViewerType] = useState('zoom-out');
  useEffect(() => {
    if(viewerType === 'zoom-in') {
      cameraOutAnimate();
    }
    // eslint-disable-next-line
  }, [exitEvent]);


  //Load model
  const { nodes, scene } = useGLTF('/asset/model/gacha_2.glb');

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
  
  useEffect(() => {
    //-----Bottom pan object move to down
    sourceObject.current.children[0].children[3].visible = false;
    //-----22st Cloner visible false;
    sourceObject.current.children[0].children[0].children[22].visible = false;
    //-----Gacha Machines visible false;
    sourceObject.current.children[0].children[2].visible = false;

  }, [sourceObject])
  
  useFrame((state) => {
    const timer = state.clock.getElapsedTime();
    
    //-----Atom object Rotation
    if (sourceObject.current.children[0].children[1]) {
      sourceObject.current.children[0].children[1].rotation.y -= 0.005;
    }
    
    //-----Atom object Scale
    if (sourceObject.current.children[0].children[1]) {
      sourceObject.current.children[0].children[1].scale.x = THREE.MathUtils.lerp(sourceObject.current.children[0].children[1].scale.x, Math.abs(Math.sin(timer)), 0.001);
      sourceObject.current.children[0].children[1].scale.y = THREE.MathUtils.lerp(sourceObject.current.children[0].children[1].scale.y, Math.abs(Math.sin(timer)), 0.001);
      sourceObject.current.children[0].children[1].scale.z = THREE.MathUtils.lerp(sourceObject.current.children[0].children[1].scale.z, Math.abs(Math.sin(timer)), 0.001);
    }

    //-----Cloner objects Animation
    for(let i = 0; i < sourceObject.current.children[0].children[0].children.length; i++) {
      sourceObject.current.children[0].children[0].children[i].position.x =
        THREE.MathUtils.lerp(
          (
            //first place
            (i % 5) % 2 === 0 ?
            sourceObject.current.children[0].children[0].children[i].position.x
            :
            sourceObject.current.children[0].children[0].children[i].position.y
          ),
          (
            //last place
            (i % 5) % 2 === 0 ?
            sourceObject.current.children[0].children[0].children[i].position.x
            :
            sourceObject.current.children[0].children[0].children[i].position.y ) + (100 * Math.sin(timer)),
            //step
            0.01 + 0.01 * (i % 5)
          )
    }
  })

  return (
    <>
      <pointLight position={[0, 0, 100]} color={0xffffff} intensity={2} />
      <group name='scene' position={[0, -700, 0]} ref={sourceObject} >
          <primitive object={scene}>
            <mesh />
          </primitive>
      </group>
      <Floor />
      {
        (nodes && scene) &&
        GachaData.map((item, index) => (
          <GachaMachine
            key={index+'gacha'}
            item={item}
            nodes={nodes}
            scene={scene}
            onClick={() => cameraInAnimate(item)}
            viewMode={viewerType}
          />
        ))
      }
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