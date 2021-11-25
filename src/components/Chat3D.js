import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { default as Pegasus } from '../models/Pegasus';

const Chat3D = ({ location }) => {
  let usersModels = [
    { model: 'Pegasus' },
    { model: 'Pegasus' },
    { model: 'Pegasus' },
    { model: 'Pegasus' },
  ];
  let [models, setModels] = useState();

  useEffect(() => {
    //  We check how many  users are there and we inititiate them and add them in the scenes
    let findModels = usersModels.map((mod, index) => {
      return <Pegasus key={index} position={[index, 0, 0]} />;
    });

    setModels(findModels);
  }, []);

  console.log('********** 3D  CHAT*************');
  console.log('Location', location);
  console.log('modelsToLoad', models);
  console.log('****************************');

  return (
    <div className='chat3d' style={{ width: '100%', height: '100%' }}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [3, 3, 5] }}
      >
        <color attach='background' args={['black']} />
        <OrbitControls />
        <Stars fade />
        <ambientLight intensity={1} />
        <spotLight position={[0, 0, 0]} />
        <Suspense fallback={null}>{models}</Suspense>
      </Canvas>
    </div>
  );
};

export default Chat3D;
