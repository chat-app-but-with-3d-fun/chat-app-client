import React from 'react';
import { Link } from 'react-router-dom'
import { Box } from '@mui/system';
import List from '@mui/material/List';
import { Chip } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUserRooms } from '../features/user/userSlice';
import NewRoomForm from '../components/NewRoomForm';


const RoomList = () => {

  const userRooms = useSelector(selectUserRooms)

  console.log('User ROOMS: ', userRooms)

  return (
    <>
    <NewRoomForm />
    <List>
      {
        userRooms.map((element) => {
          const { room } = element
          if (!room.private) {
            return (
              <Box sx={{width: "100%"}} key={room._id}>
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
    </>
  )
}

export default RoomList