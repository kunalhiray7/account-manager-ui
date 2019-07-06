import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import ProfileContainer from '../profileContainer';

describe("Profile Container", () => {
    let wrapper;
    const user = {
        "id": "56789tyuiohjknm",
        "aboutMe": "Banker in London",
        "dateOfBirth": "2001-01-02",
        "displayName": "John",
        "email": "john.smith@gmail.com",
        "ethnicity": "Native American",
        "figure": "Normal",
        "gender": "Male",
        "height": "170",
        "location": {
            "city": "Aarhus",
            "lat": "56°09'N",
            "lon": "10°13'E"
        },
        "maritalStatus": "Divorced",
        "occupation": "Banker",
        "realName": "John Smith",
        "religion": "Christian",
        "profilePic": "https://kunalhiray7.github.io/gallery/photos/Potraits/DSC_0670.jpg"
    };
    const mockStore = configureStore([thunk]);

    const store = mockStore({
        registration: {
            user: user
        }
    });

    const params = { params: { userId: user.id } };
    beforeEach(function () {
        wrapper = shallow(
            <Provider store={store}>
                <ProfileContainer match={params}/>
            </Provider>).dive({ context: { store } });
    });

    it("should pass the correct properties from store to connected component", function () {

        expect(wrapper.prop("match")).toEqual(params);
    });
});