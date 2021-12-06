import React, { useEffect, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveUsers, selectRoom } from '../features/room/roomSlice';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { default as Pegasus } from '../models/Pegasus.jsx';
import { default as Baseball } from '../models/Baseball.jsx';
import { default as Robot } from '../models/Robot.jsx';
import { default as Astro } from '../models/Astro.jsx';
import { default as BabyDino } from '../models/BabyDino.jsx';
import { default as Blobby } from '../models/Blobby.jsx';
import { default as Dino } from '../models/Dino.jsx';
import { default as Rex } from '../models/Rex.jsx';

const Chat3D = ({ location }) => {
  const [models, setModels] = useState();
  const activeUsers = useSelector(selectActiveUsers);
  const room = useSelector(selectRoom);


  const ownUser = [
    <BabyDino key={'ownAvatar'} position={[0, 0, 40]} rotation={[0, 180, 0]} />,
  ];

  // useEffect(() => {
    //  We check how many  users are there and we inititiate them and add them in the scenes
    // console.log('This room has active users', activeUsers)
    // let findModels = activeUsers.map((mod, index) => {
    //   if (index === 0) {
    //     console.log('CHAT3D LOADS THE PEGASUS');
    //     return <Pegasus key={index} position={[0, 0, -40]} />;
    //   }
    //   if (index === 1) {
    //     console.log('CHAT3D LOADS THE BASEBALL');
    //     return <Baseball key={index} position={[40, 0, 0]} />;
    //   }

    //   if (index === 2) {
    //     console.log('CHAT3D LOADS THE ASTRO');
    //     return <Astro key={index} position={[-40, 0, 0]} rotation={[0, 90, 0]} />;
    //   }
    //   // if (index === 3) {
    //   //   console.log('CHAT3D LOADS THE BABYDINO');
    //   //   return <BabyDino key={index} position={0,0,40} />
    //   // }
    //   if (index === 4) {
    //     console.log('CHAT3D LOADS BLOBBY');
    //     return <Blobby key={index} position={80, 0, 0 } />
    //   }
    //   if( index === 5) {
    //     console.log('CHAT3D LOADS THE DINO');
    //     return <Dino key={index} position={0, 0, -80} />
    //   }
    //   if (index === 6) {
    //     console.log("CHAT3D LOADS REX");
    //     return <Rex key={index} position={60, 0, 0} />
    //   }
    // });

  //   setModels(findModels);
  // }, [activeUsers]);

  console.log('********** 3D  CHAT*************');
  console.log('Location', location);
  console.log('modelsToLoad', models);
  console.log('****************************');

  return (
    <div className='chat3d' style={{ width: '100%', height: '100%' }}>
      <Canvas
        style={{ width: '100vw', height: '100vh' }}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [-20, 30, 50] }}
      >
        <color attach='background' args={['black']} />
        <OrbitControls />
        <Stars fade />
        <ambientLight intensity={1} />
        <spotLight position={[0, 0, 0]} />
        <Suspense fallback={null}>
          {/* {ownUser[0]}
          {models} */}
          <Pegasus  position={[-40, 0, -60]} />
          <Baseball  position={[40, 0, -20]} />
          <Astro  position={[-40, 0, 30]} rotation={[0, 90, 0]} />

          <BabyDino  position={80, 0, -80} scale={2.5}/>
          <Dino  position={-30, 0, -5} scale={0.04} />
          <Blobby  position={-50, 0, 30 } />
          
          <Rex  position={50, 0, -28} scale={0.15}/>

        </Suspense>
      </Canvas>
    </div>
  );
};

export default Chat3D;
