/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Interim (https://sketchfab.com/scinnyfinny)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/a7e1ee9b7cb640678d58c7bd36b6523e
title: Dinosaur
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/scene-transformed.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group name="Armature" position={[31.18, 256.94, 33.83]} scale={40.67}>
            <primitive object={nodes._rootJoint} />
            <skinnedMesh
              geometry={nodes['Cube_��������_0'].geometry}
              material={materials.material}
              skeleton={nodes['Cube_��������_0'].skeleton}
              onClick={(e) => actions[Object.keys(actions)[0]].play()}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('dino/scene-transformed.glb')
