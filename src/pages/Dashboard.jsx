import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setRoom } from "../features/room/roomSlice"
import { selectUserName } from "../features/user/userSlice"


const Dashboard = () => {
  
  
  const dispatch = useDispatch()
  const name = useSelector(selectUserName)
  
  useEffect(() => {
    dispatch(
      setRoom({roomId: null, roomUsers: null})
    )
  }, [dispatch])

  const handleLogout = async() => {
    try {
      const res = await (
        await fetch(`https://mysterious-basin-77886.herokuapp.com/user/logout`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
      ).json();
     
      console.log('RESULT OF LOGOUT: ', res)
    } catch(error){
      console.log('ERROROR: ',error)
    }
  }

  return (
    <Box sx={{
      width: "88vw", 
      height: '98vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      color: 'green'}}>
      <h1>DASHBOARD</h1>
      <p>Welcome back {name}</p>
      <p>Your last Login was: </p>
      <p>You missed XX messages. Select your channel you wanne Chat</p>
      <p>You have right now XX friends online.</p>
      <p>You are using XX rooms.</p> 
    </Box>
  )
}

export default Dashboard
