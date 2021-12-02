import React, { useEffect, useState } from 'react'
import Chat3D from '../components/Chat3D.js';

import { Box, Paper, Grid } from '@mui/material'
import ChatBox from '../components/ChatBox';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import NoteBox from '../components/NoteBox';
import { useGetMessagesQuery } from "../features/api/apiSlice"
import { useDispatch, useSelector } from 'react-redux';
import { setRoom } from '../features/room/roomSlice';
import Jitsi from '../components/Jitsi';
import ScreenBox from '../components/ScreenBox';
import { socket } from '../features/api/apiSlice';
import { useGetRoomInfoMutation } from '../features/api/apiSlice';
import {selectRoomId, selectRoomName, selectRoomUsers, selectRoom} from '../features/room/roomSlice'




const RoomTabContainer = () => {
   
  const [tab, setTab] = useState('chat')
    
  const sliceRoomId = useSelector(selectRoomId)
  const sliceRoomName = useSelector(selectRoomName)
  const sliceRoomUsers = useSelector(selectRoomUsers)
  
  const changeTab = (e, newTab) => {
    setTab(newTab);
  }

  return (
    <Box>
      <Box>
        <Tabs
          value={tab}
          onChange={changeTab}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="Tabs for changing msg window"
        >
          <Tab value="chat" label="Chat" />
          <Tab value="notes" label="Notes" />
          <Tab value="screen" label="Room" />
        </Tabs>     
      </Box>
      {
        tab === 'chat' &&
        <ChatBox
          messageList={messageList}
          room={{roomId, roomName, type}}
        />
      }
      {
        tab === 'notes' &&
        <NoteBox room={{roomId, roomName, type}} />
      }
      {
        tab === 'screen' &&
        <ScreenBox users={roomUsers} id={roomId} />
      }
    </Box> 
  )
}
