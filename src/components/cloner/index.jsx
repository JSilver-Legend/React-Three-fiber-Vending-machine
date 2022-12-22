import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber';
import { Select } from '@react-three/postprocessing';

const Cloner = ({ item, index, texture }) => {
  const clonerRef = useRef()

  const positionLerp = (timer) => {
    return (
      THREE.MathUtils.lerp(
        ((index % 5) % 2 === 0 ? clonerRef.current.position.x : clonerRef.current.position.y),
        (((index % 5) % 2 === 0 ? clonerRef.current.position.x : clonerRef.current.position.y)) + Math.sin(timer),
        1 + 0.5 * (index % 10)
      )
    )
  }

  const rotationLerp = (timer) => {
    return (
      ((index % 10) % 2 === 0 ? clonerRef.current.rotation.x += 0.01 : clonerRef.current.rotation.y += 0.01)

    )
  }

  useFrame((state) => {
    const timer = state.clock.getElapsedTime();

    (index % 5) % 2 === 0
      ? clonerRef.current.position.x = positionLerp(timer)
      : clonerRef.current.position.y = positionLerp(timer);
    (index % 5) % 2 === 0
      ? clonerRef.current.rotation.x = rotationLerp(timer)
      : clonerRef.current.rotation.y = rotationLerp(timer)
  });

  return (
    <Select enabled={true}>
      <group
        index={index}
        name='cloner'
        ref={clonerRef}
        position={item.position}
        scale={item.scale}
      >
        <mesh>
          <sphereGeometry args={[10]} />
          <meshStandardMaterial
            roughness={0.2}
            metalness={0.3}
            map={texture}
          />
        </mesh>
      </group>
    </Select>
  )
}

export default Cloner