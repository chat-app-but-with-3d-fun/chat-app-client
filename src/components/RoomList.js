import React, { useRef } from 'react';
import { Link as RouterLink, Redirect, useHistory } from 'react-router-dom'
import { Box } from '@mui/system';
import { Chip } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { Badge } from '@mui/material';
import { createRoom, selectUserRooms } from '../features/user/userSlice';
import NewRoomForm from '../components/NewRoomForm';
import Link from '@mui/material/Link';
import List from '@mui/material/List'
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserFriends,
  selectPublicRooms,
  selectPrivateRooms,
  selectUserId,
  resetMessages
} from '../features/user/userSlice';
import { useGetRoomInfoMutation } from '../features/api/apiSlice';

const RoomList = ({rooms}) => {

  const dispatch      = useDispatch()
  const userFriends   = useSelector(selectUserFriends)
  const userId        = useSelector(selectUserId)
  const [ roomInfo ]  = useGetRoomInfoMutation()
  let history         = useHistory()

  const getName = (room) => {
    const friendId = room.roomName
      .split('-')
      .filter(element =>(element != userId) && (element != 'privatChat')) 
      .join()
    const friendName = userFriends
      .find(element => element._id === friendId)
    return friendName?.username
  }

  const getFriendStatus = (room) => {
    const friendId = room.roomName
      .split('-')
      .filter(element =>(element != userId) && (element != 'privatChat')) 
      .join()
    const friendName = userFriends
      .find(element => element._id === friendId)
    return (
      <Box>
        
        <div style={{ marginRight: '10px', display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: `${friendName?.online ? 'green' : 'red'}`}}>
        </div>
        {friendName?.username}
      </Box>
    )
  }

  const handleLinkClick = (e, room) => {
    e.preventDefault()
    roomInfo({id: room._id})
    dispatch(resetMessages({room: room._id}))
    history.push(`/chat/${room.roomName}`)
  }

  return (
      <List>
        {
          rooms.map((element) => {
            const { room } = element
            return (
              <Box sx={{
                display: 'flex',
                justifyContent: `${element.unread > 0 ? "space-between" : "flex-start"}`,
                alignItems: 'center',
                width: "100%"
              }} 
                key={room._id}
              >
                <ListItem button onClick={(e) => handleLinkClick(e, room)}>
                  <ListItemText
                    primary={
                      room.private ? getFriendStatus(room) : room.roomName
                    }
                  />
                </ListItem>
                {
                  element.unread > 0 && 
                  <Chip
                    label={element.unread}
                    size="small"
                    color="success"
                    sx={{
                      paddingLeft: "10px",
                      paddingRight: "10px"
                    }}
                  />
                }
              </Box>
            )
          })
        }
      </List>
  )
}

export default RoomList