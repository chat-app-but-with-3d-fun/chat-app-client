import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccordionComponent from '../Components/accordion';
import RoomList from '../Components/RoomList';
import { Badge, Chip } from '@mui/material';
import {useGetConnectionQuery} from '../features/api/apiSlice'




const drawerWidth = 240;



export default function Sidebar(props) {

  const rooms = [
    {room: 'Kitchen', private: false, unread: 0},
    {room: "Lobby", private: false, unread: 2},
    {room: 'School', private: false, unread: 5},
    {room: 'private-xyz-xyz', private: true, unread: 1}]
  
  const friends = [
    {username: 'Gerda', _id: 12345, online: true},
    {username: "Helga", _id: 12346, online: true},
    {username: 'Lucas', _id: 12347, online: false},
    {username: 'Aimee', _id: 12348, online: false}
  ]
  
  const [unreadMsg, setUnreadMsg] = useState(null) 
  const [unreadPri, setUnreadPri] = useState(null)
  
  const [active, setActive] = useState(true)

  const calculateUnreadTotal = () => {
    const unreadTotal = rooms.reduce((acc, cur) => {
      return acc + cur.unread}, 0
      )
      return unreadTotal
    }
  

  useEffect(( ) => {
      const unread = calculateUnreadTotal()
      setUnreadMsg(unread)
    }, [rooms] )


//Would be nice to shrink the drawer when a chat window opens, for this a global state about the current postion could be used
//api fetch for rooms and friends
//LISTENER register for status change so api fetch can be redone (e.g. friend gets online)

 return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: "gray" }}
      >
       
        <Toolbar >
          <Typography variant="h5" noWrap component="div">
            KoKo
              <Typography variant="subtitle1" noWrap component="span" sx={{marginLeft: '20px'}}>Kommunikations-Kombinat</Typography>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
       
        <Divider />
        <AccordionComponent 
          expanded={true} 
          headline={
            // <Badge badgeContent={unreadMsg} color="primary"> 
              <Box sx={{display: 'flex', justifyContent: 'space-around', width: "100%"}}>
              <Typography>Rooms</Typography>
              <Chip label={unreadMsg} size="small" color="success" sx={{paddingLeft: "10px", paddingRight: "10px"}} />
              </Box>
            // </Badge>
          }
          
          body={<RoomList />}
        />
       
       <AccordionComponent expanded={false} headline="Friends" body={
          <List>
           {friends.map((el, index) => (
             <ListItem button key={el.username}>
                <ListItemText primary={el.username} />
             </ListItem>
           ))}
         </List>
        } />
        


      </Drawer>
     {props.children}
 
    </Box>
  );
}