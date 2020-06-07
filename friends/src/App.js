import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute"
import Public from "./components/Public";
import Protected from "./components/Protected"

function App() {
  return (
    <Router>
    <div className="App">
      <ul>
        <li>
          <Link to="/login">Login</Link>
          <Link to="/public">Public Page</Link>
        </li>
      </ul>

    <Switch>
      <PrivateRoute exact path="/protected" component={Protected}/>
      <Route path = "/login" component={Login} />
      <Route path ="/public" component={Public} />
    </Switch>

    </div>
    </Router>
  
  );
}

export default App;
