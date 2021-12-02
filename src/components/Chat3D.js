import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';



const Chat3D = ({ location }) => {

  
  return (
    <div className='chat3d' style={{ width: '100%', height: '100%' }}>
      <Canvas
       style={{ width: '100%', height: '100%' }}
       camera={{ fov: 75, near: 0.1, far: 1000, position: [-20, 30, 50] }}
       mode="concurrent"
     >
       <color attach='background' args={['black']} />
       <OrbitControls />
       <Stars fade />
       <ambientLight intensity={1} />
       <spotLight position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default Chat3D;
