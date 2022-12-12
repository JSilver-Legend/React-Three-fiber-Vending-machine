import * as THREE from 'three'
import React from 'react'
import { useFrame } from 'react-three-fiber';

const Cloner = () => {

  // useFrame((state) => {
  //   const timer = state.clock.getElapsedTime();
    
  //   // -----Cloner objects Animation
  //   for(let i = 0; i < clonerObj.length; i++) {
  //     clonerObj.children[i].position.x = THREE.MathUtils.lerp
  //       (
  //         (
  //           //first place
  //           (i % 5) % 2 === 0 ? clonerObj.children[i].position.x : clonerObj.children[i].position.y
  //         ),
  //         (
  //           //last place
  //           (i % 5) % 2 === 0 ? clonerObj.children[i].position.x : clonerObj.children[i].position.y ) + (100 * Math.sin(timer)
  //         ),
  //         //step
  //         0.01 + 0.01 * (i % 5)
  //       )
  //   }
  // })

  return (
    <>
    <group name='cloner'>
      <mesh>
        <boxGeometry arg = {[100, 100, 100]} />
        <meshStandardMaterial color = "hotepink" transparent />
      </mesh>
    </group>
    </>
  )
}

export default Cloner