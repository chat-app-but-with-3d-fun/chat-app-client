import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import Register from "./pages/Register";
import "./sass/main.scss";
import Room from "./pages/Room";
import {socket, useAuthUserMutation } from "./features/api/apiSlice";
import {  selectUserId, setUser, updateFriendStatus } from "./features/user/userSlice";
import Jitsi from "./components/Jitsi";
import NewMsgNotification from "./components/NewMsgNotification";
import PublicRoute from './routes/PublicRoute'; 
import PrivateRoute from './routes/PrivateRoute'; 

import SideBar2 from "./pages/SideBar2";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const App = () => {
  const userId = useSelector(selectUserId)
  const [ authUser, { data, isSuccess } ] = useAuthUserMutation()
  const [access, setAccess] = useState(false)

  const dispatch = useDispatch()




  useEffect(() => {
    const auth = async () => {
      console.log('autenticando usuario..')
      await authUser()
      if (isSuccess) {
        console.log('auth resp =>', data)
        dispatch(setUser(data))
      }
    }
    auth()

    if (socket) {
      socket.on('unRegister', (friendId) => {
        console.log('friendID => ', friendId)
        socket.emit('handshake', friendId)
        dispatch(
          updateFriendStatus(friendId)
        )
      })
    }
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
        <PublicRoute
            restricted={true}
            component={Register}
            path="/sign-:form"
            exact />
        <SideBar2 >
        <PrivateRoute
            component={Dashboard}
            path="/"
            exact />
        <PrivateRoute
            component={Dashboard}
            path="/dashboard"
            exact />
        <PrivateRoute
            component={Room}
            path="/chat/:roomId"
            exact />
        </SideBar2>
        </Switch> 
      </Router>
      <NewMsgNotification />
    </div>
  );
}
export default App;
