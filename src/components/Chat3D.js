import React, { useEffect, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import {selectActiveUsers, selectRoom} from '../features/room/roomSlice'

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { default as Pegasus } from '../models/Pegasus.jsx';
import { default as Baseball } from '../models/Baseball.jsx';
import { default as Robot } from '../models/Robot.jsx';


const Chat3D = ({ location }) => {
<<<<<<< HEAD
  let usersModels = [
    { model: 'Pegasus' }
    // { model: 'Pegasus' },
    // { model: 'Pegasus' },
    // { model: 'Pegasus' },
  ];
  const[models, setModels] = useState();

  useEffect(() => {
    //  We check how many  users are there and we inititiate them and add them in the scenes
    let findModels = usersModels.map((mod, index) => {
      
      return 
      // (
        // <Pegasus key={index} position={[index/10, 0, 0]} />
      // )
    });

=======

  const[models, setModels]  = useState();
  const activeUsers         = useSelector(selectActiveUsers)
  const room                = useSelector(selectRoom)

  const ownUser = [
      <Robot key={'ownAvatar'} position={[0.1, 0, -10]} />,
      // <Pegasus key={index} position={[30, 0, 10]} />,
      // <Baseball key={index} position={[-30, 0, 10]} />
  ]

  useEffect(() => {
    //  We check how many  users are there and we inititiate them and add them in the scenes
    let findModels = activeUsers?.map((mod, index) => {
      if (index===0){
        return (
          <Pegasus key={index} position={[30, 0, 10]} />
        )
      }
      else{
        return (
          <Baseball key={index} position={[-30, 0, 10]} />
        )
      }})
>>>>>>> ac0a4ea2020755ca29b5cf095d88e4de7c412682
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
        <Suspense fallback={null}>{ownUser[0]}{models}</Suspense>
      </Canvas>
    </div>
  );
};

export default Chat3D;
