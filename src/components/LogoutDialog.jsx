import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { selectUserName } from '../features/user/userSlice';
import { Redirect, useHistory } from 'react-router';
import { useLogoutUserMutation } from '../features/api/apiSlice';

const LogoutDialog = ({open, handleClose}) => {
  const [ logoutUser, { isSuccess } ] = useLogoutUserMutation()

  const username = useSelector(selectUserName)
  const history = useHistory()

  const handleLogout = async () => {
    await logoutUser()
    console.log('successfully logged out');
    history.push('/sign-in')
  }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ background: 'linear-gradient(180deg, rgba(207,60,178,1) 0%, rgba(88,2,71,1) 90%)', color: 'white' }}>
          Hey, {username}!
        </DialogTitle>
        <DialogContent sx={{ background: 'linear-gradient(180deg, rgba(88,2,71,1) 10%, rgba(0,0,0,1) 60%, rgba(10,24,145,1) 100%)', color: 'white' }}>
          <DialogContentText id="alert-dialog-description" sx={{ color: 'white' }} >
            Are you sure you want to disconnect? We will miss you...
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ background: 'linear-gradient(180deg, rgba(10,24,145,1) 0%, rgba(55,76,255,1) 100%)' }}>
          <Button sx={{ color: 'white' }} onClick={handleClose}>Cancel</Button>
          <Button sx={{ color: 'white' }} onClick={handleLogout}>Accept</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default LogoutDialog
