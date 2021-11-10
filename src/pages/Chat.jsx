import React from 'react'
import { Container, Box, Paper, Grid, Divider, TextField, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Fab } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';


 //Here api fetch messages with roomid 
 
 const user = {_id: 'user001', username: 'Gerda'}



 const messageList = [
    {
        message:    'How are you',
        sender:     'user001',
        room:       'roomId',
        createdAt:  '2021-11-01T11:24:52.111+00:00'  
    },
    {
        message:    'I do not want to talk about',
        sender:     'userId002',
        room:       'roomId',
        createdAt:  '2021-11-02T11:24:52.111+00:00'  
    },
    {
        message:    'ok',
        sender:     'user001',
        room:       'roomId',
        createdAt:  '2021-11-03T11:24:52.111+00:00'  
    },
    {
        message:    'Hey are you folks',
        sender:     'userId003',
        room:       'roomId',
        createdAt:  '2021-11-04T11:24:52.111+00:00'  
    }
]


export default function Chat({location}) {
    //state from react-router-dom
    const {state} = location    
    const {roomId, type, roomName } = state
    
    
    const decideSide = (otherId) => {
        if (user._id === otherId){
            return 'flex-start'
        } else {
            return 'flex-end'
        }
     }
     
     const getDate = (dateInput) => {
        const dateNow   = new Date() 
        const tmpDate   = new Date(dateInput)
        const timePast  = (dateNow-tmpDate)/1000/60/60/24
         return `${Math.floor(timePast)} days ago`
     }

    return(
    <Container maxWidth='xl'>
        
        <Box
         sx={{
            marginTop: 12,
            marginLeft: 50,
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid green'
            }}
          >
        <Typography variant='h5' align='center'>Chat in {roomName}</Typography>
            <Grid item xs={12}>
                <List >
                    {messageList.map((element, index) => {
                    return(
                    <ListItem key={index}>
                       <Grid container 
                        direction='column'
                        alignItems={decideSide(element.sender)}
                        >
                           <Paper elevation='10' sx={{borderRadius: '10%', padding: "10px"}}>
                           <Grid item >
                                <ListItemText   primary={element.message}></ListItemText>
                           </Grid>
                           <Grid item >
                               <ListItemText secondary={getDate(element.createdAt)}></ListItemText>
                           </Grid>
                           </Paper>
                       </Grid>
                    </ListItem> 
                     )})}
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        
        
        {/* </Paper> */}
        </Box>
        
    </Container>
    )




    // return (
    //     <Container maxWidth='xl'>
    //         <Box
    //         sx={{
    //           marginTop: 12,
    //           display: 'flex',
    //           flexDirection: 'column',
    //           alignItems: 'center',
    //           border: '1px solid green'
    //         }}
    //       >
    //         <h3>Chat in {roomName}</h3>
    //         {messageList.map((element) => {
    //             return (
    //                 <div>{element.message}</div>
    //             )
    //         })}
    //         </Box>
    //     </Container>
    // )
}
