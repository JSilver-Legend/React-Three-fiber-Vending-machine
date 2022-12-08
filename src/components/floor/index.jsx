import React from 'react'
import { MeshReflectorMaterial, useTexture } from '@react-three/drei'
import { MeshStandardMaterial, RepeatWrapping } from 'three'

const Floor = () => {
  const floorBumpMat = useTexture("/asset/texture/floor.jpg")
  floorBumpMat.wrapS = RepeatWrapping;
  floorBumpMat.wrapT = RepeatWrapping;
  floorBumpMat.repeat.set(10, 10)
  return (
    <mesh position={[0, -720, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
      <planeGeometry args={[50000, 50000]} />
      <MeshReflectorMaterial
        resolution={1024}
        mirror={0.75}
        mixBlur={10}
        mixStrength={2}
        blur={[400, 100]}
        minDepthThreshold={0.8}
        maxDepthThreshold={1.2}
        depthScale={0}
        depthToBlurRatioBias={0.2}
        debug={0}
        // distortion={1}
        // distortionMap={floorBumpMat}
        color="#444444"
        metalness={0.5}
        roughnessMap={floorBumpMat}
        roughness={0.2}
        // normalMap={floorBumpMat}
        normalScale={1}
        reflectorOffset={1}
      />
    </mesh>
  )
}

export default Floor