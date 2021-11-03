
import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import Register from "./pages/Register";
import "./sass/main.scss";


function App() {
  //const { user } = useContext(UserContext);
  // console.log('this is user',user)

  return (

      <div className="App">
      <Switch>       
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Register} />
        {/* <Route exact path="/login" component={Dashboard} /> */}
      </Switch>
    </div>


  );
}
export default App;
