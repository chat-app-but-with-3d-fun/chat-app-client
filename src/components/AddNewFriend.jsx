import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { selectUserId } from "../features/user/userSlice"
import { useAddFriendMutation, useFindUserMutation } from "../features/api/apiSlice"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';


const AddNewFriend = () => {
  const [ userSearch, setUserSearch ] = useState('')
  const [ openDialog, setOpenDialog ] = useState(false);

  const userId = useSelector(selectUserId)

  const [ findUser, { data: usersFound, error, isLoading, isSuccess, isError } ] = useFindUserMutation()
  const [ addFriend, { isLoading: addingFriend } ] = useAddFriendMutation()


  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const findUserHandler = () => {
    console.log('find...', {
      userId,
      input: userSearch
    })
    findUser({
      userId,
      input: userSearch
    })
    setUserSearch('')
  }

  const addFriendHandler = (id) => {
    console.log('friend id', id)
    console.log('object sent', { userId, friendId: id })
    addFriend({ userId, friendId: id })
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleDialogOpen}>
        ADD FRIEND
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        scroll='paper'
      >
        <DialogTitle>Find a user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Friends are those with whom you can communicate in the rooms.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            id="name"
            label="Username / Email"
            type="text"
            variant="standard"
            onChange={(e) => setUserSearch(e.target.value)}
            sx={{ my: 3 }}
          />
          {
            isLoading && <CircularProgress />
          }
          {
            isSuccess && usersFound.map(user =>
              <div style={{ padding: '5px' }} key={user.username}>
                <Button variant='contained' size='small' onClick={() => addFriendHandler(user._id)} sx={{ mr: 2 }}>
                  {
                    addingFriend
                    ? <CircularProgress />
                    : '+'
                  }
                </Button>
                {user.username}
              </div>
            )
          }
          {
            isError && usersFound || error
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={findUserHandler}>Find</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddNewFriend
