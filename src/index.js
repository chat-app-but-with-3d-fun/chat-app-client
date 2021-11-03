import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ParamChild from './features/components/paramChild';
import { useUpdate } from 'react-three-fiber'

const Routing = () => {
  return(
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        {/* <Route path="/:id" component={ParamChild} /> */}
      </Switch>
    </Router>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);



