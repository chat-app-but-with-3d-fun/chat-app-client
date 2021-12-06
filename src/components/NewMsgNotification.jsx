import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Fab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../features/api/apiSlice';
import SendIcon from '@mui/icons-material/Send';
import { Grid } from '@mui/material';
import { closeNotification, selectNotification } from '../features/notifications/notificationSlice';

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
    setMessage(e.target.value)
  }

  const sendMessageHandler = (e) => {
    e.preventDefault()
    socket.emit(
      'newMsg',
      {
        "type": "chat",
        "room": newMsg.room,
        "message": message
      })
    setMessage('')
  }

  return (
    <Snackbar
      sx={{
        minWidth: 320,
        zIndex: 9999,
        borderRadius: 3,
        background: 'black',
        background: 'linear-gradient(180deg, rgba(131,71,145,1) 15%, rgba(79,44,106,1) 40%, rgba(49,21,70,1) 70%, black 100%)',
        color: 'white',
        padding: '10px',
        boxShadow: '0 0 7.5px white'
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={newMsg?.show}
      onClose={handleClose}
      autoHideDuration={12000}
    >
      <div className='msg-notification'>
        <div className='msg-notification__first-row'>
          <h4><i>New message from</i> <b>{newMsg?.sender?.username}</b></h4>
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
              <input type="text" value={message} onChange={inputHandler} />
            </Grid>
            
            <Grid xs={2}>
              <Fab color="primary" sx={{ ml: 1 }} size="small" variant='contained' aria-label="add" onClick={sendMessageHandler}>
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </form>
      </div>
    </Snackbar>
  );
}

export default NewMsgNotification
