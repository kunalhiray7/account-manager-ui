import React from 'react';
import {shallow} from 'enzyme';
import Select from 'react-select';

import {AutoCompleteField} from "../autocompleteFormField";

describe("Autocomplete Form Field", () => {

    let wrapper;
    const onChange = jest.fn();
    const options = [
        {value: {city: "Berlin", lat: "123", lon: "345"}, label: "Berlin"},
        {value: {city: "Paris", lat: "678", lon: "987"}, label: "Paris"}
    ];
    const name = "location";

    beforeEach(function () {
        wrapper = shallow(<AutoCompleteField classes={{}} onChange={onChange} options={options} name={name}/>);
    });

    it("should render the autocomplete select field", function () {
        const selectField = wrapper.find(`#${name}`);

        expect(selectField.type()).toEqual(Select);
        expect(selectField.prop("options")).toEqual(options);
        expect(selectField.prop("name")).toEqual(name);
    });

    it("should call onChange from props when location is changed", function () {
        const selectField = wrapper.find(`#${name}`);

        selectField.simulate("change", options[1]);
        wrapper.update();

        expect(onChange).toHaveBeenCalledWith(options[1]);
    });
});
