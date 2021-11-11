
import React, { Suspense, useRef, useState } from "react";
import { Canvas,  useLoader, useFrame } from 'react-three-fiber';
import { OrbitControls, Stars, Html, Text, useTexture } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader'

function Box(props){
  return (
    <mesh {...props}>
      <boxGeometry attach='geometry' position={[-1, 1, 0]}/>
      <meshLambertMaterial attach='material' color='hotpink' />

      {/* <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial attach='material' color='lightblue' />       */}
    </mesh>
  )
}

function Sphere(props){
  // const colorMap = useLoader(TextureLoader, './textures/highpoly_baseColor.jpg')
// const gltf = useLoader(GLTFLoader, './pegasus/scene.gltf');
  return(
    <>
    <ambientLight intensity={0.2} />
    <directionalLight />
    <mesh>
      <sphereGeometry args={[1, 32, 32]}  />
      <meshStandardMaterial color='red' />
    </mesh>
    </>

    // <Suspense fallback={null}>
    // <primitive object={gltf.scene} {...props}/>
    // </Suspense>

  )
}

function Pegasus(props){
  const gltf = useLoader(GLTFLoader, './pegasus/scene.gltf');

  return(
    <Suspense fallback={null}>
    <primitive object={gltf.scene} {...props}/>
    </Suspense>
  )
}

function Pear(props){
  const pear = useLoader(GLTFLoader, './pear/scene.gltf')

  return(
    <Suspense fallback={null}>
      <primitive object={pear.scene} {...props} />
    </Suspense>
  )
}

function Bar(props){
  const bar = useLoader(GLTFLoader, './classicbar/scene.gltf')
  return(
    <Suspense fallback={null}>
      <primitive object={bar.scene} scale={2} {...props} />
    </Suspense>
  )
}

function Robot(props){
  const robot = useLoader(GLTFLoader, './robot/scene.gltf')
  return(
    <Suspense fallback={null}>
      <primitive object={robot.scene}{...props}/>
    </Suspense>
  )
}

function Streetlight(props){
  const streetlight = useLoader(GLTFLoader, './streetlight/scene.gltf')
  return(
    <Suspense fallback={null}>
      <primitive object={streetlight.scene} scale={0.5}{...props}/>
    </Suspense>
  )
}

export default function Home(props){
  return (
    <>
    <div>
      <h2>welcome to koko!</h2>
    </div>
    <Canvas style={{width: '100%' , height: '100%' }} camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }} {...props}>      
    <color attach='background' args={'black'}/>
      <Suspense fallback={null}>
        <OrbitControls />
        <Stars fade />
        <ambientLight intensity={1} />
        <spotLight position={[10, 15, 10]} angle={0.3} /> 
        <Box position={[2.5, 2.5, 2.5]}/>
        <Sphere position={[2.5,2.5,5]} />
        <Pegasus position={[1,1,1]} />
        <Pear position={[3, 3, 3]} />
        <Bar position={[-1,-1,0]} invalidate/>
        <Robot position={6,6,6}/>
        <Streetlight position={7,7,7}/>
      </Suspense>
    </Canvas>
    </>
  )
}


// function BoxOne(props) {

//   return (
//     <mesh {...props}>
//       <boxGeometry attach='geometry' position={[-1, 1, 0]}/>
//       <meshLambertMaterial attach='material' color='hotpink' />
//     </mesh>
//   )
// }

// export default function Home(){
//   return(
//     <Canvas>
//       <Suspense fallback={null}>
//         <ambientLight />
//       <pointLight position={[10, 10, 10]} />
//       <BoxOne position={[-1.2, 0, 0]} />
//       <Box position={[3, 0, 0]} />
//       <Sphere position={[0,0,0]} />
//       <Pegasus position={[2,2,2]} />
//       </Suspense>
    
//   </Canvas>
//   )
// }

// ReactDOM.render(
  // <Canvas>
  //   <ambientLight />
  //   <pointLight position={[10, 10, 10]} />
  //   <Box position={[-1.2, 0, 0]} />
  //   <Box position={[1.2, 0, 0]} />
  // </Canvas>,
//   document.getElementById('root')
// )