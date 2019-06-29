import React from 'react';
import {shallow} from "enzyme";

import Profile from '../profile';

describe("Profile", () => {
    let wrapper;

    beforeEach(function () {
        wrapper = shallow(<Profile/>);
    });

    it("should render the page header", () => {
        const header = wrapper.find("#profileHeader");

        expect(header.type()).toEqual("h2");
        expect(header.text()).toEqual("My Profile");
    });
});