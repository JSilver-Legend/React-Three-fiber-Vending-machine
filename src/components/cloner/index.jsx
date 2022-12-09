import * as THREE from 'three'
import React from 'react'
import { useFrame } from 'react-three-fiber';

const Cloner = ({scene}) => {

  console.log("clonerScene ===> ", scene);

  // useFrame((state) => {
  //   const timer = state.clock.getElapsedTime();
    
  //   // -----Cloner objects Animation
  //   for(let i = 0; i < scene.children[0].children.length; i++) {
  //     scene.children[0].children[i].position.x = THREE.MathUtils.lerp
  //       (
  //         (
  //           //first place
  //           (i % 5) % 2 === 0 ? scene.children[0].children[i].position.x : scene.children[0].children[i].position.y
  //         ),
  //         (
  //           //last place
  //           (i % 5) % 2 === 0 ? scene.children[0].children[i].position.x : scene.children[0].children[i].position.y ) + (100 * Math.sin(timer)
  //         ),
  //         //step
  //         0.01 + 0.01 * (i % 5)
  //       )
  //   }
  // })

  return (
    <>
    <group name='cloner'>
      <primitive object={scene.children[0]} >
        <mesh />
      </primitive>
    </group>
    </>
  )
}

export default Cloner