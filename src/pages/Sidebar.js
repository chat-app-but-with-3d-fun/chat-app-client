import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AccordionComponent from '../components/accordion';
import RoomList from '../components/RoomList';
import { useSelector } from 'react-redux';
import {
   selectPublicRooms,
   selectPrivateRooms,
   selectUnreadPrivate,
   selectUnreadPublic
} from '../features/user/userSlice';
import NewRoomForm from '../components/NewRoomForm';


const drawerWidth = 240;

export default function Sidebar(props) {

  const privateRooms = useSelector(selectPrivateRooms)
  const publicRooms = useSelector(selectPublicRooms)
  const unreadPrivate = useSelector(selectUnreadPrivate)
  const unreadPublic = useSelector(selectUnreadPublic)

  
  //  const [unreadPrivate, setUnreadPrivate] = useState(null) 
  //  const [unreadPublic, setUnreadPublic] = useState(null)
  
 
  // const calculateUnread = () => {
     
  //     const countUnreadPub = publicRooms.reduce((acc, cur) => {
  //       return acc + cur.unread}, 0
  //       )
  //     const countUnreadPriv = privateRooms.reduce((acc, cur) => {
  //       return acc + cur.unread}, 0
  //       )
      
  //     return {countUnreadPub, countUnreadPriv}
    
  //   }
  
 

  // useEffect(( ) => {
  //     const unread = calculateUnread()
  //     const {countUnreadPriv, countUnreadPub} = unread
  //     setUnreadPrivate(() => countUnreadPriv)
  //     setUnreadPublic(() => countUnreadPub)
  //   }, [] )


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
              <Box sx={{display: 'flex', justifyContent: 'space-between', width: "100%"}}>
              <Typography 
                fontWeight='bold'
                >ROOMS
              </Typography>
              <Typography
              sx={{
                background: 'lightgrey',
                color: 'grey',
                paddingLeft: '6px',
                paddingRight: '6px',
                borderRadius: '20%',
                marginRight: '10px'
              }} >
                {unreadPublic}
              </Typography>
              </Box>
          }
          
          body={
          <>
          <NewRoomForm />
          <RoomList rooms={publicRooms}/>
          </>
          }
        />
       
       <AccordionComponent 
          expanded={false} 
          headline={
              <Box sx={{display: 'flex', justifyContent: 'space-between', width: "100%"}}>
                <Typography 
                  fontWeight='bold'
                >
                  FRIENDS
                </Typography> 
                <Typography
                  sx={{
                    background: 'lightgrey',
                    color: 'grey',
                    paddingLeft: '6px',
                    paddingRight: '6px',
                    borderRadius: '20%',
                    marginRight: '10px'
                  }} >
                {unreadPrivate}
              </Typography>
              </Box>
            }
          body={
          <>
            <button>Add a friend</button>
            <RoomList rooms={privateRooms}/>
          </>
          }
        />
      </Drawer>
     {props.children}
 
    </Box>
  );
}