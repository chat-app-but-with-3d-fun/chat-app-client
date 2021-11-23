import React, {useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { Box } from '@mui/system';
import { Chip } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { Badge } from '@mui/material';
import { selectUserRooms } from '../features/user/userSlice';
import NewRoomForm from '../components/NewRoomForm';
import Link from '@mui/material/Link';
import List from '@mui/material/List'
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserFriends,
  selectPublicRooms,
  selectPrivateRooms,
  selectUserId
} from '../features/user/userSlice';
import { setRoom } from '../features/room/roomSlice';


const RoomList = (props) => {

  const {rooms} = props
  const userFriends = useSelector(selectUserFriends)
  const userId    = useSelector(selectUserId)

  const getName = (room) => {
    const friendId = room.roomName
      .split('-')
      .filter(element =>(element != userId) && (element != 'privatChat')) 
      .join()
    const friendName = userFriends
      .find(element => element._id === friendId)
    console.log('FRIENDNAME: ', friendName?.username)
    
     return friendName?.username
  }
console.log('FRIENDS: ',rooms)
  return (
    <>
    <List>
      {
        rooms.map((element) => {
          const { room } = element
  
            return (
              <Box sx={
                  {display: 'flex',
                   justifyContent: `${element.unread > 0 ? "space-between" : "flex-start"}`,
                   alignItems: 'center',
                   width: "100%"}
                  } 
                   key={room._id}>

                <Link 
                  color='inherit'
                  underline='hover'
                  component={RouterLink}
                  to={{
                    pathname: `/chat/${room.roomName}`,
                    state: {
                      roomId: room._id,
                      type: `${room.private ? 'private' : 'chat'}`,
                      roomName: `${room.private ? getName(room) : room.roomName}`
                    }
                  }}
                >
                  <ListItem button>
                      <ListItemText primary={room.private ? getName(room) : room.roomName} />
                  </ListItem>
                </Link>
                {
                  element.unread > 0 && 
                    <Chip label={element.unread} size="small" color="success" sx={{paddingLeft: "10px", paddingRight: "10px"}} />
                }
              </Box>
            )
        }
        )
        
        }
    </List>
    </>
  )
}

export default RoomList