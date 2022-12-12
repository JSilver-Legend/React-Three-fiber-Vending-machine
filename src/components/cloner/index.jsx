import React from 'react'

const Cloner = (item) => {
  console.log(item);
  return (
    <>
      <group
        name      = 'cloner'
        // ref       = 'clonerRef'
        position  = {item.item.position}
        scale     = {item.item.scale}
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