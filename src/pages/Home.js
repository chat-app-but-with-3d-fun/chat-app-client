
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas,  useLoader, useFrame, primitive } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls, Stars, useAnimations, useGLTF } from '@react-three/drei';
// import { usePlane } from "@react-three/cannon"
import { useSpring, animated } from '@react-spring/three'

function Box(props){
  return (
    <mesh {...props}>
      <boxGeometry attach='geometry' position={[-1, 1, 0]} />
      <meshLambertMaterial attach='material' color='hotpink' />
    </mesh>
  )
}

function Plane(props){
  return(

    <mesh>
      <planeGeometry attach="geometry" {...props} />
      <meshStandardMaterial attach="material" color="#fff" />
    </mesh>
  )
}

function Sphere(props){

  return(
    <>
    <ambientLight intensity={0.2} />
    <directionalLight />
    <mesh>
      <sphereGeometry args={[1, 32, 32]}  {...props} />
      <meshStandardMaterial color='red' />
    </mesh>
    </>
  )
}

function Pegasus(props){
  const url = './pegasus/scene.gltf';
  const gltf = useLoader(GLTFLoader, url);
  const { nodes, materials, animations } = useGLTF(url)
  const { ref, mixer, names, actions, clips } = useAnimations(animations, gltf.scene)

  console.log(actions);
  useEffect(() => {
  actions["metarig|HorseWalk"].play()
  })

  console.log(gltf);
  return(
    <Suspense fallback={null} >
    <primitive object={gltf.scene} {...props} 
    // onClick={() =>
    //   // This makes the object fly upwards when clicked on
    //   gltf.applyImpulse([0, 5, -10], [1, 1, 1])}
      />
    </Suspense>
  )
}

function Pear(props){
  const pear = useLoader(GLTFLoader, './pear/scene.gltf')
  console.log(pear);
  return(
    <Suspense fallback={null}>
      <primitive object={pear.scene} scale={0.5} {...props} />
    </Suspense>
  )

}



function Bar(props){
  const bar = useLoader(GLTFLoader, './classicbar/scene.gltf')
  return(
    <Suspense fallback={null} castShadow receiveShadow>
      <primitive object={bar.scene} scale={8} {...props} />
    </Suspense>
  )
}

function Robot(props){
  const robot = useLoader(GLTFLoader, './robot/scene.gltf')
  return(
    <Suspense fallback={null} args={[1, 1, 0]}>
      <primitive object={robot.scene} scale={3} {...props}/>
    </Suspense>
  )
}

function Streetlight(props){
  const streetlight = useLoader(GLTFLoader, './streetlight/scene.gltf')
  return(
    <Suspense fallback={null}>
      <primitive object={streetlight.scene} scale={0.5} {...props}/>
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
        <spotLight position={[10, 15, 10]} angle={0.3} /> 
        <Plane position={[0,0,0]} />
        {/* <Box position={[2.5, 2.5, 2.5]}/>
        <Sphere position={[4,4,4]} /> */}
        <Pegasus position={[0,0,0]} />
        <Pear position={[0,0,0]} />
        {/* <Bar position={[0,0,0]} invalidate/> */}
        <Robot position={0,0,0}/>
        <Streetlight position={0,0,0} scale={0.5}/>
      </Suspense>
    </Canvas>
    </>
  )
}
