import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas,  useLoader, useFrame, primitive } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls, Stars, useAnimations, useGLTF } from '@react-three/drei';
// import { usePlane } from "@react-three/cannon"
import { useSpring, animated } from '@react-spring/three'
// import Loader from 'loader.js';

export default function Pear(props){
    const url = './pear/scene.gltf'
    const pear = useLoader(GLTFLoader, url)
    const { nodes, materials, animations } = useGLTF(url)
    const { ref, mixer, names, actions, clips } = useAnimations(animations, pear.scene)
    // console.log(pear);
  
    useEffect(() => {
    actions["ArmatureAction"].stop()
    })
  
    return(
      <Suspense fallback={null}>
        <primitive object={pear.scene} scale={0.5} {...props} onClick={(e) => {
          console.log("I have clicked on Pear", e);
          actions["ArmatureAction"].play();
          setTimeout(() => {
            actions["ArmatureAction"].stop()
          }, 3000);
        
          }}/>
      </Suspense>
    )
  
  }