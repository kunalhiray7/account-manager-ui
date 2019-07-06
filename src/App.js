import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from "react-redux";

import configureStore from "./store";
import {paths} from "./common/constants";
import ProfileContainer from "./profile/profileContainer";
import LoginContainer from "./login/loginContainer";
import RegistrationContainer from "./registration/registrationContainer";

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={paths.LOGIN} component={LoginContainer}/>
                        <Route exact path={paths.PROFILE} component={ProfileContainer}/>
                        <Route exact path={paths.REGISTRATION} component={RegistrationContainer}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
