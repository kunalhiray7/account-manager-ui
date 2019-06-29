import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from "./profile/profile";
import Login from "./login/login";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/profile" component={Profile}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
