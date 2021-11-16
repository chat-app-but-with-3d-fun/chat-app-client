import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import Register from "./pages/Register";
import "./sass/main.scss";
import Sidebar from "./pages/Sidebar";
import Room from "./pages/Room";
import { useAuthUserMutation } from "./features/api/apiSlice";
import { setUser } from "./features/user/userSlice";

const App = () => {
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
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Sidebar >
            <Route exact path="/" component={Home} />
            <Route path="/chat/" component={Room} />
          </Sidebar>
          <Route path="/sign-:form" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
