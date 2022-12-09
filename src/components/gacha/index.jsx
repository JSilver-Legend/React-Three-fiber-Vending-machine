import React, {useEffect, useState} from 'react'
import { Html } from '@react-three/drei'
import Site from '../site'
const GachaMachine = ({
    item,
    screenObj,
    backObj,
    frontObj,
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
                geometry    = {screenObj.geometry}
                position    = {[-0.012, 2.005, 5.493]}
                rotation    = {[-Math.PI/2, 0, 0]}
                // material={}
            >
                <meshStandardMaterial color = {"#2B2404"} />
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
                geometry = {backObj.geometry}
                position = {[0.012, 1.388, -5.493]}
                rotation = {[-Math.PI/2, 0, 0]}
                // material={}
            >
                <meshStandardMaterial color={"#4E4D11"} />
            </mesh>
            <mesh
                name     = 'front'
                geometry = {frontObj.geometry}
                position = {[0.012, -2.005, 1.628]}
                rotation = {[-Math.PI/2, 0, 0]}
                // material={}
            >
                <meshStandardMaterial color={"#BDBB49"} />
            </mesh>
        </group>
    </>
  )
}

export default GachaMachine