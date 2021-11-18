import React, {useState} from 'react'
import { Container, Box, Paper, Grid, Divider, TextField, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Fab } from '@mui/material'
import ChatBox from '../Components/ChatBox';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import NoteBox from '../Components/NoteBox';
import { useSelector, useDispatch } from "react-redux"
import { useGetMessagesQuery, useSendMessageMutation } from "../features/api/apiSlice"
import { setMessages, selectMessages, selectRoomId, selectRoomName } from "../features/room/roomSlice"
import { selectUserId } from "../features/user/userSlice"
import { useParams } from 'react-router';

 //Here api fetch messages with roomid 
 
//  const user = {_id: 'user001', username: 'Gerda'}



//  const messageList = [
//     {
//         message:    'How are you',
//         sender:     'user001',
//         room:       'roomId',
//         createdAt:  '2021-11-01T11:24:52.111+00:00'  
//     },
//     {
//         message:    'I do not want to talk about',
//         sender:     'userId002',
//         room:       'roomId',
//         createdAt:  '2021-11-02T11:24:52.111+00:00'  
//     },
//     {
//         message:    'ok',
//         sender:     'user001',
//         room:       'roomId',
//         createdAt:  '2021-11-03T11:24:52.111+00:00'  
//     },
//     {
//         message:    'Hey are you folks',
//         sender:     'userId003',
//         room:       'roomId',
//         createdAt:  '2021-11-04T11:24:52.111+00:00'  
//     },
//     {
//         message:    'How are you',
//         sender:     'user001',
//         room:       'roomId',
//         createdAt:  '2021-11-01T11:24:52.111+00:00'  
//     },
//     {
//         message:    'I do not want to talk about',
//         sender:     'userId002',
//         room:       'roomId',
//         createdAt:  '2021-11-02T11:24:52.111+00:00'  
//     },
//     {
//         message:    'ok',
//         sender:     'user001',
//         room:       'roomId',
//         createdAt:  '2021-11-03T11:24:52.111+00:00'  
//     },
//     {
//         message:    'Hey are you folks',
//         sender:     'userId003',
//         room:       'roomId',
//         createdAt:  '2021-11-04T11:24:52.111+00:00'  
//     }
// ]


const Room = ({location}) => {
    //state from react-router-dom
    const { state: { roomId, type, roomName }} = location 
    const [tab, setTab] = useState('chat')

    const { data: messageList } = useGetMessagesQuery(roomId, { refetchOnMountOrArgChange: true })
    
    const changeTab = (e, newTab) => {
        setTab(newTab);
    }

    return(
    <Grid container sx={{width: '100vw', height: '93vh', marginTop: 8}}>
        
        <Grid item md="6" lg='8' sx={{
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "lightgray"}}>
            <Box sx={{
                width: "200px",
                height: "200px",
                backgroundColor: 'green'}}>
                CANVAS
             </Box>
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
                    room={{ roomId, roomName}}
                />
            }
            {
                tab === 'notes' &&
                <NoteBox room={roomName} />
            }
        </Paper>
        </Grid>
    </Grid>
    )
}


export default Room