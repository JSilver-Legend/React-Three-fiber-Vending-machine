import React, { useRef, useEffect, useState } from 'react';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import gsap, { Power2 } from 'gsap';

import { GachaData } from '../../utils/gachaData';
import Floor from '../floor';
import Atom from '../atom';
import Cloner from '../cloner';
import { ClonerData } from '../../utils/clonerData'
import Site from '../site';
import { useFrame } from 'react-three-fiber';

const MainSceneComponent = ({ exitEvent }) => {

  const { nodes, materials, scene } = useGLTF('/asset/model/gacha_2.glb');   // load model

  const camera = useRef();    // select camera in OrbitControls
  let cameraPos = 0;
  const [viewerType, setViewerType] = useState('zoom-out');   // view mode hook

  const atomObj = nodes['Atom_Array1'].children[0];
  const gachaScreenObj = nodes['Null6'].children[0].children[0];
  const gachaScreenMat = materials['Mat'];
  const gachaBackObj = nodes['Null6'].children[1];
  const gachaBackMat = scene.children[2].children[5].children[1].material;
  const gachaFrontObj = nodes['Null6'].children[2];
  const gachaFrontMat = scene.children[2].children[5].children[2].material;

  useFrame((state) => {
    cameraPos = camera.current.getAzimuthalAngle();
    // console.log('angle = ', cameraPos * 180 / Math.PI);
  })


  useEffect(() => {
    // console.log("cloner ===> ",nodes['Cloner'].children[0]);
  }, [nodes]);

  /**
   * 
   * Gacha Machine Object
   * 
   */

  const GachaMachine = ({
    item,
    screenObj,
    screenMat,
    backObj,
    backMat,
    frontObj,
    frontMat,
    viewMode,
    onClick
  }) => {

    return (
      <>
        <group
          name='gachaObj'
          position={item.position}
          rotation={item.rotation}
          scale={[100, 100, 100]}


        >
          <mesh
            name='screen'
            material={screenMat}
            geometry={screenObj.geometry}
            position={[-0.012, 2.005, 5.493]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <Html
              className='content'
              name='display'
              position={[0, 0.05, 0]}
              rotation={[Math.PI / 3.55, 0, 0]}
              scale={[1.6, 1.8, 1]}
              transform
              occlude
            >
              <div
                className='wrapper'
                onPointerDown={(e) => {
                  if (viewMode === 'zoom-out') {
                    onClick();
                    //execute the first object's event when many objects were overlap.
                    e.stopPropagation();
                  }
                }}
                onPointerOver={() => {
                  if (viewMode === 'zoom-in') {
                    document.getElementById('main-canvas').style.cursor = 'default'
                  } else {
                    document.getElementById('main-canvas').style.cursor = 'pointer'
                  }
                }}
                onPointerLeave={() => {
                  document.getElementById('main-canvas').style.cursor = 'default'
                }}
              >
                <Site />
              </div>
            </Html>
          </mesh>
          <mesh
            name='back'
            material={backMat}
            geometry={backObj.geometry}
            position={[0.012, 1.388, -5.493]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name='front'
            material={frontMat}
            geometry={frontObj.geometry}
            position={[0.012, -2.005, 1.628]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
      </>
    )
  }

  /**
   * 
   * Camera Position Check-----------------
   * 
   * @param item : gachaData value
   */

  const cameraPosCheck = (item) => {
    let aziAngle;
    if (cameraPos < 0 && item.rotation[1] > 0) {
      console.log('- ==> +');
      aziAngle = item.rotation[1] - 2 * Math.PI;
      cameraInAnimate(item, aziAngle);
    } else if (cameraPos > 0 && item.rotation[1] < 0) {
      console.log('+ ==> -');
      aziAngle = item.rotation[1] + 2 * Math.PI;
      cameraInAnimate(item, aziAngle);
    } else {
      console.log('= ==> =');
      aziAngle = item.rotation[1];
      cameraInAnimate(item, aziAngle);
    }
  }
  /**
   * 
   * Camera View Mode------------------------------
   * 
   * @param exitEvent
   */

  // camera outside mode change by `exitEvent` props from `App component`
  useEffect(() => {
    if (viewerType === 'zoom-in') {
      cameraOutAnimate();
    }
    // eslint-disable-next-line
  }, [exitEvent]);

  const cameraInAnimate = (item, aziAngle) => {

    console.log('cameraPos => ', cameraPos)
    console.log('aziAngle => ', aziAngle)
    console.log('item.rotation => ', item.rotation[1])

    camera.current.minAzimuthAngle = -Math.PI;
    camera.current.maxAzimuthAngle = Math.PI;
    if (camera) {
      gsap.to(camera.current, {
        duration: 2,
        ease: Power2.easeInOut,
        onStart: () => {
          camera.current.enablePan = false;
          camera.current.enableRotate = false;
        },
        minAzimuthAngle: aziAngle,
        maxAzimuthAngle: aziAngle,
        minPolarAngle: Math.PI / 2.2,
        maxPolarAngle: Math.PI / 2.2,
        minDistance: 7500,
        maxDistance: 7500,
        onComplete: () => {
          camera.current.enableZoom = false;
          setViewerType('zoom-in');
        }
      });
    }
  }

  const cameraOutAnimate = () => {
    if (camera) {
      gsap.to(camera.current, {
        duration: 2,
        ease: Power2.easeInOut,
        onStart: () => {
          setViewerType('zoom-out');
        },
        minPolarAngle: Math.PI / 2.7,
        maxPolarAngle: Math.PI / 2.7,
        minAzimuthAngle: -Infinity,
        maxAzimuthAngle: Infinity,
        minDistance: 10500,
        maxDistance: 10500,
        enablePan: true,
        enableRotate: true,
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
      {/* <primitive object={scene} >
        <mesh />
      </primitive> */}
      <Atom atomObj={atomObj} />
      {
        ClonerData.map((item, index) => (
          <Cloner
            key={index + 'cloner'}
            item={item}
            index={index}
          />
        ))
      }
      {
        GachaData.map((item, index) => (
          <GachaMachine
            key={index + 'gacha'}
            item={item}
            screenObj={gachaScreenObj}
            screenMat={gachaScreenMat}
            backObj={gachaBackObj}
            backMat={gachaBackMat}
            frontObj={gachaFrontObj}
            frontMat={gachaFrontMat}
            viewMode={viewerType}
            onClick={() => cameraPosCheck(item)}
          />
        ))
      }
      <Floor />
      <OrbitControls
        ref={camera}
        minDistance={8500}
        maxDistance={10500}
        target={[0, 10, 0]}
        enablePan={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2.2}
        enableDamping={true}
        dampingFactor={0.07}
      />
      <axesHelper args={[10000]} />
    </>
  )
}

useGLTF.preload('/asset/model/gacha_2.glb');
export default MainSceneComponent;