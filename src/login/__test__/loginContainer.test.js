import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import LoginContainer from '../loginContainer';

describe("Login Container", () => {
    let wrapper;
    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    beforeEach(function () {
        wrapper = shallow(
            <Provider store={store}>
                <LoginContainer/>
            </Provider>);
    });

    it("should load the connected component", function () {

        expect(wrapper).toBeDefined();
    });

});