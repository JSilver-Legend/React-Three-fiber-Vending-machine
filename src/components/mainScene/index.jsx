import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF, Html } from '@react-three/drei';
import gsap from 'gsap';
import SiteComponent from '../site';

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
  const { nodes, materials, scene } = useGLTF('/asset/model/gacha_2.glb');
  const cameraInAnimate = () => {
    camera.current.minAzimuthAngle = -Math.PI;
    camera.current.maxAzimuthAngle = Math.PI;
    if (camera) {
      gsap.to(camera.current, {
        duration: 1,
        onStart: () => {
          camera.current.enablePan = false;
          camera.current.enableRotate = false;
        },
        minAzimuthAngle: 0,
        maxAzimuthAngle: 0,
        minPolarAngle : Math.PI / 2.2,
        maxPolarAngle : Math.PI / 2.2,
        minDistance : 7500,
        maxDistance : 7500,
        onComplete: ()=>{
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
        }
      });
    }
  }
  
  useEffect(() => {
    //-----Bottom pan object move to down
    sourceObject.current.children[0].children[3].position.y -= 100;

    //Atom object ===> sourceObject.current.children[0].children[1]
    //Cloner Object ===> sourceObject.current.children[0].children[0].children
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
      <group name='vendingMachine_1' scale={[100, 100, 100]} position={[0, 400, 3700]} onPointerDown={cameraInAnimate} >
        <mesh
          name='screen_1'
          geometry={nodes.Null6.children[0].children[0].geometry}
          material={materials.Mat}
          position={[-0.012, 2.005, 5.493]}
          rotation={[-Math.PI/2, 0, 0]}
          >
          <Html name='display_1' className='content' position={[0, 0.05, 0]} rotation={[Math.PI/3.55, 0, 0]} scale={[1.6, 1.8, 1]} transform occlude >
            <div className='wrapper'>
              <SiteComponent />
            </div>
          </Html>
        </mesh>
        <mesh
          name='back_1'
          geometry={nodes.Null6.children[1].geometry}
          material={scene.children[2].children[5].children[1].material}
          position={[0.012, 1.388, -5.493]}
          rotation={[-Math.PI/2, 0, 0]} />
        <mesh
          name='front_1'
          geometry={nodes.Null6.children[2].geometry}
          material={scene.children[2].children[5].children[2].material}
          position={[0.012, -2.005, 1.628]}
          rotation={[-Math.PI/2, 0, 0]} />
      </group>
      <Environment
        // preset='sunset'
        files="./asset/env-background/venice_sunset_1k.hdr"
        background
        blur={0.5}
        />
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