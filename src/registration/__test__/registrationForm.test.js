import React from 'react';
import {shallow} from 'enzyme';
import TextField from "@material-ui/core/TextField";

import {RegistrationForm} from "../registrationForm";

describe("Registration Form", () => {
    let wrapper;
    const fetchSingleChoiceAttributes = jest.fn();
    const fetchCities = jest.fn();

    beforeEach(function () {
        wrapper = shallow(<RegistrationForm fetchSingleChoiceAttributes={fetchSingleChoiceAttributes}
                                            fetchCities={fetchCities}
                                            classes={{}}/>);
    });

    it("should render text field for the real name", function () {
        const field = wrapper.find("#realName");

        expect(field.type()).toEqual(TextField);
    });

    it("should load cities and single choice attributes when component is loaded", function () {
        expect(fetchSingleChoiceAttributes).toHaveBeenCalled();
        expect(fetchCities).toHaveBeenCalled();
    });
});