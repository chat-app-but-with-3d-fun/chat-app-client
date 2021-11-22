import React, {useEffect} from 'react';
import List from '@mui/material/List';
import { Link } from 'react-router-dom'
import { Box } from '@mui/system';
import { Chip } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { Badge } from '@mui/material';
// import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRooms } from '../features/user/userSlice';
import { setRoom } from '../features/room/roomSlice';


const RoomList = () => {

  const userRooms = useSelector(selectUserRooms)

  // const selectRoomHandler = (id, name) => {
  //   console.log('changing to room ->', name)
  //   dispatch(setRoom({id, name}))
  // }

  // const rooms = [
  //   {_id: '001', room: 'Kitchen', private: false, unread: 0},
  //   {_id: '002', room: "Lobby", private: false, unread: 2},
  //   {_id: '003', room: 'School', private: false, unread: 5},
  //   {_id: '004', room: 'private-xyz-xyz', private: true, unread: 1}]
  console.log('User ROOMS: ', userRooms)
  return (
    <List>
      {
        userRooms.map((element) => {
          const { room } = element
          console.log(room._id)
          if (!room.private) {
            return (
              <Box sx={{display: 'flex', justifyContent: 'space-around', width: "100%"}} key={room._id}>
                <Link 
                  to={{
                    pathname: `/chat/${room.roomName}`,
                    state: {
                      roomId: room._id,
                      type: 'chat',
                      roomName: room.roomName
                    }
                  }}
                >
                  <ListItem button>
                    <Badge badgeContent={element.unread} color="primary"> 
                      <ListItemText primary={room.roomName} />
                    </Badge>
                  </ListItem>
                </Link>
                {
                  element.unread > 0 && 
                    <Chip label={element.unread} size="small" color="success" sx={{paddingLeft: "10px", paddingRight: "10px"}} />
                }
              </Box>
            )
        }})}
    </List>
    
  )
}

export default RoomList