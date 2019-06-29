import React from 'react';
import {shallow} from 'enzyme';
import withRoot from "../withRoot";

describe("With Root", () => {
    let wrapper;

    beforeEach(function () {
        const MyComponent = () => <div id="myComponent">Hi!!</div>;
        const WithRoot = withRoot(MyComponent);

        wrapper = shallow(<WithRoot/>);
    });

    it('should call the HOC with wrapped component', () => {
        expect(wrapper.find('MyComponent')).toBeDefined();
    });

    it('should pass theme in the component tree', function () {
        expect(wrapper.find('MuiThemeProviderOld').prop('theme')).toBeDefined()
    });

    it('should render CssBaseLine', function () {
        expect(wrapper.find('CssBaseline')).toBeDefined()
    });
});