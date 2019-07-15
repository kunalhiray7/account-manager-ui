import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';

import App from './App';
import {paths} from './common/constants';
import ProfileContainer from "./profile/profileContainer";

describe("App Routes", () => {

  let wrapper;

  beforeEach(function () {
    wrapper = shallow(<App/>);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render the route for edit profile', function () {
    const routes = wrapper.find('Switch');
    const editRoute = routes.childAt(1);

    expect(editRoute.prop("path")).toEqual(paths.EDIT_PROFILE);
    expect(editRoute.prop("component")).toEqual(ProfileContainer);
  });

});
