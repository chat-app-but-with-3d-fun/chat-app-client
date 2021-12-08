/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: nodoxi (https://sketchfab.com/nodoxi)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/walking-astronaut-lets-go-b03facbc033c414797ec9deb543a8ff3
title: Walking Astronaut - Let's Go!
*/

import React, { useRef, Suspense, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Astro({ ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/astro/scene-transformed.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions[Object.keys(actions)[0]]?.play()
    setTimeout(() => {
      actions[Object.keys(actions)[0]]?.stop();
    }, 3000);
  }, []);

  console.log('ASTRO', group);
  return (
    <Suspense fallback={null}>
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            geometry={nodes.cosmo1__0.geometry}
            material={materials['Scene_-_Root']}
            skeleton={nodes.cosmo1__0.skeleton}
            onClick={(e) => {
              actions[Object.keys(actions)[0]].play();
              setTimeout(() => {
                actions[Object.keys(actions)[0]].stop();
              }, 3000);
            }}

          />
        </group>
      </group>
    </group>
    </Suspense>
    
  )
}

useGLTF.preload('/astro/scene-transformed.glb')
