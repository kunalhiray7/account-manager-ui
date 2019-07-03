import React from 'react';
import {shallow} from "enzyme";

import {Typography} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import TagFaceIcon from '@material-ui/icons/TagFaces';
import WcIcon from '@material-ui/icons/Wc';
import EditIcon from '@material-ui/icons/Edit';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import GroupTopIcon from '@material-ui/icons/Group';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import TextIcon from '@material-ui/icons/TextsmsSharp';
import BusinessIcon from '@material-ui/icons/Business';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import FigureIcon from '@material-ui/icons/ThreeSixty';
import LocationIcon from '@material-ui/icons/LocationOn';
import {Profile} from '../profile';
import Avatar from "@material-ui/core/Avatar";

describe("Profile", () => {
    let wrapper;
    const userId = "345678tyuioghjkbnm";
    const fetchUserProfile = jest.fn();

    const user = {
        "id": userId,
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

    beforeEach(function () {
        wrapper = shallow(<Profile classes={{}} userId={userId} fetchUserProfile={fetchUserProfile} user={user}/>);
    });

    it("should render the app banner with logout option", () => {
        const banner = wrapper.find("#appBanner");

        expect(banner.prop("showLogout")).toEqual(true);
    });

    it("should fetch user profile when component is loaded", function () {
        const fetchUserProfileMock = jest.fn();
        const wrapperWithoutUser = shallow(<Profile classes={{}} userId={userId} fetchUserProfile={fetchUserProfileMock}
                                                    user={undefined}/>);
        expect(fetchUserProfileMock).toHaveBeenCalledWith(userId);
    });

    it("should not fetch profile when it already exists in props", function () {
        expect(fetchUserProfile).not.toHaveBeenCalled();
    });

    it(`should render "Profile Picture"`, function () {
        const profilePic = wrapper.find("#profilePic");

        expect(profilePic.type()).toEqual(Avatar);
        expect(profilePic.prop("src")).toEqual(user.profilePic);
    });

    const fields = [
        {fieldName: "realName", iconType: PersonIcon, value: user.realName, isEditable: true, label: "Full Name"},
        {fieldName: "displayName", iconType: TagFaceIcon, value: user.displayName, isEditable: true, label: "Display Name"},
        {fieldName: "gender", iconType: WcIcon, value: user.gender, isEditable: true, label: "Gender"},
        {fieldName: "dateOfBirth", iconType: CalendarIcon, value: user.dateOfBirth, isEditable: true, label: "Date of Birth"},
        {fieldName: "height", iconType: VerticalAlignTopIcon, value: user.height, isEditable: true, label: "Height in Centimeters"},
        {fieldName: "maritalStatus", iconType: GroupTopIcon, value: user.maritalStatus, isEditable: true, label: "Marital Status"},
        {fieldName: "aboutMe", iconType: TextIcon, value: user.aboutMe, isEditable: true, label: "About Me"},
        {fieldName: "occupation", iconType: BusinessIcon, value: user.occupation, isEditable: true, label: "Occupation"},
        {fieldName: "ethnicity", iconType: PersonPinIcon, value: user.ethnicity, isEditable: true, label: "Ethnicity"},
        {fieldName: "figure", iconType: FigureIcon, value: user.figure, isEditable: true, label: "Figure"},
        {fieldName: "city", iconType: LocationIcon, value: user.location.city, isEditable: true, label: "City"},
    ];

    fields.forEach(field => {
        it(`should render "${field.label}"`, function () {
            assertField(field.fieldName, field.iconType, field.value, field.isEditable, field.label);
        });
    });

    function assertField(field, iconType, value, isEditable, labelValue) {
        const icon = wrapper.find(`#${field}Icon`);
        expect(icon.type()).toEqual(iconType);

        const label = wrapper.find(`#${field}Label`);
        expect(label.type()).toEqual(Typography);
        expect(label.childAt(0).text()).toEqual(labelValue);

        const valueField = wrapper.find(`#${field}Value`);
        expect(valueField.type()).toEqual(Typography);
        expect(valueField.childAt(0).text()).toEqual(value);

        if (isEditable) {
            const editIcon = wrapper.find(`#${field}Edit`);
            expect(editIcon.type()).toEqual(EditIcon);
        }
    }

});