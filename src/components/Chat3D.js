import React, { useEffect, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveUsers, selectRoom } from '../features/room/roomSlice';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { default as Pegasus } from '../models/Pegasus.jsx';
import { default as Baseball } from '../models/Baseball.jsx';
import { default as Robot } from '../models/Robot.jsx';
import { default as Astro } from '../models/Astro.jsx';

const Chat3D = ({ location }) => {
  const [models, setModels] = useState();
  const activeUsers = useSelector(selectActiveUsers);
  const room = useSelector(selectRoom);

  const ownUser = [
    <Robot key={'ownAvatar'} position={[0, 0, 40]} rotation={[0, 180, 0]} />,
  ];

  useEffect(() => {
    //  We check how many  users are there and we inititiate them and add them in the scenes
    console.log('This room has active users', activeUsers)
    let findModels = activeUsers.map((mod, index) => {
      if (index === 0) {
        console.log('CHAT3D LOADS THE PEGASUS');
        return <Pegasus key={index} position={[0, 0, -40]} />;
      }
      if (index === 1) {
        console.log('CHAT3D LOADS THE BASEBALL');
        return <Baseball key={index} position={[40, 0, 0]} />;
      }

      if (index === 2) {
        console.log('CHAT3D LOADS THE ASTRO');
        return <Astro key={index} position={[-40, 0, 0]} rotation={[0, 90, 0]} />;
      }
    });

    setModels(findModels);
  }, [activeUsers]);

  console.log('********** 3D  CHAT*************');
  console.log('Location', location);
  console.log('modelsToLoad', models);
  console.log('****************************');

  return (
    <div className='chat3d' style={{ width: '100%', height: '100%' }}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [-20, 30, 50] }}
      >
        <color attach='background' args={['black']} />
        <OrbitControls />
        <Stars fade />
        <ambientLight intensity={1} />
        <spotLight position={[0, 0, 0]} />
        <Suspense fallback={null}>
          {ownUser[0]}
          {models}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Chat3D;
