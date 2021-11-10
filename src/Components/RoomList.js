import React, {useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom'
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { Badge } from '@mui/material';
import Link from '@mui/material/Link';


export default function RoomList() {

  const rooms = [
    {_id: '001', room: 'Kitchen', private: false, unread: 0},
    {_id: '002', room: "Lobby", private: false, unread: 2},
    {_id: '003', room: 'School', private: false, unread: 5},
    {_id: '004', room: 'private-xyz-xyz', private: true, unread: 1}]

  return (
        <List>
        {rooms.map((element, index) => {
          if (!element.private){
            return (
              <Link 
                color='inherit'
                underline='hover'
                component={RouterLink} 
                to={{
                  pathname: `/chat/`,
                  state: {
                    type:     'group',
                    roomId:   `${element._id}`,
                    roomName: `${element.room}`}
                }}>
                <ListItem button key={element.room}>
                 <Badge badgeContent={element.unread} color="primary"> 
                  <ListItemText primary={element.room} />
                 </Badge>
                </ListItem>
              </Link>
            )}
          })
      }
      </List>
    )
}
