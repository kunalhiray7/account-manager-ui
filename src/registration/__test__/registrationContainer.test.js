import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import RegistrationContainer from '../registrationContainer';

describe("Registration Container", () => {
    const singleChoiceAttributes = {
        "gender": [
            {
                "id": "8f9d76ad-2c6b-4a98-8496-6165a2770a5e",
                "name": "Male"
            },
            {
                "id": "1969cf48-7ae7-4073-abb3-d09ba6a19946",
                "name": "Female"
            }
        ],
        "ethnicity": [
            {
                "id": "5b3d1252-860f-459b-ab90-7a2914360dbf",
                "name": "White"
            },
            {
                "id": "1b2f380e-5d70-4ada-9ad3-c6d733a1aaa4",
                "name": "South Asian"
            }
        ]
    };

    const cities = {
        "cities": [
            {
                "lat": "56°09'N",
                "lon": "10°13'E",
                "city": "Aarhus"
            },
            {
                "lat": "57°09'N",
                "lon": "2°07'W",
                "city": "Aberdeen"
            }
        ]
    };

    let wrapper;
    const mockStore = configureStore([thunk]);

    const store = mockStore({
        registration: {
            cities: cities,
            singleChoiceAttributes: singleChoiceAttributes,
            isLoading: true,
            error: "Error"
        }
    });

    beforeEach(function () {
        wrapper = mount(
            <Provider store={store}>
                <RegistrationContainer/>
            </Provider>);
    });

    it("should pass the correct properties from store to connected component", function () {
        const connectedComponent = wrapper.find('RegistrationForm');

        expect(connectedComponent.prop("singleChoiceAttributes")).toEqual(singleChoiceAttributes);
        expect(connectedComponent.prop("cities")).toEqual(cities);
        expect(connectedComponent.prop("isLoading")).toEqual(true);
        expect(connectedComponent.prop("error")).toEqual("Error");
    });

});