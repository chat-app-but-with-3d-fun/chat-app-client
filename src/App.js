
import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import Register from "./pages/Register";
import "./sass/main.scss";


function App() {

  return (

      <div className="App">
      <Switch>       
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Register} />
      </Switch>
    </div>


  );
}
export default App;
