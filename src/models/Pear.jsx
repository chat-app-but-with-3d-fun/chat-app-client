import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/pear/scene-transformed.glb');
  const { actions } = useAnimations(animations, group);
  console.log('PEAR PROPS', props);
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[-0.96, 2.32, 4.41]} rotation={[-0.27, 0.6, 1.93]} />
        <group name='Armature' position={[0, 0, -0.57]}>
          <primitive object={nodes.Armature_rootJoint} />
          <skinnedMesh
            geometry={nodes.pear_low_poly_0.geometry}
            material={materials.Material}
            skeleton={nodes.pear_low_poly_0.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/pear/scene-transformed.glb');
