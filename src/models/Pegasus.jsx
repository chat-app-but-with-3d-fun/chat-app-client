import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useFrame, primitive } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  Environment,
  OrbitControls,
  Stars,
  useAnimations,
  useGLTF,
} from '@react-three/drei';

const Pegasus = ({ ...props }) => {
  const url = '/pegasus/scene.gltf';
  const gltf = useLoader(GLTFLoader, url);
  const { nodes, materials, animations } = useGLTF(url);
  const { ref, mixer, names, actions, clips } = useAnimations(animations, gltf.scene);

  useEffect(() => {
    actions[Object.keys(actions)[0]].stop();
  }, []);

  console.log('Pegasus loaded', gltf);
  console.log('Pegasus position', props);
  return (
      <primitive
        object={gltf.scene}
        {...props}
        onClick={(e) => {
          console.log('I have clicked on Pegasus', e);
          actions['metarig|Fly'].play();
          setTimeout(() => {
            actions['metarig|Fly'].stop();
          }, 3000);
        }}
      />
  );
};
export default Pegasus;
