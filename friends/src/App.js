import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <Router>
    <div className="App">
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>

    <Switch>
      {/* <PrivateRoute exact path="/protected" component={}/> */}
      <Route path = "/login" component={Login} />
    </Switch>

    </div>
    </Router>
  
  );
}

export default App;
