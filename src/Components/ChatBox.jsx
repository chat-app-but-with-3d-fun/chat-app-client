import React, { useState } from 'react'
import { Container, Box, Paper, Grid, Divider, TextField, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Fab } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { deepPurple } from '@mui/material/colors';
import { FixedSizeList } from 'react-window';
import { useGetMessagesQuery, useSendMessageMutation } from "../features/api/apiSlice"
import { useSelector } from 'react-redux';
import { selectUserId } from '../features/user/userSlice';
import moment from 'moment';
import { socket } from '../features/api/apiSlice';


export default function ChatBox(props) {
    const [ message, setMessage ] = useState('')
    const { messageList, room} = props
    const userId = useSelector(selectUserId)
    
    const decideSide = (otherId) => {
        if (userId === otherId){
            return 'flex-end'
        } else {
            return 'flex-start'
        }
    }

    const inputHandler = (e) => {
        setMessage(e.target.value)
    }

    const sendMessageHandler = () => {
        console.log('sending =>', message)
        console.log('socket', socket)
        socket.emit('newMsg',
        {
            "type": "chat",
            "room": "6193c7b9f22b07537058e75f",
            "message": message
        })
        setMessage('')
    }
     
    // const getDate = (dateInput) => {
    //     const dateNow   = new Date() 
    //     const tmpDate   = new Date(dateInput)
    //     const timePast  = (dateNow-tmpDate)/1000/60/60/24
    //     return `${Math.floor(timePast)} days ago`
    // }


    return (
      
       <Grid item xs={12}
         sx={{
            display: 'flex',
            flexDirection: 'column',
            }}
        >
                <Typography variant='h5' align='center'>Chat in {room}</Typography>
                <Box 
                    sx={{
                        maxHeight: '70vh',
                        overflowX: 'hidden',
                        overflowY: 'scroll'
                    }}
                >
                <List>
                    {messageList?.messages?.map((message, index) => {
                        return (
                            <ListItem key={index}>
                                <Grid container 
                                    direction='row'
                                    justifyContent={decideSide(message.sender)}
                                    spacing={2}
                                >
                                    {
                                        decideSide(message.sender) === 'flex-start' &&
                                        <Grid item>
                                            <Avatar>{`${message.sender[0]}`}</Avatar>
                                        </Grid>
                                    }
                                    <Grid item direction='column'>
                                    <Paper elevation='10' sx={{borderRadius: '10%', padding: "10px"}}>
                                    <Grid item >
                                            <ListItemText primary={message.message}></ListItemText>
                                    </Grid>
                                    <Grid item >
                                        <ListItemText secondary={moment().calendar()}></ListItemText>
                                    </Grid>
                                    </Paper>
                                    </Grid>
                                    {
                                        decideSide(message.sender) === 'flex-end' && 
                                        <Grid item>
                                            <Avatar sx={{ bgcolor: deepPurple[500] }}>me</Avatar>
                                        </Grid>
                                    }
                                </Grid>
                            </ListItem> 
                        )
                    })}
                </List>
                </Box>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" value={message} onChange={inputHandler} fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add" onClick={sendMessageHandler}><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        

    )
}
