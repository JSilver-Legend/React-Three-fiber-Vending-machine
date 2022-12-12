import React from 'react'
import { Html } from '@react-three/drei'
import Site from '../site'
const GachaMachine = ({
    item,
    screenObj,
    screenMat,
    backObj,
    backMat,
    frontObj,
    frontMat,
    viewMode,
    onClick
}) => {

  return (
    <>
        <group
            name          = 'gachaObj'
            position      = {item.position}
            rotation      = {item.rotation}
            scale         = {[100, 100, 100]}
            onPointerDown = {(e) => {
                if (viewMode === 'zoom-out') {
                    onClick();
                    e.stopPropagation();
                }
            }}
            onPointerOver = {() => {
                if (viewMode === 'zoom-in') {
                    document.getElementById('main-canvas').style.cursor = 'default'
                } else {
                    document.getElementById('main-canvas').style.cursor = 'pointer'
                }
            }}
            onPointerLeave = {() => {
                document.getElementById('main-canvas').style.cursor = 'default'
            }}

        >
            <mesh
                name        = 'screen'
                material    = {screenMat}
                geometry    = {screenObj.geometry}
                position    = {[-0.012, 2.005, 5.493]}
                rotation    = {[-Math.PI/2, 0, 0]}
            >
                <Html
                    className   = 'content'
                    name        = 'display'
                    position    = {[0, 0.05, 0]}
                    rotation    = {[Math.PI/3.55, 0, 0]}
                    scale       = {[1.6, 1.8, 1]}
                    transform
                    occlude
                >
                    <div className = 'wrapper'>
                        <Site />
                    </div>
                </Html>
            </mesh>
            <mesh
                name     = 'back'
                // material = {backMat}
                geometry = {backObj.geometry}
                position = {[0.012, 1.388, -5.493]}
                rotation = {[-Math.PI/2, 0, 0]}
            >
                <meshStandardMaterial color={'#337AFF'} />
            </mesh>
            <mesh
                name     = 'front'
                // material = {frontMat}
                geometry = {frontObj.geometry}
                position = {[0.012, -2.005, 1.628]}
                rotation = {[-Math.PI/2, 0, 0]}
            >
                <meshStandardMaterial color={'#83AEFF'} />
            </mesh>
        </group>
    </>
  )
}

export default GachaMachine