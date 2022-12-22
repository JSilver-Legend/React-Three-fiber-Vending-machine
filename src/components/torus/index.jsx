import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Select } from '@react-three/postprocessing'

function TorusObj() {
  const torusMat = useLoader(THREE.TextureLoader, '/asset/texture/torus.jpg')
  const torusRef = useRef();
  useFrame((state) => {
    const timer = state.clock.getElapsedTime();
  })
  return (
    <Select enabled={true}>
      <mesh ref={torusRef} position={[0, -500, 0]} rotation={[Math.PI / 2, 0, 0]} scale={350} >
        <torusGeometry args={[20, 0.03, 30, 100]} />
        <meshStandardMaterial
          map={torusMat}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
    </Select>
  )
}

export default TorusObj