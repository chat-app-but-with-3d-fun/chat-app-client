// import React, { Suspense, useRef, useState, useEffect } from 'react';
// import { Canvas, useLoader, useFrame, primitive } from '@react-three/fiber';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import {
//   Environment,
//   OrbitControls,
//   Stars,
//   useAnimations,
//   useGLTF,
// } from '@react-three/drei';

// const Pegasus = ({ ...props }) => {
//   const url = '/pegasus/scene.gltf';
//   const gltf = useLoader(GLTFLoader, url);
//   const { nodes, materials, animations } = useGLTF(url);
//   const { ref, mixer, names, actions, clips } = useAnimations(animations, gltf.scene);

//   useEffect(() => {
//     actions[Object.keys(actions)[0]].stop();
//   }, []);

//   console.log('Pegasus loaded', gltf);
//   console.log('Pegasus position', props);
//   return (
//       <primitive
//         object={gltf.scene}
//         {...props}
//         onClick={(e) => {
//           console.log('I have clicked on Pegasus', e);
//           actions['metarig|Fly'].play();
//           setTimeout(() => {
//             actions['metarig|Fly'].stop();
//           }, 3000);
//         }}
//       />
//   );
// };
// export default Pegasus;
import React, { useRef, Suspense, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useLoader, primitive } from 'react-three-fiber';

export default function Pegasus({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/pegasus/scene-transformed.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["metarig|Fly"].play()
          setTimeout(() => {
          actions["metarig|Fly"].stop()
        }, 3000)

    }, [])
    console.log('PEGASUS PROPS', props)
  return (
    <Suspense fallback={null}>
      <group ref={group} {...props} dispose={null}     >
        {/* <group rotation={[-Math.PI / 2, 0, 0]} scale={1.15}>
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}> */}
          <group rotation={[-Math.PI / 2, 0, 0]} scale={1.15}>
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
            <group name='metarig' rotation={[-Math.PI / 2, 0, 0]} scale={54.16}>
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
    </Suspense>
  );
}

useGLTF.preload('/pegasus/scene-transformed.glb');
