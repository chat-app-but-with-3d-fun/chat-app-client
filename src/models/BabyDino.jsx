import React, { useRef, Suspense, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function BabyDino({ ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/babydino/scene-transformed.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <Suspense fallback={null}>
      <group ref={group} {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <group rotation={[Math.PI / 2, 0, 0]}>
                <group position={[49.13, 61.44, -208.56]} rotation={[-1.36, -0.94, -0.9]}>
                  <group rotation={[Math.PI / 2, 0, 0]} />
                </group>
                <group name="Armature" rotation={[-Math.PI / 2, 0, 0]}>
                  <primitive object={nodes._rootJoint} scale={0.010} />
                  <skinnedMesh
                    geometry={nodes.Dino_M_Skin_0.geometry}
                    material={materials.M_Skin}
                    skeleton={nodes.Dino_M_Skin_0.skeleton}
                  />
                  <skinnedMesh
                    geometry={nodes.Dino_M_Eye_0.geometry}
                    material={materials.M_Eye}
                    skeleton={nodes.Dino_M_Eye_0.skeleton}
                    onClick={(e) => actions[Object.keys(actions)[0]].play()}
                  />
                </group>
              </group>
            </group>
      </group>

    </Suspense>
    
  )
}

useGLTF.preload('/babydino/scene-transformed.glb')