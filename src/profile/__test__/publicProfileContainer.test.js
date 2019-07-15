import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import PublicProfileContainer from '../publicProfileContainer';

describe("Public Profile Container", () => {
    let wrapper;

    const userId = "4567890tyiopvbkhj";

    const mockStore = configureStore([thunk]);
    const store = mockStore({
        registration: {
            user: {id: userId}
        }
    });

    const params = { params: { userId: userId } };

    beforeEach(function () {
        console.log("Here");
        wrapper = shallow(<Provider store={store}>
            <PublicProfileContainer match={params}/>
        </Provider>).dive({ context: { store } });
    });

    it("should pass the user id to connected component", function () {

        expect(wrapper.prop("match")).toEqual(params);
    });

    it.skip("should pass the publicMode as true to connected component", function () {
        console.log(wrapper.debug());

        expect(wrapper.prop("publicMode")).toEqual(true);
    });
});