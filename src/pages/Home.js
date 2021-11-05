import React from "react";
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stars } from '@react-three/drei';



function Box(){
  return (
    <mesh>
      <boxBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' color='hotpink' />
    </mesh>
  )
}

function Plane(){
  return(
    <mesh position={[0, 2, 0]} rotation={[-Math.PI/2, 0, 0]}>
      <planeBufferGeometry attach='geometry' args={[100,100]} />
      <meshLambertMaterial attach='material' color='lightblue' />
    </mesh>
  )
}

export default function App(){
  return (
    <>
    <div>
      welcome to koko!
    </div>
    <Canvas style={{width: '100vw' , height: '100vh' }}>
      <color attach='background' args={'black'}/>
      <OrbitControls />
      <Stars fade />
      <ambientLight intensity={1} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Box onClick={() => console.log('BOX CLICKED')}/>
      <Plane />
    </Canvas>
    </>
  )
}
