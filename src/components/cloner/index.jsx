import * as THREE from 'three'
import React, { useRef, useEffect } from 'react'
import { useFrame } from 'react-three-fiber';

const Cloner = ({item, index}) => {
  
  const clonerRef = useRef ()
  
  useFrame((state) => {
    const timer = state.clock.getElapsedTime ();

    (index % 5) % 2 === 0
      ? clonerRef.current.position.x = getLerp(timer)
      : clonerRef.current.position.y = getLerp(timer)
  });

  const getLerp = (timer) => {
    return (
      THREE.MathUtils.lerp(
        ((index % 5) % 2 === 0 ? clonerRef.current.position.x : clonerRef.current.position.y),
        (((index % 5) % 2 === 0 ? clonerRef.current.position.x : clonerRef.current.position.y)) + Math.sin(timer),
        1 + 0.5 * (index % 10)
      )
    )
  }

  return (
    <>
      <group
        index     = {index}
        name      = 'cloner'
        ref       = {clonerRef}
        position  = {item.position}
        scale     = {item.scale}
      >
        <mesh>
          <sphereGeometry args={[10]} />
          <meshStandardMaterial color="#F7BD00" />
        </mesh>
      </group>
    </>
  )
}

export default Cloner