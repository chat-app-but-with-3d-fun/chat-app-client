import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import Register from "./pages/Register";
import "./sass/main.scss";
import Sidebar from "./pages/Sidebar";
import Chat from "./pages/Chat";

const App = () => {

  return (
    <div className="App">
      <Router>
      <Sidebar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sign-:form" component={Register} />
          {/* <Route exact path="/dashboard" component={Dashboard} /> */}
          <Route path="/chat/" component={Chat} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
