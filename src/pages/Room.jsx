<<<<<<< HEAD
import React, { useState, Suspense } from 'react';
import { Box, Paper, Grid } from '@mui/material';
import ChatBox from '../components/ChatBox';
=======
import React, { useState } from 'react'
import { Box, Paper, Grid } from '@mui/material'
import ChatBox from '../components/ChatBox'
>>>>>>> aimee
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chat3D from '../components/Chat3D.js';
import NoteBox from '../components/NoteBox';
import { useGetMessagesQuery } from '../features/api/apiSlice';
import { Canvas, useLoader, useFrame, primitive } from 'react-three-fiber';
import {
  Environment,
  OrbitControls,
  Stars,
  useAnimations,
  useGLTF,
} from '@react-three/drei';

const Room = ({ location }) => {
  //state from react-router-dom
  console.log('location ->', location);
  const {
    state: { roomId, type, roomName },
  } = location;
  const [tab, setTab] = useState('chat');
  const { data: messageList } = useGetMessagesQuery(roomId, {
    refetchOnMountOrArgChange: true,
  });

  const changeTab = (e, newTab) => {
    setTab(newTab);
  };

  return (
    <Grid container sx={{ width: '100vw', height: '93vh', marginTop: 8 }}>
      <Grid
        item
        md='6'
        lg='8'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'lightgray',
        }}
      >
        <Chat3D location={{ location }}></Chat3D>
      </Grid>

      <Grid item direction='column' md='6' lg='4'>
        <Paper elevation='10'>
          <Box>
            <Tabs
              value={tab}
              onChange={changeTab}
              textColor='secondary'
              indicatorColor='secondary'
              aria-label='Tabs for changing msg window'
            >
              <Tab value='chat' label='Chat' />
              <Tab value='notes' label='Notes' />
              <Tab value='screen' label='Screen' />
            </Tabs>
          </Box>
          {tab === 'chat' && (
            <ChatBox messageList={messageList} room={{ roomId, roomName, type }} />
          )}
          {tab === 'notes' && <NoteBox room={roomName} />}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Room;
