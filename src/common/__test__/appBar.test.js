import React from 'react';
import {shallow} from 'enzyme';
import AppBar from '@material-ui/core/AppBar';
import {Link} from "react-router-dom";

import {AppBanner} from "../appBar";
import {paths} from "../constants";

describe("App Banner", () => {

    let wrapper;

    beforeEach(function () {
        wrapper = shallow(<AppBanner classes={{}} showLogout={true}/>);
    });

    it("should render the app banner with title", function () {
        const appBanner = wrapper.find("#appBanner");
        const banner = appBanner.childAt(0).childAt(0);

        expect(appBanner.type()).toEqual(AppBar);
        expect(banner.type()).toEqual('img');
    });

    it("should render the logout link if showLogout is true", function () {
        const logout = wrapper.find("#logout");

        expect(logout.type()).toEqual(Link);
        expect(logout.prop("to")).toEqual(paths.LOGIN)
    });

    it("should not render the logout link if showLogout is false", function () {
        wrapper.setProps({showLogout: false});
        wrapper.update();

        const logout = wrapper.find("#logout");

        expect(logout.exists()).toBe(false);
    });
});