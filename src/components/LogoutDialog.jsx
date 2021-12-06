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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ borderRadius: '10px'}}
      >
        <div className='logout-container'>
          <h3>Hey, {username.toUpperCase()}!</h3>
          <p>Are you sure you want to disconnect? We will miss you...</p>
          <div className='logout-container__buttons'>
            <Button sx={{ fontWeight: 'bold'}} color='error' onClick={handleClose}>
              Cancel
            </Button>
            <Button sx={{ fontWeight: 'bold'}} color='success' onClick={handleLogout}>
              Accept
            </Button>
          </div>
        </div>
      </Dialog>
  )
}

export default LogoutDialog
