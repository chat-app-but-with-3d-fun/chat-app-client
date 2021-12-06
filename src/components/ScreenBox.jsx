import React,{useState, useEffect} from 'react'
import { Container, Button, ButtonGroup, Box, Paper, Grid, Divider, TextField, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Fab } from '@mui/material'
import { useSelector } from 'react-redux';
import { selectUserFriends, selectUserId } from '../features/user/userSlice';
import {selectRoomUsers, selectRoom, selectActiveUsers, selectRoomId} from '../features/room/roomSlice'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useInviteFriendToRoomMutation } from "../features/api/apiSlice"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

const ScreenBox = (props) => {
  const userFriends = useSelector(selectUserFriends)
  const roomUsers = useSelector(selectRoomUsers)
  const activeUsers = useSelector(selectActiveUsers)
  const roomId    = useSelector(selectRoomId)
  const room      = useSelector(selectRoom)
  const ownId     = useSelector(selectUserId)

  const [newUser, setNewUser] = useState('')
  const [filterUser, setFilterUser] = useState(null)
  const [activeUserData, setActiveUserData] = useState(null)
  const [ inviteFriendToRoom, { isLoading: inviteFriend } ] = useInviteFriendToRoomMutation()
  
  const handleChange = (event) => {
      setNewUser(event.target.value);
  };

  useEffect(() => {
    if (newUser) {
      inviteFriendToRoom({
        friendId: newUser,
        roomId
      })
    }
    setNewUser(() => null)
  }, [newUser, roomId])

  useEffect(() => {
    if (roomUsers) {
      const tmpArr = userFriends.filter(friend =>
        !roomUsers.find(usersInside => usersInside._id === friend._id) 
      )

      if (tmpArr.length > 0) {
        setFilterUser(() => tmpArr)
      } else {
        console.log('FILTER USER SHOULD BE ZERO')
        setFilterUser(() => null)
      }   
    }
  }, [roomUsers, userFriends])

  useEffect(() => {
    const tmpArray = activeUsers.map((element) =>
      roomUsers.find(user => user._id === element) 
    )
    setActiveUserData(() => tmpArray)
  }, [activeUsers])

  return (
    <Grid item
      xs={12}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
      }}
    >
      <Typography
        variant='h5'
        align='center'
        sx={{
          marginY: '15px',
          zIndex: '9999'
        }}
      >
        Room Settings
      </Typography>
      <Box
        sx={{
          height: '85vh',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: '999'
        }}
      >
        <Box 
          sx={{
            width: "80%"
          }}
        >
          <Typography
            sx={{
              marginY: '15px',
            }}
          >
            Who else is here?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexFlow: 'row wrap'
            }}
          >
            {
              activeUserData?.map((user) =>
                <Chip
                  label={`${user.username}`}
                  variant="outlined"
                  sx={{ color: 'white', margin: '5px' }}
                  color='secondary'
                />
              )
            }
          </Box>
          <Typography
            variant='h6'
            sx={{
              marginTop: '20px',
              marginBottom: '10px',
            }}
          >
            Who can attend this room?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexFlow: 'row wrap'
            }}
          > 
            {
              roomUsers?.map((user) => {
                if (user._id === ownId) {
                  return (
                    <Chip
                      label={`me`}
                      variant="filled"
                      sx={{ color: 'white', margin: '5px' }}
                      color='secondary'
                    />
                  )
                }
                return (
                  <Chip
                    label={`${user.username}`}
                    variant="outlined"
                    sx={{ color: 'white', margin: '5px' }}
                    color='secondary'
                  />
                )
              })
            }
          </Box>
          {
            filterUser
            ? <FormControl
                fullWidth
                sx={{
                  marginY: '20px'
                }}
              >
                <InputLabel
                  id="demo-simple-select-label"
                  color={'white'}
                >
                  Add a friend
                </InputLabel>
                <Select
                  labelId="friend-select-label"
                  id="friend-select"
                  value={newUser}
                  label="Add User"
                  onChange={handleChange}
                  color='secondary'
                  autoFocus={true}
                  sx={{
                    backgroundColor: 'grey',
                    color: 'white',
                    boxShadow: '0 0 7.5px white',
                  }}
                >
                  {
                    filterUser.map((user) =>
                      <MenuItem
                        value={user._id}
                      >
                        {user.username}
                      </MenuItem>
                    )
                  }
                </Select>
              </FormControl>
            : <Alert
                severity="success"
                sx={{
                  marginTop: '20px',
                  backgroundColor: 'transparent',
                  fontWeight: 'bold',
                  padding: 0,
                  color: 'white'
                }}
              >
                All your friends are in this room
              </Alert>
          }
        </Box>
      </Box>
    </Grid>
  )
}

export default ScreenBox