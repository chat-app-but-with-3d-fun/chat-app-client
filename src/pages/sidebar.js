import React, {useState} from 'react';
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
import { Badge } from '@mui/material';




const drawerWidth = 240;
const friends = ['Gerda', "Helga", 'Lucas', 'Aimee']


export default function Sidebar() {
  
  const rooms = [{room: 'Kitchen', unread: 0}, {room: "Lobby", unread: 2}, {room: 'School', unread: 5}, {room: 'private-xyz-xyz', unread: 1}]
  const [active, setActive] = useState(true)

  const calculateUnreadTotal = () => {
    const unreadTotal = rooms.reduce((acc, cur) => {
      return acc + cur.unread}, 0
      )
    }
  
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: "gray" }}
      >
        <Toolbar>
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
        {/* <Typography variant="subtitle1" sx={{marginTop: '10px'}} align="center">Rooms</Typography> */}
        <AccordionComponent 
          expanded={true} 
          headline={ 
          <Badge badgeContent={calculateUnreadTotal()} color="primary"> 
            <Typography >Rooms</Typography>
          </Badge>
          } 
          body={<RoomList />} />
       
       <AccordionComponent expanded={false} headline="Friends" body={
          <List>
           {friends.map((el, index) => (
             <ListItem button key={el}>
                <ListItemText primary={el} />
             </ListItem>
           ))}
         </List>
        } />
        


      </Drawer>
     
    </Box>
  );
}