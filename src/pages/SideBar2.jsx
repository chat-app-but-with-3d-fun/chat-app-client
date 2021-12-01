import React, {useState, useEffect} from 'react';
import { Redirect, useHistory } from 'react-router';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AccordionComponent from '../components/accordion';
import RoomList from '../components/RoomList';
import { useDispatch, useSelector } from 'react-redux';
import {
   selectPublicRooms,
   selectPrivateRooms,
   selectUnreadPrivate,
   selectUnreadPublic,
} from '../features/user/userSlice';
import NewRoomForm from '../components/NewRoomForm';
import {selectDrawer} from '../features/page/pageSlice'
import AddNewFriend from '../components/AddNewFriend';

import { styled, useTheme } from '@mui/material/styles';
import logo from '../assets/KOKO-black.png'
import pageSlice from '../features/page/pageSlice'
import {toggleDrawer} from '../features/page/pageSlice';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useLogoutUserQuery } from '../features/api/apiSlice';
import LogoutDialog from '../components/LogoutDialog';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(0),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    backgroundColor: 'black',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));


export default function Sidebar({children}) {

  const theme = useTheme();
  const [ open, setOpen ] = useState(true);
  const [ openDialog, setOpenDialog ] = useState(false);

  const dispatch = useDispatch()
  let history = useHistory()

  const privateRooms = useSelector(selectPrivateRooms)
  const publicRooms = useSelector(selectPublicRooms)
  const unreadPrivate = useSelector(selectUnreadPrivate)
  const unreadPublic = useSelector(selectUnreadPublic)
  const drawerOpen = useSelector(selectDrawer)

  const handleDrawerOpen = () => {
    dispatch(
      pageSlice.actions.toggleDrawer()
    )
  };

  const handleDrawerClose = () => {
    dispatch(
      toggleDrawer()
    )
  };

  const handleDialogOpen = () => {
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
  }



  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        open={open}
        
      >
       
        <Toolbar sx={{backgroundColor: 'grey',}} >
          <button onClick={handleDrawerOpen} sx={{ mr: 2, ...(open && { display: 'none' }) }}>Open</button>
        </Toolbar>
      </AppBar> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: "black",
            color: "white",
          }
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <DrawerHeader >
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* <CloseIcon onClick={handleDrawerClose} sx={{ alignSelf: 
            'end', mt: 1}} /> */}
            <img src={logo} alt="LOGO" style={{ width: '240px' }} />
            <div className='sidebar__functional_buttons' style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LogoutIcon onClick={handleDialogOpen} sx={{ mx: 3 }} />
                <small style={{ fontSize: '10px'}}>Log out</small>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <DashboardIcon onClick={() => history.push('/dashboard')} sx={{ mx: 3 }} />
                <small style={{ fontSize: '10px'}}>Dashboard</small>
              </div>
            </div>
          </Box>
        </DrawerHeader>
        <Toolbar />
        <Divider />
        <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: '20px', mt: '-30px'}}>
          <AccordionComponent 
            expanded={true} 
            headline={
              <Box sx={{display: 'flex', justifyContent: 'space-between', width: "100%"}}>
                <Typography 
                  fontWeight='bold'
                  fontFamily='courier'
                >
                  ROOMS
                </Typography>
                <Typography
                  sx={{
                    background: 'lightgrey',
                    color: 'black',
                    paddingLeft: '6px',
                    paddingRight: '6px',
                    borderRadius: '20%',
                    marginRight: '10px'
                  }}
                >
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
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
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
                    color: 'black',
                    paddingLeft: '6px',
                    paddingRight: '6px',
                    borderRadius: '20%',
                    marginRight: '10px'
                  }}
                >
                  {unreadPrivate}
                </Typography>
              </Box>
            }
            body={
              <>
                <AddNewFriend />
                <RoomList rooms={privateRooms} />
              </>
            }
          />
        </Box>
      </Drawer>
      <Main open={drawerOpen}>
        <DrawerHeader sx={{display: 'none'}} />
        {children}
      </Main>
    </Box>
    <LogoutDialog open={openDialog} handleClose={handleDialogClose} />
    </>
  )
}