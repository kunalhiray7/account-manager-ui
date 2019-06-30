import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from "react-redux";

import configureStore from "./store";
import {paths} from "./common/constants";
import Profile from "./profile/profile";
import Login from "./login/login";
import RegistrationContainer from "./registration/registrationContainer";

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route exact path={paths.PROFILE} component={Profile}/>
                        <Route exact path={paths.REGISTRATION} component={RegistrationContainer}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
