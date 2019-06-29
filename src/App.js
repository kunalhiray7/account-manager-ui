import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from "./profile/profile";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Profile}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
