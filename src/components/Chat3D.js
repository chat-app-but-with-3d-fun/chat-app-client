import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { default as Pegasus } from '../models/Pegasus';
import { default as Pear } from '../models/Pear';
import { default as Robot } from '../models/Robot';
import { default as Baseball } from '../models/Baseball';

const Chat3D = ({ location }) => {
  let usersModels = [
    { model: 'Pegasus' },
    { model: 'Pear' },
    { model: 'Baseball' },
    { model: 'Robot' },
  ];
  let [models, setModels] = useState();

  useEffect(() => {
    //  We check how many  users are there and we inititiate them and add them in the scenes
    let findModels = usersModels.map((mod, index) => {
      if (mod.model === 'Pegasus')
        return (
          <Suspense fallback={null}>
            <Pegasus key={index} position={[index, 0, 0]}/>
          </Suspense>
        );
      // if (mod.model === 'Pear')
      //   return (
      //     <Suspense fallback={null}>
      //       <Pear key={index} position={[index, 0, 0]} />
      //     </Suspense>
      //   );
      if (mod.model === 'Robot')
        return (
          <Suspense fallback={null}>
            <Robot key={index} position={[index , 0, 0]} scale={.05}/>
          </Suspense>
        );
      if (mod.model === 'Baseball')
        return (
          <Suspense fallback={null}>
            <Baseball key={index} position={[index, 0, 0]} scale={5}/>
          </Suspense>
        );
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
        camera={{ fov: 75, near: 0.1, far: 1000, position: [3, 3, 3] }}
      >
        <color attach='background' args={['black']} />
        <OrbitControls />
        <Stars fade />
        <ambientLight intensity={1} />
        <spotLight position={[0, 0, 0]} />
        {models}
      </Canvas>
    </div>
  );
};

export default Chat3D;
