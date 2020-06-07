import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute"
import Public from "./components/Public";
import Protected from "./components/Protected"
import FriendsForm from './components/FriendsForm';

function App() {
  return (
    <Router>
    <div className="App">
      <div className="links">
      <ul>
        <li>
          <Link to="/public">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
         <Link to="/friends">Friends</Link>
        </li>
          

        
      </ul> 
      </div>


    <Switch>
      <PrivateRoute exact path="/protected" component={Protected}/>
      <Route path="/friends" component={FriendsForm} />
      <Route path = "/login" component={Login} />
      <Route path ="/public" component={Public} />
    </Switch>

    </div>
    </Router>
  
  );
}

export default App;
