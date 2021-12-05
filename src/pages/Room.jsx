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
import { selectRoom, selectRoomId } from '../features/room/roomSlice'
import SmallSidebar from '../components/SmallSidebar.jsx';
import { toggleDrawer, selectDrawer} from '../features/page/pageSlice';
import { closeDrawer } from '../features/page/pageSlice';
import { selectUserId } from '../features/user/userSlice.js';

const Room = ({ location }) => {
  const [ tab, setTab ] = useState('chat')
  const userId        = useSelector(selectUserId)
  const roomObj       = useSelector(selectRoom)
  const roomId        = useSelector(selectRoomId)
  const drawerOpen    = useSelector(selectDrawer)
  const [ roomInfo ]  = useGetRoomInfoMutation()
  const dispatch      = useDispatch()
    
  const changeTab = (e, newTab) => {
    setTab(newTab);
  }

  const getName = () => {
    const friendId = roomObj.roomName
      .split('-')
      .filter(element =>(element != userId) && (element != 'privatChat')) 
      .join()
    const friendName = roomObj.roomUsers?.find(element => element._id === friendId)
    return friendName?.username
  }
    
    
  useEffect(() => {
    dispatch(closeDrawer())
  },[])
    
  console.log('ROOMID AND ROOM INFO: ', roomObj)

  return(
    <Grid container
      sx={{
        width: `${drawerOpen ? "calc(100vw - 240px)" : "100vw" }`,
        height: "100vh",
        backgroundColor: 'black'
      }}
    >
      <Grid item
        md="7" lg='8'
        sx={{
          display: "flex",
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: "lightgray"
        }}
      >
        <h2 style={{ color: 'white', position: 'absolute', top: '20px', left: '35%', zIndex: '9999' }}>
          {roomObj.roomPrivate ? `Direct chat with ${getName()}` : `Chatting in ${roomObj.roomName}`}
        </h2>
        <Chat3D />
        {/* <Jitsi id={roomId} /> */}
        {!drawerOpen && <SmallSidebar />}
      </Grid>
        
      <Grid item direction='column' md="5" lg='4' sx={{ padding: '0 20px'}} >
        <Box>
          <Tabs
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              textAlign: 'right'
            }}
            value={tab}
            onChange={changeTab}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="Tabs for changing msg window"
          >
            <Tab value="chat" label="Chat" sx={{ color: 'white' }} />
            <Tab value="notes" label="Notes" sx={{ color: 'white' }} />
            <Tab value="screen" label="Room" sx={{ color: 'white' }} />
          </Tabs>  
        </Box>
        {
          tab === 'chat' ?
          <ChatBox /> :
          tab === 'notes' ?
          <NoteBox  /> :
          <ScreenBox />
        }
      </Grid>
    </Grid>
  )
}


export default Room