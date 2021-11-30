import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas,  useLoader, useFrame, primitive } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls, Stars, useAnimations, useGLTF } from '@react-three/drei';
// import { useSpring, animated } from '@react-spring/three'

export default function PegasusAnimation(props){
    const url = './pegasus/scene.gltf';
    const gltf = useLoader(GLTFLoader, url);
    const { nodes, materials, animations } = useGLTF(url)
    const { ref, mixer, names, actions, clips } = useAnimations(animations, gltf.scene)
  
    // console.log(gltf.actions);
    useEffect(() => {
    actions["metarig|Fly"].stop()
    })
  
    console.log(gltf);
    return(
      <Suspense fallback={null} >
      <primitive object={gltf.scene} {...props} onClick={(e) => {
        console.log("I have clicked on Pegasus", e);
        actions["metarig|Fly"].play();
        setTimeout(() => {
          actions["metarig|Fly"].stop()
        }, 3000);
        }}/>
        
      </Suspense>
    )
  }