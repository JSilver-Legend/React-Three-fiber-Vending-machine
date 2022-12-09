import * as THREE from 'three'
import React from 'react'
import { useFrame } from 'react-three-fiber'
import { useRef } from 'react'

const Atom = ({atomObj}) => {

  const atomRef = useRef ();

  useFrame ((state) => {
    const timer = state.clock.getElapsedTime ();
    atomRef.current.rotation.y -= 0.005;
    atomRef.current.scale.x = THREE.MathUtils.lerp(atomRef.current.scale.x, Math.abs(Math.sin(timer)), 0.001);
    atomRef.current.scale.y = THREE.MathUtils.lerp(atomRef.current.scale.y, Math.abs(Math.sin(timer)), 0.001);
    atomRef.current.scale.z = THREE.MathUtils.lerp(atomRef.current.scale.z, Math.abs(Math.sin(timer)), 0.001);
  })

  return (
    <group name='atom' ref = {atomRef} position = {[0, 500, 0]}>
      <mesh geometry = {atomObj.geometry}>
      </mesh>
    </group>
  )
}

export default Atom