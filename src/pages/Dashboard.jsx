import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setRoom } from "../features/room/roomSlice"



const Dashboard = () => {
  
  
  const dispatch = useDispatch()
  
  
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
    <div>
      <h1>DASHBOARD</h1>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  )
}

export default Dashboard
