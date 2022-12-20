import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber';

const Cloner = ({ item, index }) => {

  const clonerRef = useRef()

  useFrame((state) => {
    const timer = state.clock.getElapsedTime();

    (index % 5) % 2 === 0
      ? clonerRef.current.position.x = positionLerp(timer)
      : clonerRef.current.position.y = positionLerp(timer);
    (index % 5) % 2 === 0
      ? clonerRef.current.rotation.x = rotationLerp(timer)
      : clonerRef.current.rotation.y = rotationLerp(timer)
  });

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
      // THREE.MathUtils.lerp(
      //   ((index % 10) % 2 === 0 ? clonerRef.current.rotation.x : clonerRef.current.rotation.y),
      //   (((index % 10) % 2 === 0 ? clonerRef.current.rotation.x : clonerRef.current.rotation.y)) + Math.sin(timer),
      //   0.05
      // )
    )
  }

  return (
    <>
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

          />
        </mesh>
        {/* <EffectComposer>
        <SelectiveBloom
          lights={[lightRef1, lightRef2]} // REQUIRED! all relevant lights
          selection={[clonerRef]} // selection of objects that will have bloom effect
          selectionLayer={10} // selection layer
          intensity={0.15} // The bloom intensity.
          luminanceThreshold={0.2} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
      </EffectComposer> */}
      </group>
    </>
  )
}

export default Cloner