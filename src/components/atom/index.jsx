import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Select } from '@react-three/drei'

const Atom = ({ atomObj }) => {

  const atomRef = useRef();
  const atomTexture = useLoader(THREE.TextureLoader, '/asset/texture/atom.jfif')
  useFrame((state) => {
    const timer = state.clock.getElapsedTime();
    atomRef.current.rotation.y -= 0.005;
    atomRef.current.scale.x = THREE.MathUtils.lerp(atomRef.current.scale.x, Math.abs(Math.sin(timer)), 0.001);
    atomRef.current.scale.y = THREE.MathUtils.lerp(atomRef.current.scale.y, Math.abs(Math.sin(timer)), 0.001);
    atomRef.current.scale.z = THREE.MathUtils.lerp(atomRef.current.scale.z, Math.abs(Math.sin(timer)), 0.001);
  })

  return (
    <Select enabled={true}>
      <group name='atom' ref={atomRef} position={[0, 300, 0]}>
        <mesh geometry={atomObj.geometry}>
          <meshStandardMaterial
            color={'#8597FF'}
            metalness={0.4}
            roughness={0.2}
            map={atomTexture}
          />
        </mesh>
      </group>
    </Select>
  )
}

export default Atom