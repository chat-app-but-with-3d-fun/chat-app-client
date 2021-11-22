
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas,  useLoader, useFrame, primitive } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls, Stars, useAnimations, useGLTF } from '@react-three/drei';
// import { usePlane } from "@react-three/cannon"
import { useSpring, animated } from '@react-spring/three'



// function Box(props){
//   return (
//     <mesh {...props}>
//       <boxGeometry attach='geometry' position={[-1, 1, 0]} />
//       <meshLambertMaterial attach='material' color='hotpink' />
//     </mesh>
//   )
// }

// function Sphere(props){

//   return(
//     <>
//     <ambientLight intensity={0.2} />
//     <directionalLight />
//     <mesh>
//       <sphereGeometry args={[1, 32, 32]}  {...props} />
//       <meshStandardMaterial color='red' />
//     </mesh>
//     </>
//   )
// }

function Plane(props){
  return(

    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry attach="geometry" {...props} args={[50, 50]} />
      <meshStandardMaterial attach="material" color="slategrey" />
    </mesh>
  )
}





//  ------------------- FROG ISN'T ANIMATED -------------------
// function Frog(props){
//   const url = './frog/scene.gltf'
//   const frog = useLoader(GLTFLoader, url)
//   const { nodes, materials, animations } = useGLTF(frog)
//   const { ref, mixer, names, actions, clips } = useAnimations(animations, frog.scene)
//   console.log(frog);

//     useEffect(() => {
//     actions.rotate(360).play()
//     })

//   return(
//     <Suspense fallback={null}>
//       <primitive object={frog.scene} {...props} />
//     </Suspense>
//   )
// }

// ---------------------   OTHER  PEAR    --------------------- 
// function Pear(props){
//   const url = './pear/scene.gltf'
//   const pear = useLoader(GLTFLoader, url)
//   const { nodes, materials, animations } = useGLTF(pear)
//   const { ref, mixer, names, actions, clips } = useAnimations(animations, pear.scene)

//   console.log(actions);

//   // useEffect(() => {
//   //   actions.play()
//   // })

//   return(
//     <Suspense fallback={null}>
//       <primitive object={pear.scene} {...props} />
//     </Suspense>
//   )
// }

function Pegasus(props){
  const url = './pegasus/scene.gltf';
  const gltf = useLoader(GLTFLoader, url);
  const { nodes, materials, animations } = useGLTF(url)
  const { ref, mixer, names, actions, clips } = useAnimations(animations, gltf.scene)
  // const props = useSpring({

  // })

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
         
      }, 3000);
      }}/>
      
    </Suspense>
  )
}

function Pear(props){
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
          
        }, 3000);
        }}/>
    </Suspense>
  )

}

function Robot(props){
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
      <primitive object={robot.scene} scale={3} {...props}onClick={(e) => {
        console.log("I have clicked on Robot", e);
        actions['Take 001'].play();
        setTimeout(() => {
          
        }, 3000);
      }}/>
    </Suspense>
  )
}

function Streetlight(props){
  const streetlight = useLoader(GLTFLoader, './streetlight/scene.gltf')

  console.log(streetlight);
  return(
    <Suspense fallback={null}>
      <primitive object={streetlight.scene} scale={0.5} {...props} />
    </Suspense>
  )
}

export default function Home(props){
  return (
    <>
    <div>
      <h2>welcome to koko!</h2>
    </div>
    <Canvas 
    style={{width: '100%' , height: '100%' }} camera={{ fov: 75, near: 0.1, far: 1000, position: [3, 3, 5 ] }} 
    // camera={{ position: [0, 0, 0], near: 0.1, far: 1000 }}
    {...props}>      
    <color attach='background' args={'black'}/>
      <Suspense fallback={null}>
        <OrbitControls />
        <Stars fade />
        <ambientLight intensity={1} />
        <spotLight position={[0, 0, 0]} /> 
        <Plane position={[0,0,0]} />

        <Pegasus position={[4,0,0]} />
        <Pear position={[0,0,4]} scale={0.5}/>

        
        <Streetlight position={0,0,0} scale={0.5}/>
        <Robot position={2,0,0} scale={0.10}/>
        
        {/* <Frog position={[0,0,1]} /> */}        
        {/* <Box position={[2.5, 2.5, 2.5]}/>
        <Sphere position={[4,4,4]} /> */}
      </Suspense>
    </Canvas>
    </>
  )
}
