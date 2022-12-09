import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber';

const Atom = (scene) => {
  const atomRef = useRef ();
  useFrame ((state) => {
    const timer = state.clock.getElapsedTime ();
    //-----atomObject animation
    atomRef.current.rotation.y -= 0.005;
    atomRef.current.scale.x = THREE.MathUtils.lerp(atomRef.current.scale.x, Math.abs(Math.sin(timer)), 0.001);
    atomRef.current.scale.y = THREE.MathUtils.lerp(atomRef.current.scale.y, Math.abs(Math.sin(timer)), 0.001);
    atomRef.current.scale.z = THREE.MathUtils.lerp(atomRef.current.scale.z, Math.abs(Math.sin(timer)), 0.001);
  })
  return (
    <>
      <group name='atom' ref={atomRef}>
        {
            <mesh geometry={scene.scene.children[1].children[0].geometry} />
        }
      </group>
    </>
  )
}

export default Atom