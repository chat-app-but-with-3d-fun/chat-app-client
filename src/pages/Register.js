import React, {useState, useEffect} from 'react'
import {Redirect, useHistory} from 'react-router'
import {useSelector} from 'react-redux'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'
import {Stack, Container, Box, ButtonGroup, Button,Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert'
import { selectUserId } from '../features/user/userSlice'
import Logo from '../assets/KOKO.jpg'

const Registration = () => {
  const [formType, setFormType] = useState('signup')
  // const [alert, setAlert] = useState({
  //   msg: '',
  //   code: '',
  //   isOpen: false
  // });
  const userId = useSelector(selectUserId)

  let history = useHistory()

  // const handleClose = (e, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setAlert({...alert, isOpen: false});
  // };

  const setSignupForm = () => {
    setFormType('signup')
    history.push('/sign-up')
  }

  const setLoginForm = () => {
    setFormType('signin')
    history.push('/sign-in')
  }

  // const toastError = (message) => {
  //   setAlert({
  //     msg: message,
  //     code: 'error',
  //     isOpen: true
  //   })
  // }

  useEffect(() => {
    const {location: {pathname}} = history;
    pathname === '/sign-up'
    ? setFormType('signup')
    : setFormType('signin')
  }, [])

  return (
    <Container component="main" maxWidth='xs' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Box sx={{ mb: 2 }}>
        <img src={Logo} alt="Logo" style={{ width: '420px'}} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ButtonGroup sx={{ display: 'flex', justifyContent: 'space-between'}} fullWidth disableElevation>
          <Button
            fullWidth
            variant={`${formType === 'signup' ? 'contained' : 'outlined'}`}
            onClick={setSignupForm}
          >
            Sign up
          </Button>
          <Button
            fullWidth
            variant={`${formType === 'signup' ? 'outlined' : 'contained'}`}
            onClick={setLoginForm}
          >
            Sign In
          </Button>
        </ButtonGroup>
        {
          formType === 'signup'
          ? <SignupForm />
          : <LoginForm />
        }
      </Box>
    </Container>
  )
}

export default Registration