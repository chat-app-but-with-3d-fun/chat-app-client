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
import {selectRoom} from '../features/room/roomSlice'

const Room = ({ location }) => {
    //state from react-router-dom
    console.log('location ->', location)
    // const { state: { roomId = 0, type = 'chat', roomName ='test', roomUsers = [] } } = location 
    const roomObj       = useSelector(selectRoom)
    const [tab, setTab] = useState('chat')
    // const { data: messageList } = useGetMessagesQuery(roomObj.roomId, { refetchOnMountOrArgChange: true })
    
    const [ roomInfo ] = useGetRoomInfoMutation()
    

    const dispatch = useDispatch()


    const changeTab = (e, newTab) => {
        setTab(newTab);
    }


    return(
    <Grid container sx={{width: '100vw', height: '93vh', marginTop: 8}}>
        
        <Grid item md="6" lg='8' sx={{
                display: "flex",
                alignItems: 'flex-start',
                justifyContent: 'center',
                backgroundColor: "lightgray"}}>
             <Chat3D location={{ location }}></Chat3D>
             {/* <Jitsi id={roomId} /> */}
        </Grid>
        
        <Grid item direction='column' md="6" lg='4'>
        <Paper elevation="10"  >
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
                <ChatBox />
            }
            { 
                tab === 'notes' &&
                <NoteBox  />
            }
            {
                 tab === 'screen' && 
                <ScreenBox />
            } 
        </Paper>
        </Grid>
    </Grid>
    )
}


export default Room