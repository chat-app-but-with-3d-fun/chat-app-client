import React, { useState, useRef } from 'react';
import { Redirect, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  Typography,
  Divider,
  Fab
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar'
import AccordionComponent from '../components/accordion'
import { styled, useTheme } from '@mui/material/styles';
import RoomList from '../components/RoomList';
import {
  selectPublicRooms,
  selectPrivateRooms,
  selectUnreadPrivate,
  selectUnreadPublic,
} from '../features/user/userSlice';
import NewRoomForm from '../components/NewRoomForm';
import {selectDrawer} from '../features/page/pageSlice'
import AddNewFriend from '../components/AddNewFriend';
import logo from '../assets/KOKO.png'
import pageSlice, {toggleDrawer} from '../features/page/pageSlice';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useLogoutUserQuery } from '../features/api/apiSlice';
import { selectRoomId } from '../features/room/roomSlice';
import LogoutDialog from '../components/LogoutDialog';
import { Scrollbars } from "rc-scrollbars";

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
  const [ open, setOpen ] = useState(true);
  const [ openDialog, setOpenDialog ] = useState(false);
  const scrollBar = useRef();
  const theme = useTheme();

  const dispatch = useDispatch()
  let history = useHistory()

  const privateRooms = useSelector(selectPrivateRooms)
  const publicRooms = useSelector(selectPublicRooms)
  const unreadPrivate = useSelector(selectUnreadPrivate)
  const unreadPublic = useSelector(selectUnreadPublic)
  const drawerOpen = useSelector(selectDrawer)
  const roomId = useSelector(selectRoomId)

  const handleDrawerOpen = () => {
    dispatch(
      toggleDrawer()
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
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          width: 'fit-content'
        }}
      >
        <Drawer
          className='sidebar'
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
            backgroundColor: "transparent",
            marginY: '50px',
          }}
          PaperProps={{
            sx: {
              backgroundColor: "transparent",
              color: "white",
              px: 1
            }
          }}
          variant="persistent"
          anchor="left"
          open={drawerOpen}
        >
          <DrawerHeader sx={{ mb: 3, backgroundColor: 'transparent' }}>
            <Box className='sidebar__header'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                my: 2, mb: 3
              }}
            >
              {
                roomId &&
                <Fab
                  className='sidebar__header__close-button'
                  color="secondary"
                  aria-label="add"
                  size='small'
                  onClick={handleDrawerClose}
                  sx={{
                    position: 'absolute',
                    top: '3px',
                    right: '3px'
                  }}
                >
                  <CloseIcon/>
                </Fab>
              }
              <img src={logo} alt="LOGO"/>
              <div className='sidebar__header__functional-buttons'>
                <div className='sidebar__header__functional-buttons__button-container'>
                  <LogoutIcon onClick={handleDialogOpen} />
                  <small>Log out</small>
                </div>
                <div className='sidebar__header__functional-buttons__button-container'>
                  <DashboardIcon onClick={() => history.push('/dashboard')}/>
                  <small>Dashboard</small>
                </div>
              </div>
            </Box>
          </DrawerHeader>
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            sx={{ width: "100%" }}
            ref={scrollBar}
          >
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              marginY: '10px',
            }}>
              <AccordionComponent
                expanded={true}
                headline={
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: "100%"
                  }}>
                    <Typography
                      fontWeight='bold'
                      fontFamily='courier'
                    >
                      ROOMS
                    </Typography>
                    <Typography
                      sx={{
                        backgroundColor: 'lightgrey',
                        color: 'black',
                        fontWeight: 'bold',
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
                sx={{
                  backgroundColor: 'red'
                }}
              />
            </Box>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <AccordionComponent
                expanded={false}
                headline={
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: "100%"
                  }}>
                    <Typography
                      fontWeight='bold'
                    >
                      FRIENDS
                    </Typography>
                    <Typography
                      sx={{
                        background: 'lightgrey',
                        color: 'black',
                        fontWeight: 'bold',
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
          </Scrollbars>
        </Drawer>
        <Main open={drawerOpen}>
          <DrawerHeader sx={{display: 'none'}} />
          {children}
        </Main>
        <LogoutDialog
          open={openDialog}
          handleClose={handleDialogClose}
        />
      </Box>
    </>
  )
}