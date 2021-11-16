import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import Register from "./pages/Register";
import "./sass/main.scss";
import Sidebar from "./pages/Sidebar";
import Room from "./pages/Room";
import Jitsi from "./pages/jitsi";

const App = () => {

  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/sign-:form" component={Register} />
          <Sidebar >
            <Route exact path="/" component={Home} />
            <Route path="/chat/" component={Room} />
            <Route path='/jitsi' component={Jitsi} />
          </Sidebar>
         
          {/* <Route exact path="/dashboard" component={Dashboard} /> */}
        </Switch>
      </Router>
    </div>
  );
}
export default App;
