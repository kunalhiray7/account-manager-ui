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
import CategoryIcon from '@material-ui/icons/Category';
import InfoIcon from '@material-ui/icons/Info';
import {Profile} from '../profile';
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";

describe("Profile", () => {
    let wrapper;
    const userId = "345678tyuioghjkbnm";
    const fetchUserProfile = jest.fn();
    const fetchSingleChoiceAttributes = jest.fn();
    const fetchCities = jest.fn();
    const updateField = jest.fn();
    const imageUpload = jest.fn();

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
        "city": "Aarhus",
        "maritalStatus": "Divorced",
        "occupation": "Banker",
        "realName": "John Smith",
        "religion": "Christian",
        "profilePic": "https://kunalhiray7.github.io/gallery/photos/Potraits/DSC_0670.jpg"
    };

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

    beforeEach(function () {
        wrapper = shallow(<Profile classes={{}}
                                   userId={userId}
                                   fetchUserProfile={fetchUserProfile}
                                   user={user}
                                   cities={cities}
                                   singleChoiceAttributes={singleChoiceAttributes}
                                   fetchSingleChoiceAttributes={fetchSingleChoiceAttributes}
                                   fetchCities={fetchCities}
                                   updateField={updateField}
                                   imageUpload={imageUpload}
        />);
    });

    it("should render the app banner with logout option", () => {
        const banner = wrapper.find("#appBanner");

        expect(banner.prop("showLogout")).toEqual(true);
    });

    it("should fetch user profile when component is loaded", function () {
        const fetchUserProfileMock = jest.fn();
        const wrapperWithoutUser = shallow(<Profile classes={{}} userId={userId} fetchUserProfile={fetchUserProfileMock}
                                                    user={undefined}
                                                    cities={cities}
                                                    singleChoiceAttributes={singleChoiceAttributes}
                                                    fetchSingleChoiceAttributes={fetchSingleChoiceAttributes}
                                                    fetchCities={fetchCities}
                                                    updateField={updateField}
        />);
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

    const expectedFieldsConfig = [
        {fieldName: "realName", iconType: PersonIcon, value: user.realName, isEditable: true, label: "Full Name"},
        {fieldName: "displayName", iconType: TagFaceIcon, value: user.displayName, isEditable: true, label: "Display Name"},
        {fieldName: "gender", iconType: WcIcon, value: user.gender, isEditable: true, label: "Gender"},
        {fieldName: "dateOfBirth", iconType: CalendarIcon, value: user.dateOfBirth, isEditable: true, label: "Date of Birth"},
        {fieldName: "height", iconType: VerticalAlignTopIcon, value: user.height, isEditable: false, label: "Height in Centimeters"},
        {fieldName: "maritalStatus", iconType: GroupTopIcon, value: user.maritalStatus, isEditable: true, label: "Marital Status"},
        {fieldName: "aboutMe", iconType: TextIcon, value: user.aboutMe, isEditable: true, label: "About Me"},
        {fieldName: "occupation", iconType: BusinessIcon, value: user.occupation, isEditable: true, label: "Occupation"},
        {fieldName: "ethnicity", iconType: PersonPinIcon, value: user.ethnicity, isEditable: true, label: "Ethnicity"},
        {fieldName: "figure", iconType: FigureIcon, value: user.figure, isEditable: true, label: "Figure"},
        {fieldName: "city", iconType: LocationIcon, value: user.location.city, isEditable: true, label: "City"},
        {fieldName: "religion", iconType: CategoryIcon, value: user.religion, isEditable: true, label: "Religion"},
    ];

    expectedFieldsConfig.forEach(field => {
        it(`should render "${field.label}" in edit mode`, function () {
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

    it("should render the dialog onClick of edit", function () {
        const realNameEdit = wrapper.find("#realNameEdit");

        expect(realNameEdit.type()).toEqual(EditIcon);
        realNameEdit.simulate("click");
        wrapper.update();

        const dialog = wrapper.find("#dialog");
        expect(dialog.type()).toEqual(Dialog);
        expect(dialog.prop("open")).toEqual(true);
    });

    it("should call updateField when a text field is updated", function () {
        const realNameEdit = wrapper.find("#realNameEdit");
        realNameEdit.simulate("click");
        const textField = wrapper.find("#realName");
        textField.simulate("change", {target: {value: "new value"}});
        wrapper.update();

        expect(wrapper.state("updatedField")).toEqual("realName");
        expect(wrapper.state("updatedValue")).toEqual("new value");
    });

    it("should call updateField when a text area field is updated", function () {
        const aboutMeEdit = wrapper.find("#aboutMeEdit");
        aboutMeEdit.simulate("click");
        const textAreaField = wrapper.find("#aboutMe");
        textAreaField.simulate("change", {target: {value: "new long text value"}});
        wrapper.update();

        expect(wrapper.state("updatedField")).toEqual("aboutMe");
        expect(wrapper.state("updatedValue")).toEqual("new long text value");
    });

    it("should call updateField when a radio field is updated", function () {
        const genderEdit = wrapper.find("#genderEdit");
        genderEdit.simulate("click");
        const radioField = wrapper.find("#genderRadio");
        radioField.simulate("change", {target: {value: "FEMALE"}});
        wrapper.update();

        expect(wrapper.state("updatedField")).toEqual("gender");
        expect(wrapper.state("updatedValue")).toEqual("FEMALE");
    });

    it("should call updateField when a single value select field is updated", function () {
        const maritalStatusEdit = wrapper.find("#maritalStatusEdit");
        maritalStatusEdit.simulate("click");
        const selectField = wrapper.find("#maritalStatusSelect");
        selectField.simulate("change", {target: {value: "Single"}});
        wrapper.update();

        expect(wrapper.state("updatedField")).toEqual("maritalStatus");
        expect(wrapper.state("updatedValue")).toEqual("Single");
    });

    it("should call updateField when a auto complete field is updated", function () {
        const cityEdit = wrapper.find("#cityEdit");
        cityEdit.simulate("click");
        const selectField = wrapper.find("#locationSelect");
        selectField.simulate("change", "Berlin");
        wrapper.update();

        expect(wrapper.state("updatedField")).toEqual("city");
        expect(wrapper.state("updatedValue")).toEqual("Berlin");
    });

    it("should fetch cities and single choice attributes when component is loaded", function () {
        expect(fetchSingleChoiceAttributes).toHaveBeenCalled();
        expect(fetchCities).toHaveBeenCalled();
    });

    it("should update the profile picture when new image is uploaded", function () {
        wrapper.setProps({
            imageUrl: "newUrl"
        });
        wrapper.update();

        expect(updateField).toHaveBeenCalledWith(userId, "profilePic", "newUrl");
    });

    it("should upload the image when clicked on edit icon for profile pic", function () {
        const files = ["file data"];
        const profilePicEdit = wrapper.find("#raised-button-file");

        profilePicEdit.simulate("change", {target: {files: files}});
        wrapper.update();

        expect(imageUpload).toHaveBeenCalledWith("file data");
    });

    it("should update the field", function () {
        const realNameEdit = wrapper.find("#realNameEdit");

        expect(realNameEdit.type()).toEqual(EditIcon);
        realNameEdit.simulate("click");
        wrapper.update();

        const field = wrapper.find("#realName");
        field.simulate("change", {target: {value: "New Name"}});

        const updateButton = wrapper.find("#dialogUpdateButton");
        updateButton.simulate("click");

        expect(updateField).toHaveBeenCalledWith(userId, "realName", "New Name");
    });

    it("should render the information icon for realName, marital status and occupation", function () {
        const realNameInfo = wrapper.find("#realNameInfo");
        const maritalStatusInfo = wrapper.find("#maritalStatusInfo");
        const occupationInfo = wrapper.find("#occupationInfo");

        expect(realNameInfo.type()).toEqual(InfoIcon);
        expect(maritalStatusInfo.type()).toEqual(InfoIcon);
        expect(occupationInfo.type()).toEqual(InfoIcon);
    });

    it("should not render the information button for public fields", function () {
        const displayNameInfo = wrapper.find("#displayNameInfo");

        expect(displayNameInfo.exists()).toBe(false);
    });

    it("should render the snackbar when error occurred", function () {
        wrapper.setProps({
            error: "Some error"
        });
        wrapper.update();

        const snackbar = wrapper.find("#snackbar");

        expect(snackbar.exists()).toBe(true);
        expect(snackbar.prop("message")).toEqual(<span id="message-id">Some error</span>);
    });

    it("should not render the editIcons in public mode", function () {
        wrapper.setProps({
            publicMode: true
        });
        wrapper.update();
        const realNameEditIcon = wrapper.find("#realNameEdit");

        expect(realNameEditIcon.exists()).toBe(false);
    });



});