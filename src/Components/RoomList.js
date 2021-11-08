import React, {useEffect} from 'react'
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { Badge } from '@mui/material';

export default function RoomList() {

  const rooms = [{room: 'Kitchen', unread: 0}, {room: "Lobby", unread: 2}, {room: 'School', unread: 5}, {room: 'private-xyz-xyz', unread: 1}]


  return (
        <List>
        {rooms.map((element, index) => (
          <ListItem button key={element.room}>
             <Badge badgeContent={element.unread} color="primary"> 
               <ListItemText primary={element.room} />
             </Badge>
          </ListItem>
        ))}
      </List>
    )
}
