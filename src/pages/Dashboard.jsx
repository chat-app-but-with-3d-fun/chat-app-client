import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setRoom } from "../features/room/roomSlice"


const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setRoom(null)
    )
  }, [dispatch])

  return (
    <div>
      <h1>DASHBOARD</h1>
    </div>
  )
}

export default Dashboard
