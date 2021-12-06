import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useSignupUserMutation} from '../features/api/apiSlice';
import {setUser} from '../features/user/userSlice';
import { CircularProgress } from '@mui/material';

const initialState = {
  username: '',
  email: '',
  password: ''
}

const SignupForm = () => {
  const [inputs, setInputs] = useState(initialState)
  const [signupUser, {data: userData, error, isLoading, isSuccess, isError }] = useSignupUserMutation()
  const dispatch = useDispatch()

  const handleInput = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signupUser(inputs)
  }

  if (isError) console.log('ERROR =>', error)
  if (isSuccess) {
    console.log(`Welcome, ${userData.username}`)
    dispatch(
      setUser(userData)
    )
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            sx={{ backgroundColor: '#eaf2ff', borderRadius: '4px'}}
            required
            fullWidth
            variant='filled'
            name="username"
            label='Username'
            size='small'
            onChange={handleInput}
            autoComplete='off'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ backgroundColor: '#eaf2ff', borderRadius: '4px'}}
            required
            fullWidth
            variant='filled'
            color='secondary'
            name="email"
            label='Email'
            size='small'
            onChange={handleInput}
            autoComplete='off'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ backgroundColor: '#eaf2ff', borderRadius: '4px'}}
            required
            fullWidth
            variant='filled'
            size='small'
            type='password'
            label='Password'
            name="password"
            onChange={handleInput}
            autoComplete='off'
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button
            type='submit'
            fullWidth
            variant="contained"
            color='secondary'
          >
            {isLoading ? <CircularProgress size={25} thickness={6} disableShrink /> : 'CREATE ACCOUNT'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SignupForm
