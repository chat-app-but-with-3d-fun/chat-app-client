import React, {useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom'
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { Badge } from '@mui/material';
import Link from '@mui/material/Link';
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

  return (
    <List>
      {
        userRooms.map((room) => {
          if (!room.private) (
            <Link 
              color='inherit'
              underline='hover'
              component={RouterLink} 
              key={room._id}
              to={{
                pathname: `/chat/${room.name}`,
                state: {
                  type: 'group',
                  roomId:   room._id,
                  roomName: room.roomName
                }
              }}
            >
              <ListItem button onClick>
              {/* <Badge badgeContent={room.unread} color="primary">  */}
                <ListItemText primary={room.name} />
              {/* </Badge> */}
              </ListItem>
            </Link>
          )
        })
      }
    </List>
  )
}

export default RoomList