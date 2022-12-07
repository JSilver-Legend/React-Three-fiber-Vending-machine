import React from 'react'
import { Html } from '@react-three/drei'
import Site from '../site'
const GachaMachine = ({item, nodes, scene, onClick}) => {
  return (
    <>
        <group
            name='vendingMachine'
            position={item.position}
            rotation={item.rotation}
            scale={[100, 100, 100]}
            onPointerDown={(e) => {
                onClick();
                e.stopPropagation();
            }}

        >
            <mesh
                name='screen'
                geometry={nodes.Null6.children[0].children[0].geometry}
                material={scene.children[2].children[5].children[0].children[0].material}
                position={[-0.012, 2.005, 5.493]}
                rotation={[-Math.PI/2, 0, 0]}
            >
                <Html
                    className='content'
                    name='display'
                    position={[0, 0.05, 0]}
                    rotation={[Math.PI/3.55, 0, 0]}
                    scale={[1.6, 1.8, 1]}
                    transform
                    occlude
                >
                    <div className='wrapper'>
                        <Site />
                    </div>
                </Html>
            </mesh>
            <mesh
                name='back'
                geometry={nodes.Null6.children[1].geometry}
                material={scene.children[2].children[5].children[1].material}
                position={[0.012, 1.388, -5.493]}
                rotation={[-Math.PI/2, 0, 0]}
            />
            <mesh
                name='front'
                geometry={nodes.Null6.children[2].geometry}
                material={scene.children[2].children[5].children[2].material}
                position={[0.012, -2.005, 1.628]}
                rotation={[-Math.PI/2, 0, 0]}
            />
        </group>
    </>
  )
}

export default GachaMachine