import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas,  useLoader, useFrame, primitive } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls, Stars, useAnimations, useGLTF } from '@react-three/drei';
// import { usePlane } from "@react-three/cannon"
// import { useSpring, animated } from '@react-spring/three'

export default function Robot(props){
    const url = './robot/scene.gltf'
    const robot = useLoader(GLTFLoader, url)
    const { nodes, materials, animations } = useGLTF(url)
    const { ref, mixer, names, actions, clips } = useAnimations(animations, robot.scene)
    // console.log(robot);
  
    useEffect(() => {
    actions['Take 001'].stop()
    })
    
    return(
      <Suspense fallback={null} args={[1, 1, 0]}>
        <primitive object={robot.scene} scale={3} {...props} onClick={(e) => {
          console.log("I have clicked on Robot", e);
          actions['Take 001'].play();
          setTimeout(() => {
            actions['Take 001'].stop()
          }, 3000);
        }}/>
      </Suspense>
    )
  }