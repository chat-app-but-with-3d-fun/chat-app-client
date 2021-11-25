import React, { useState } from 'react'
import { Box, Paper, Grid, Divider, TextField, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Fab } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { deepPurple } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { selectUserId } from '../features/user/userSlice';
import moment from 'moment';
import { socket } from '../features/api/apiSlice';

const ChatBox = ({ messageList, room }) => {
    const [ message, setMessage ] = useState('')
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
        console.log('sending message ->', message)
        socket.emit('newMsg',
        {
            "type": "chat",
            "room": room.roomId,
            "message": message
        })
        setMessage('')
    }

    return (
       <Grid item xs={12}
         sx={{
            display: 'flex',
            flexDirection: 'column',
            }}
        >
            <Typography variant='h5' align='center'>
                {room.type === 'private' ? `Direct chat with ${room.roomName}` : `Chatting in room ${room.roomName}`}
            </Typography>
            <Box 
                sx={{
                    maxHeight: '70vh',
                    overflowX: 'auto',
                    // overflowY: 'scroll',
                    display: "flex",
                    flexDirection: "column-reverse",
                }}

            >
                <List>
                    {
                        messageList?.messages?.map((message, index) => {
                            const msgDate = message.createdAt.split('.')
                            return (
                                <ListItem key={index}>
                                    <Grid container 
                                        direction='row'
                                        justifyContent={decideSide(message.sender._id)}
                                        spacing={2}
                                    >
                                        {
                                            decideSide(message.sender._id) === 'flex-start' &&
                                            <Grid item>
                                                <Avatar>{`${message.sender.username?.substring(0,1).toUpperCase()}`}</Avatar>
                                            </Grid>
                                        }
                                        <Grid item direction='column'>
                                        <Paper elevation='10' sx={{borderRadius: '10%', padding: "10px"}}>
                                        <Grid item >
                                                <ListItemText primary={message.message}></ListItemText>
                                        </Grid>
                                        <Grid item >
                                            <ListItemText secondary={moment(message.createdAt).calendar('LTS')}></ListItemText>
                                        </Grid>
                                        </Paper>
                                        </Grid>
                                        {
                                            decideSide(message.sender._id) === 'flex-end' && 
                                            <Grid item>
                                                <Avatar sx={{ bgcolor: deepPurple[500] }}>me</Avatar>
                                            </Grid>
                                        }
                                    </Grid>
                                </ListItem>
                            ) 
                        })
                    }
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

export default ChatBox