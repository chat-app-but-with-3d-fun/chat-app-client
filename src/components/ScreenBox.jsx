import React,{useState, useEffect} from 'react'
import { Container, Button, ButtonGroup, Box, Paper, Grid, Divider, TextField, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Fab } from '@mui/material'
import { useSelector } from 'react-redux';
import { selectUserFriends } from '../features/user/userSlice';
import {selectRoomUsers} from '../features/room/roomSlice'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useInviteFriendToRoomMutation } from "../features/api/apiSlice"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

export default function ScreenBox(props) {
    const {users, id} = props
    const userFriends = useSelector(selectUserFriends)
    const roomUsers = useSelector(selectRoomUsers)

    const [newUser, setNewUser] = useState('')
    const [filterUser, setFilterUser] = useState(null)
    const [ inviteFriendToRoom, { isLoading: inviteFriend } ] = useInviteFriendToRoomMutation()
    

    const handleChange = (event) => {
        setNewUser(event.target.value);
    };


      useEffect(() => {
          if (newUser) {
            inviteFriendToRoom(
                {friendId: newUser,
                roomId: id})}
            setNewUser(() => null)
      }, [newUser])

      useEffect(() => {
        if (roomUsers){
            const tmpArr = userFriends.filter(friend => {
                return !roomUsers.find(usersInside => usersInside._id === friend._id) 
            })
            if (tmpArr.length > 0) {
                setFilterUser(() => tmpArr)
            } else {
                console.log('FILTER USER SHOULD BE ZERO')
                setFilterUser(() => null)
            }
            
        }
      }, [roomUsers, userFriends])


    return (
        <Paper
        elevation="10"
        sx={{display: 'flex',
            flexDirection: 'column'}}
        >
            <Grid item xs={12}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <Typography variant='h5' align='center' sx={{marginTop: '20px'}}>Room Settings</Typography>
                <Box sx={{height: '85vh', display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Box sx={{width: "80%"}}>
                        <Typography variant='h6' sx={{marginTop: '20px', marginBottom: '10px'}}>Who can attend this room?</Typography>
                        <Stack direction="row" spacing={1}> 
                        {roomUsers?.map((element, index) => {
                            return(
                            <Chip label={`${element.username}`} variant="outlined" />
                            )
                        })}
                        </Stack>
                        {filterUser ? 
                         <FormControl fullWidth sx={{margin: '20px'}}>
                            <InputLabel id="demo-simple-select-label">Add a friend</InputLabel>
                            <Select
                                labelId="friend-select-label"
                                id="friend-select"
                                value={newUser}
                                label="Add User"
                                onChange={handleChange}
                            >
                            {filterUser.map((element,index) => {
                               return(
                                   <MenuItem value={element._id}>{element.username}</MenuItem>
                               )
                            })}
                            </Select>
                        </FormControl> :
                       <Alert sx={{marginTop: '10px'}}severity="success">All your friends are in this room</Alert>
                    }
                        
                    </Box>
                </Box>


            </Grid>

        </Paper>
    )
}