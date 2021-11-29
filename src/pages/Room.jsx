
import React, { useEffect, useState } from 'react'
import Chat3D from '../components/Chat3D.js';

import { Box, Paper, Grid } from '@mui/material'
import ChatBox from '../components/ChatBox';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import NoteBox from '../components/NoteBox';
import { useGetMessagesQuery } from "../features/api/apiSlice"
import { useDispatch } from 'react-redux';
import { setRoom } from '../features/room/roomSlice';
import Jitsi from '../components/Jitsi';
import ScreenBox from '../components/ScreenBox';
import { socket } from '../features/api/apiSlice';


const Room = ({ location }) => {
    //state from react-router-dom
    console.log('location ->', location)
    const { state: { roomId, type, roomName } } = location 
    const [tab, setTab] = useState('chat')
    const { data: messageList } = useGetMessagesQuery(roomId, { refetchOnMountOrArgChange: true })
    
    const dispatch = useDispatch()

    const changeTab = (e, newTab) => {
        setTab(newTab);
    }

    useEffect(() => {
        dispatch(
            setRoom(roomId)
        )
    },[roomId])


    return(
    <Grid container sx={{width: '100vw', height: '93vh', marginTop: 8}}>
        
        <Grid item md="6" lg='8' sx={{
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "lightgray"}}>
             <Chat3D location={{ location }}></Chat3D>
             <Jitsi id={roomId} />
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
                    <Tab value="screen" label="Screen" />
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
                <ScreenBox />
            }
        </Paper>
        </Grid>
    </Grid>
    )
}


export default Room