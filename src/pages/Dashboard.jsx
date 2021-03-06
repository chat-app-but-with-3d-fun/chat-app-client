import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import moment from "moment";
import { setRoom } from "../features/room/roomSlice"
import { selectUserName,
   selectUserFriends,
   selectUnreadPrivate,
   selectUnreadPublic,
   selectPublicRooms,
   selectLastUpdate,
   resetMessages} from "../features/user/userSlice"

import { useGetRoomInfoMutation } from '../features/api/apiSlice';



const Dashboard = () => {
  
  
  const dispatch = useDispatch()
  const [unread, setUnread] = useState(null)
  
  const name          = useSelector(selectUserName)
  const friends       = useSelector(selectUserFriends)
  const unreadPriv    = useSelector(selectUnreadPrivate)
  const unreadPub     = useSelector(selectUnreadPublic)
  const updated       = useSelector(selectLastUpdate)
  const rooms         = useSelector(selectPublicRooms)
  const [ roomInfo ]  = useGetRoomInfoMutation()
  let history         = useHistory()


  const handleRandomPick = () => {
      const index    = Math.floor(Math.random() * rooms.length)
      roomInfo({id: rooms[index].room._id})
      dispatch(resetMessages({room: rooms[index].room._id}))
      history.push(`/chat/${rooms[index].room.roomName}`)
      
  }

  useEffect(() => {
    dispatch(
      setRoom({roomId: null, roomUsers: null})
    )
  }, [dispatch])

  useEffect(() => {
    setUnread(() => (unreadPriv+unreadPub))
  
  },[])

console.log("PUBLIC ROOMS: ", rooms)
  return (
    <Box sx={{
      width: "88vw", 
      height: '98vh',
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      color: 'green'}}>
      {/* <h1>DASHBOARD</h1> */}
      <Box sx={{
          width: "40%",
        textAlign: 'left',
        marginTop: '100px'
      }}>
         <h2>{">_ "}Welcome back {name}</h2>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', width: '35%'}}>
      <Box sx={{width: "60%", display: "flex", justifyContent: 'space-between'}}>
          <p>Your last Login was:</p>
          <p>{moment(updated).fromNow()}</p>
       </Box>
      <Box sx={{width: "60%", display: "flex", justifyContent: 'space-between'}}>
          <p>You missed:</p>
          <p>{unread} messages</p>
        </Box>
      <Box sx={{width: "60%", display: "flex", justifyContent: 'space-between'}}>
        <p>You are using:</p>
        <p> {rooms.length} rooms.</p> 
      </Box>
      <Box sx={{width: "60%", display: "flex", justifyContent: 'space-between'}}>
        <p>You have right now:</p>
        <p> {friends?.length} friends.</p>
      </Box>
      {rooms.length > 0 &&
       <Box 
        onClick={handleRandomPick}
        sx={{
          width: "40%",
          display: "flex",
          justifyContent: 'center',
          border: "1px solid green",
          marginTop: "20px",
          marginLeft: '40px',
          cursor: 'pointer',
            "&:hover": {
              background: "green",
              color: 'black'}
          }}>
          <h4>PICK A RANDOM CHAT</h4>
      </Box>}
      
      </Box>

     
    </Box>
  )
}

export default Dashboard
