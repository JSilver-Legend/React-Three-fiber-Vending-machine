import React from 'react'
import * as THREE from 'three'
import { MeshReflectorMaterial } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { RepeatWrapping } from 'three'
const Floor = () => {

  const floorMat = useLoader(THREE.TextureLoader, '/asset/texture/floor_map.jpg')
  floorMat.wrapS = RepeatWrapping
  floorMat.wrapT = RepeatWrapping
  floorMat.repeat.set(0.6, 0.6)

  const floorBumpMat = useLoader(THREE.TextureLoader, '/asset/texture/floor_bump_map.jpg')
  floorBumpMat.wrapS = RepeatWrapping
  floorBumpMat.wrapT = RepeatWrapping
  floorBumpMat.repeat.set(0.6, 0.6)

  return (
    <mesh name='floor' position={[0, -850, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
      <planeGeometry args={[50000, 50000]} />
      <MeshReflectorMaterial
        resolution={1024}
        mirror={0.75}
        mixBlur={10}
        mixStrength={2}
        // blur={[400, 100]}
        minDepthThreshold={0.8}
        maxDepthThreshold={1.2}
        depthScale={0}
        depthToBlurRatioBias={0.2}
        debug={0}
        color="#525252"
        metalness={0.5}
        map={floorMat}
        roughness={0.2}
        // roughnessMap={floorMat}
        bumpMap={floorBumpMat}
        normalScale={1}
        reflectorOffset={1}
      />
    </mesh>
  )
}

export default Floor