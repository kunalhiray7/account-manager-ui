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
            },
            {
                "id": "43a01b78-5425-4cba-821a-1459dd5a2784",
                "name": "Other"
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
            },
            {
                "id": "a55f5912-8a13-4c0e-bf11-d333f93a08e0",
                "name": "South East Asian"
            },
            {
                "id": "44d17f32-f0c9-4bd0-801e-fd9b63d54342",
                "name": "Mixed"
            },
            {
                "id": "21c455ec-976f-4415-b430-8b87472cf76a",
                "name": "Black"
            },
            {
                "id": "c7fdedc4-da77-4e68-8342-3152719a577e",
                "name": "Arabic"
            },
            {
                "id": "083c230f-05eb-4ea7-869e-6de1783815f7",
                "name": "Hispanic"
            },
            {
                "id": "b26ce72d-99c5-4be9-8415-3155f43ec938",
                "name": "Latino"
            },
            {
                "id": "73b90c23-1d74-494b-8d9a-246efa81a0dc",
                "name": "Native American"
            },
            {
                "id": "37ffade8-3365-4d2f-aa5c-7f2b3f6dbf7e",
                "name": "Pacific Islander"
            },
            {
                "id": "b971fc52-c4e0-4d27-bf72-76352d2e3300",
                "name": "Other"
            }
        ],
        "religion": [
            {
                "id": "a2bc1142-9b6a-41f3-a620-a39afb1304ab",
                "name": "Agnostic"
            },
            {
                "id": "2601e45e-b70f-43e3-8364-205794b439e6",
                "name": "Atheist"
            },
            {
                "id": "aec22ee3-fd02-4570-89bd-16310c43dc31",
                "name": "Buddhist"
            },
            {
                "id": "8af4bd2a-44d5-44a4-8424-ce1c2ab29d2b",
                "name": "Christian"
            },
            {
                "id": "9bf8e0ef-11ea-4fe3-bdd4-e6d29fe406cb",
                "name": "Hindu"
            },
            {
                "id": "381c5099-c3cd-4cf9-9560-b0b2719f4870",
                "name": "Islam"
            },
            {
                "id": "ee590f83-6c98-4e60-a401-7b7af73509a5",
                "name": "Jewish"
            },
            {
                "id": "f9f95de1-2699-485e-b5e6-0e1ed821c1ae",
                "name": "Shinto"
            },
            {
                "id": "0253d494-4b20-4cdb-b855-a2643f1d1549",
                "name": "Sikh"
            },
            {
                "id": "5fc4c39c-f42d-4644-b316-a06ff96ef462",
                "name": "Other"
            }
        ],
        "figure": [
            {
                "id": "9c6ddf44-01ae-4fdb-acc9-b97f2882e4ef",
                "name": "Slim"
            },
            {
                "id": "b5e4720e-bc9a-4e56-a301-31a6f667adc2",
                "name": "Normal"
            },
            {
                "id": "ae32676c-4275-4536-a6e0-188100b97148",
                "name": "Athletic"
            },
            {
                "id": "16fbde03-13e5-4a8b-a24f-153b4388002f",
                "name": "A few extra kilos"
            },
            {
                "id": "e9feac11-3861-4bf4-bbde-0db67a60544d",
                "name": "More to love"
            }
        ],
        "marital_status": [
            {
                "id": "5a837767-7a11-487c-a243-7451c7b14c03",
                "name": "Never Married"
            },
            {
                "id": "1a02c6a4-d7b1-470c-839d-8c3a099a9665",
                "name": "Divorced"
            },
            {
                "id": "307614c9-7813-44f9-9b30-fd8545fd2635",
                "name": "Widower"
            },
            {
                "id": "3cd548f0-3471-44b8-b2ed-bf6c83790a7a",
                "name": "Separated"
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