import React, { useEffect, useRef, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Fab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { socket } from '../features/api/apiSlice';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import { Grid } from '@mui/material';
import InputUnstyled from '@mui/base/InputUnstyled';
import { closeNotification, selectNotification, selectShowNotification, setNotification} from '../features/notifications/notificationSlice';

const NewMsgNotification = () => {
  const [ message, setMessage ] = useState('')
  const newMsg = useSelector(selectNotification)

  const dispatch = useDispatch()

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(
      closeNotification()
    )
  };

  const inputHandler = (e) => {
    console.log('estoy escribiendo.. =>', e.target.value)
    setMessage(e.target.value)
  }

  const sendMessageHandler = (e) => {
    e.preventDefault()
    console.log('sending response ->', message)
    socket.emit(
      'newMsg',
      {
        "type": "chat",
        "room": newMsg.room,
        "message": message
      })
    setMessage('')
  }

  // const EditedTextField = styled(TextField)({
  //   '& label.Mui-focused': {
  //     color: 'black',
  //   },
  //   '& .MuiInput-underline:after': {
  //     borderBottomColor: 'white',
  //   },
  //   '& .MuiOutlinedInput-root': {
  //     '& fieldset': {
  //       borderColor: 'black',
  //       backgroundColor: '#fcfcfb',
  //       border: '1px solid #ced4da',
  //       color: 'black'
  //     },
  //     '&:hover fieldset': {
  //       borderColor: 'white',
  //     },
  //     '&.Mui-focused fieldset': {
  //       borderColor: 'white',
  //       boxShadow: `black 0 0 0 0.2rem`,
  //       color: 'white'
  //     },
  //   },
  // });

  // const BootstrapInput = styled(InputBase)(({ theme }) => ({
  //   'label + &': {
  //     marginTop: theme.spacing(3),
  //   },
  //   '& .MuiInputBase-input': {
  //     borderRadius: 4,
  //     position: 'relative',
  //     backgroundColor: '#fcfcfb',
  //     fontSize: 16,
  //     width: 'auto',
  //     padding: '6px 8px',
  //     transition: theme.transitions.create([
  //       'border-color',
  //       'background-color',
  //       'box-shadow',
  //     ]),
  //     // Use the system font instead of the default Roboto font.
  //     fontFamily: [
  //       '-apple-system',
  //       'BlinkMacSystemFont',
  //       '"Segoe UI"',
  //       'Roboto',
  //       '"Helvetica Neue"',
  //       'Arial',
  //       'sans-serif',
  //       '"Apple Color Emoji"',
  //       '"Segoe UI Emoji"',
  //       '"Segoe UI Symbol"',
  //     ].join(','),
  //     '&:focus': {
  //       borderColor: 'white',
  //     },
  //   },
  // }));

  const StyledInputElement = styled('input')`
    width: 240px;
    font-size: 1rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.4375em;
    background: rgb(243, 246, 249);
    border: 1px solid #e5e8ec;
    border-radius: 10px;
    padding: 6px 10px;
    color: #20262d;

    &:hover {
      background: #eaeef3;
      border-color: #e5e8ec;
    }

    &:focus {
      outline: none;
    }
  `

  const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return (
      <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
    );
  });

  console.log('NEW MSG (slice)!!!!!!!! => ', newMsg)

  return (
    <Snackbar
      sx={{ minWidth: 320, zIndex: 9999, borderRadius: 3, backgroundColor: '#d4418e', backgroundImage: 'linear-gradient(180deg, #d4418e 0%, #0652c5 74%)', color: 'white', padding: '10px' }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={newMsg?.show}
      onClose={handleClose}
      autoHideDuration={10000}
      // action={action}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <small><i>New message from</i> {newMsg?.sender?.username}</small>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <p>{newMsg?.message}</p>
          <form onSubmit={sendMessageHandler}>
            <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Grid item xs={10}>
                <input style={{ padding: '6px 8px', width: '100%'}} type="text" value={message} onChange={inputHandler} />
                {/* <CustomInput aria-label="Demo input" placeholder="Message..." sx={{ width: '100%' }} value={message} onChange={inputHandler} autoComplete='off' /> */}
                {/* <TextField value={message} onChange={inputHandler} variant='filled' fullWidth size='small' autoComplete='off'/> */}
              </Grid>
            
              <Grid xs={2} align="right">
                <Button color="primary" size="small" variant='contained' aria-label="add" onClick={sendMessageHandler}>
                  <SendIcon />
                </Button>
              </Grid>
            </Grid>
          </form>
      </div>
    </Snackbar>
  );
}

export default NewMsgNotification
