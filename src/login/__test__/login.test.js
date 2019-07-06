import React from 'react';
import {shallow} from 'enzyme';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import {Login} from "../login";
import {paths} from "../../common/constants";

describe("Login", () => {
    let wrapper;
    const classes = {root: "root"};
    const authenticate = jest.fn();
    const history = {push: jest.fn()};

    beforeEach(function () {
        wrapper = shallow(<Login classes={classes} authenticate={authenticate} history={history}/>);
    });

    it("should render the TextField for username", function () {
        const usernameTextfield = wrapper.find("#username");

        expect(usernameTextfield.type()).toEqual(TextField);
        expect(usernameTextfield.prop("placeholder")).toEqual("Username");
        expect(usernameTextfield.prop("type")).toEqual("email");
    });

    it("should render the button for login", function () {
        const button = wrapper.find("#login");

        expect(button.type()).toEqual(Button);
        expect(button.childAt(0).text()).toEqual("Login")
    });

    it("should call handle click when clicked on login button", function () {
        const usernameTextfield = wrapper.find("#username");
        let username = "john@smith.com";
        usernameTextfield.simulate("change", {target: {value: username}});

        const button = wrapper.find("#login");
        button.simulate("click", {preventDefault: jest.fn()});

        expect(authenticate).toHaveBeenCalledWith(username, history);
    });

    it("should render the register button", function () {
        const registerBtn = wrapper.find("#register");

        expect(registerBtn.type()).toEqual(Button);
        expect(registerBtn.childAt(0).text()).toEqual("Register")
    });

    it("should render ling for registration", function () {
        const link = wrapper.find('Link');

        expect(link.prop("to")).toEqual(paths.REGISTRATION);
    });
});