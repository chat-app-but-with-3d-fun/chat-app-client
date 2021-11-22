import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCreateRoomMutation } from '../features/api/apiSlice';


const NewRoomForm = () => {
  const [ newRoomName, setNewRoomName ] = useState('')
  const [ openRoomDialog, setOpenRoomDialog ] = useState(false);

  const [ createRoom ] = useCreateRoomMutation()

  const handleRoomDialogOpen = () => {
    setOpenRoomDialog(true);
  };

  const handleRoomDialogClose = () => {
    setOpenRoomDialog(false);
  };

  const createNewChatHandler = () => {
    console.log('creating room ->', newRoomName)
    createRoom(newRoomName)
    setOpenRoomDialog(false);
    setNewRoomName('')
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleRoomDialogOpen}>
        ADD NEW ROOM
      </Button>
      <Dialog open={openRoomDialog} onClose={handleRoomDialogClose}>
        <DialogTitle>Create a room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rooms are where you and your friends communicates.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            id="name"
            label="Name"
            type="text"
            variant="standard"
            onChange={(e) => setNewRoomName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRoomDialogClose}>Cancel</Button>
          <Button onClick={createNewChatHandler}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewRoomForm
