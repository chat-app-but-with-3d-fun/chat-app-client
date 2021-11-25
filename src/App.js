import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import Register from "./pages/Register";
import "./sass/main.scss";
import Sidebar from "./pages/Sidebar";
import Room from "./pages/Room";

import {socket, useAuthUserMutation } from "./features/api/apiSlice";
import {  selectUserId, setUser, updateFriendStatus } from "./features/user/userSlice";
import Jitsi from "./components/Jitsi";


const App = () => {
  const userId = useSelector(selectUserId)
  const [ authUser, { data, isSuccess } ] = useAuthUserMutation()

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
          <Route exact path="/sign-:form" component={Register} />
          {/* <Route exact path="/" component={Home} /> */}

          <Sidebar >
            <Route exact path="/chat/:roomId" component={Room} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/jitsi" component={Jitsi} />
          </Sidebar>
          
        </Switch>
      </Router>
    </div>
  );
}
export default App;
