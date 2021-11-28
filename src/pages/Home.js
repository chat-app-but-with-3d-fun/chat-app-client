import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useFrame, primitive } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  Environment,
  OrbitControls,
  Stars,
  useAnimations,
  useGLTF,
} from '@react-three/drei';
// import { usePlane } from "@react-three/cannon"
import { useSpring, animated } from '@react-spring/three';
// import Loader from 'loader.js';
import Pegasus from "../models/Pegasus.js";
import Robot from "../models/Robot.js";
import Pear from "../models/Pear.js";
import Plane from "../models/Plane.js";

// function Plane(props){
//   return(

//     <mesh rotation={[-Math.PI / 2, 0, 0]}>
//       <planeGeometry attach="geometry" {...props} args={[50, 50]} />
//       <meshStandardMaterial attach="material" color="slategrey" />
//     </mesh>
//   )
// }

// function Pegasus(props){
//   const url = './pegasus/scene.gltf';
//   const gltf = useLoader(GLTFLoader, url);
//   const { nodes, materials, animations } = useGLTF(url)
//   const { ref, mixer, names, actions, clips } = useAnimations(animations, gltf.scene)

//   // console.log(gltf.actions);
//   useEffect(() => {
//   actions["metarig|Fly"].stop()
//   })

//   console.log(gltf);
//   return(
//     <Suspense fallback={null} >
//     <primitive object={gltf.scene} {...props} onClick={(e) => {
//       console.log("I have clicked on Pegasus", e);
//       actions["metarig|Fly"].play();
//       setTimeout(() => {
//         actions["metarig|Fly"].stop()
//       }, 3000);
//       }}/>
      
//     </Suspense>
//   )
// }

// function Pear(props){
//   const url = './pear/scene.gltf'
//   const pear = useLoader(GLTFLoader, url)
//   const { nodes, materials, animations } = useGLTF(url)
//   const { ref, mixer, names, actions, clips } = useAnimations(animations, pear.scene)
//   // console.log(pear);

//   useEffect(() => {
//   actions["ArmatureAction"].stop()
//   })

//   return(
//     <Suspense fallback={null}>
//       <primitive object={pear.scene} scale={0.5} {...props} onClick={(e) => {
//         console.log("I have clicked on Pear", e);
//         actions["ArmatureAction"].play();
//         setTimeout(() => {
//           actions["ArmatureAction"].stop()
//         }, 3000);
      
//         }}/>
//     </Suspense>
//   )

// }

// function Robot(props){
//   const url = './robot/scene.gltf'
//   const robot = useLoader(GLTFLoader, url)
//   const { nodes, materials, animations } = useGLTF(url)
//   const { ref, mixer, names, actions, clips } = useAnimations(animations, robot.scene)
//   // console.log(robot);

//   useEffect(() => {
//   actions['Take 001'].stop()
//   })
  
//   return(
//     <Suspense fallback={null} args={[1, 1, 0]}>
//       <primitive object={robot.scene} scale={3} {...props} onClick={(e) => {
//         console.log("I have clicked on Robot", e);
//         actions['Take 001'].play();
//         setTimeout(() => {
//           actions['Take 001'].stop()
//         }, 3000);
//       }}/>
//     </Suspense>
//   )
// }

// function Streetlight(props){
//   const streetlight = useLoader(GLTFLoader, './streetlight/scene.gltf')

//   console.log(streetlight);
//   return(
//     <Suspense fallback={null}>
//       <primitive object={streetlight.scene} scale={0.5} {...props} />
//     </Suspense>
//   )
// }

export default function Home(props) {
  return (
    <>
    <div>
      <h2>welcome to koko!</h2>
    </div>
    <Canvas 
    style={{width: '300px' , height: '300px' }} camera={{ fov: 75, near: 0.1, far: 1000, position: [3, 3, 5 ] }} 
    // camera={{ position: [0, 0, 0], near: 0.1, far: 1000 }}
    {...props} sRGB={true}>      
    <color attach='background' args={'black'}/>
      <Suspense fallback={null}>
        <OrbitControls />
        <Stars fade />
        <ambientLight intensity={1} />
        <spotLight position={[0, 0, 0]} /> 
        <Plane position={[0,0,0]} />

        <Pegasus position={[4,0,0]} />
        <Pear position={[0,0,4]} scale={0.5}/>

        {/* <Streetlight position={0,-4,0} scale={0.5}/> */}
        <Robot position={2,2,0} scale={0.10}/>
        
      </Suspense>
    </Canvas>
    </>
  );
}
