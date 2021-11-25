/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Batuhan13 (https://sketchfab.com/Batuhan13)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/pegasus-62f6e4c9dcc4489b98729661e51cfadc
title: Pegasus
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/scene.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1.15}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group name="metarig" rotation={[-Math.PI / 2, 0, 0]} scale={54.16}>
            <primitive object={nodes._rootJoint} />
            <skinnedMesh
              geometry={nodes.Object_9.geometry}
              material={materials.Pegasus}
              skeleton={nodes.Object_9.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')
