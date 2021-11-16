import React, { useState } from 'react'
import { Container, Box, Paper, Grid, Divider, TextField, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Fab } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { deepPurple } from '@mui/material/colors';
import { FixedSizeList } from 'react-window';
import { useGetMessagesQuery, useSendMessageMutation } from "../features/api/apiSlice"
import { useSelector } from 'react-redux';
import { selectUserId } from '../features/user/userSlice';


export default function ChatBox(props) {
    const [ message, setMessage ] = useState('')
    const [ sendMessage, { isLoading } ] = useSendMessageMutation()
    const {messageList, room} = props
    const userId = useSelector(selectUserId)
    
    const decideSide = (otherId) => {
        if (userId === otherId){
            return 'flex-end'
        } else {
            return 'flex-start'
        }
     }

     const sendMessageHandler = () => {
        console.log('sending =>', message)
        sendMessage({
          sender: userId,
          roomId: '618a4c50a886683b026cfb54',
          type: 'chat',
          message: message
        })
        setMessage('')
      }
     
     const getDate = (dateInput) => {
        const dateNow   = new Date() 
        const tmpDate   = new Date(dateInput)
        const timePast  = (dateNow-tmpDate)/1000/60/60/24
         return `${Math.floor(timePast)} days ago`
     }

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
                    {messageList.map((element, index) => {
                    return(
                    <ListItem key={index}>
                       <Grid container 
                        direction='row'
                        justifyContent={decideSide(element.sender)}
                        spacing={2}
                        >
                           {decideSide(element.sender) === 'flex-start' &&
                                <Grid item>
                                    <Avatar>{`${element.sender[0]}`}</Avatar>
                                </Grid>}
                           <Grid item direction='column'>
                           <Paper elevation='10' sx={{borderRadius: '10%', padding: "10px"}}>
                           <Grid item >
                                <ListItemText   primary={element.message}></ListItemText>
                           </Grid>
                           <Grid item >
                               <ListItemText secondary={getDate(element.createdAt)}></ListItemText>
                           </Grid>
                           </Paper>
                           </Grid>
                           {decideSide(element.sender) === 'flex-end' && 
                                <Grid item>
                                    <Avatar sx={{ bgcolor: deepPurple[500] }}>me</Avatar>
                                </Grid>} 
                       </Grid>
                    </ListItem> 
                     )})}
                </List>
                </Box>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add" onClick={sendMessageHandler}><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        

    )
}
