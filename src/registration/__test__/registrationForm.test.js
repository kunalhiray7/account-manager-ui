import React from 'react';
import {shallow} from 'enzyme';
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MaterialUIForm from 'material-ui-form'
import Typography from '@material-ui/core/Typography';
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import {RegistrationForm} from "../registrationForm";

describe("Registration Form", () => {
    let wrapper;
    const fetchSingleChoiceAttributes = jest.fn();
    const fetchCities = jest.fn();
    const registerUser = jest.fn();
    const imageUpload = jest.fn();
    const history = {push: jest.fn()};

    const attr = {
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
            },
            {
                "lat": "5°19'N",
                "lon": "4°02'W",
                "city": "Abidjan"
            }
        ]
    };

    beforeEach(function () {
        wrapper = shallow(<RegistrationForm fetchSingleChoiceAttributes={fetchSingleChoiceAttributes}
                                            fetchCities={fetchCities}
                                            classes={{}}
                                            singleChoiceAttributes={attr}
                                            cities={cities}
                                            registerUser={registerUser}
                                            history={history}
                                            imageUpload={imageUpload}
        />);
    });

    it("should render the form title", function () {
        const field = wrapper.find("#formName");

        expect(field.type()).toEqual(Typography);
        expect(field.childAt(0).text()).toEqual("User Registration");
    });

    it("should load cities and single choice attributes when component is loaded", function () {
        expect(fetchSingleChoiceAttributes).toHaveBeenCalled();
        expect(fetchCities).toHaveBeenCalled();
    });

    it("should render the text field for email", function () {
        const field = wrapper.find("#email");

        expect(field.type()).toEqual(TextField);
        expect(field.prop("required")).toEqual(true);
        expect(field.prop("placeholder")).toEqual("Email");
        expect(field.prop("label")).toEqual("Email");
        expect(field.prop("type")).toEqual("email");
    });

    it("should render the text field for real name", function () {
        const field = wrapper.find("#realName");

        expect(field.type()).toEqual(TextField);
        expect(field.prop("required")).toEqual(true);
        expect(field.prop("placeholder")).toEqual("Full Name");
        expect(field.prop("label")).toEqual("Full Name");
    });

    it("should render the text field for display name", function () {
        const field = wrapper.find("#displayName");

        expect(field.type()).toEqual(TextField);
        expect(field.prop("required")).toEqual(true);
        expect(field.prop("placeholder")).toEqual("Display Name");
        expect(field.prop("label")).toEqual("Display Name");
    });

    it("should render the file uploader for profile pic", function () {
        const field = wrapper.find("#profilePic");
        const label = field.childAt(0);
        expect(label.childAt(0).text()).toEqual("Profile Picture");

        const input = field.childAt(1);
        expect(input.type()).toEqual("input");
        expect(input.prop("accept")).toEqual("image/*");
        expect(input.prop("type")).toEqual("file");

        const button = field.childAt(2).childAt(0);
        expect(button.type()).toEqual(Button);
        expect(button.childAt(0).text()).toEqual("Upload");
    });

    it("should render the date picker for date of birth", function () {
        const field = wrapper.find("#dateOfBirth");

        expect(field.type()).toEqual(TextField);
        expect(field.prop("type")).toEqual("date");
        expect(field.prop("label")).toEqual("Date of birth");
    });

    it("should render the radio buttons for the gender", function () {
        const field = wrapper.find("#gender");

        expect(field.type()).toEqual(RadioGroup);
        expect(field.prop("aria-label")).toEqual("Gender");

        const firstOption = field.childAt(0);

        expect(firstOption.type()).toEqual(FormControlLabel);
        expect(firstOption.prop("label")).toEqual(attr.gender[0].name.toUpperCase());
    });

    it("should render a single choice field for ethnicity", function () {
        const field = wrapper.find("#ethnicity");

        expect(field.prop("required")).toBeUndefined();

        const label = field.childAt(0);
        expect(label.childAt(0).text()).toEqual("Ethnicity");

        const selectField = field.childAt(1);

        expect(selectField.type()).toEqual(Select);

        const firstOption = selectField.childAt(0);
        expect(firstOption.childAt(0).text()).toEqual("None");

        const secondOption = selectField.childAt(1);
        expect(secondOption.childAt(0).text()).toEqual(attr.ethnicity[0].name);
    });

    it("should render a single choice field for religion", function () {
        const field = wrapper.find("#religion");

        expect(field.prop("required")).toBeUndefined();

        const label = field.childAt(0);
        expect(label.childAt(0).text()).toEqual("Religion");

        const selectField = field.childAt(1);

        expect(selectField.type()).toEqual(Select);

        const firstOption = selectField.childAt(0);
        expect(firstOption.childAt(0).text()).toEqual("None");

        const secondOption = selectField.childAt(1);
        expect(secondOption.childAt(0).text()).toEqual(attr.religion[0].name);
    });

    it("should render a numeric field for height", function () {
        const field = wrapper.find("#height");

        expect(field.type()).toEqual(TextField);
        expect(field.prop("type")).toEqual("number");
        expect(field.prop("label")).toEqual("Height in centimeters");
    });

    it("should render a single choice field for figure", function () {
        const field = wrapper.find("#figure");

        expect(field.prop("required")).toBeUndefined();

        const label = field.childAt(0);
        expect(label.childAt(0).text()).toEqual("Figure");

        const selectField = field.childAt(1);

        expect(selectField.type()).toEqual(Select);

        const firstOption = selectField.childAt(0);
        expect(firstOption.childAt(0).text()).toEqual("None");

        const secondOption = selectField.childAt(1);
        expect(secondOption.childAt(0).text()).toEqual(attr.figure[0].name);
    });

    it("should render a single choice field for Marital Status", function () {
        const field = wrapper.find("#maritalStatus");

        expect(field.prop("required")).toBe(true);

        const label = field.childAt(0);
        expect(label.childAt(0).text()).toEqual("Marital Status");

        const selectField = field.childAt(1);

        expect(selectField.type()).toEqual(Select);

        const firstOption = selectField.childAt(0);
        expect(firstOption.childAt(0).text()).toEqual(attr.marital_status[0].name);
    });

    it("should render a text area field for occupation", function () {
        const field = wrapper.find("#occupation");

        expect(field.type()).toEqual(TextField);
        expect(field.prop("label")).toEqual("Occupation");
        expect(field.prop("multiline")).toEqual(true);
        expect(field.prop("rows")).toEqual(3);
    });

    it("should render a text area field for About Me", function () {
        const field = wrapper.find("#aboutMe");

        expect(field.type()).toEqual(TextField);
        expect(field.prop("label")).toEqual("About Me");
        expect(field.prop("multiline")).toEqual(true);
        expect(field.prop("rows")).toEqual(3);
    });

    it("should render a submit button", function () {
        const button = wrapper.find("#submit");

        expect(button.type()).toEqual(Button);
        expect(button.prop("type")).toEqual("submit");
    });

    it("should render a reset button", function () {
        const button = wrapper.find("#reset");

        expect(button.type()).toEqual(Button);
        expect(button.prop("type")).toEqual("reset");
    });

    it("should call registerUser when form is submitted", function () {
        const form = wrapper.find("#registrationForm");
        const values = {
            realName: "John Smith"
        };

        expect(form.type()).toEqual(MaterialUIForm);
        expect(form.prop("onSubmit")).toEqual(wrapper.instance().onSubmit);

        wrapper.instance().onSubmit(values);

        expect(registerUser).toHaveBeenCalledWith(values);
    });

    it("should render an autocomplete field for location", function () {
        const options = cities.cities.map(city => ({value: city, label: city.city}));
        const field = wrapper.find("#location");

        const label = field.childAt(0);
        expect(label.childAt(0).text()).toEqual("Location");

        const autocompleteSelect = field.childAt(1);
        expect(autocompleteSelect.prop("options")).toEqual(options);
        expect(autocompleteSelect.prop("name")).toEqual("location");
        expect(autocompleteSelect.prop("onChange")).toEqual(wrapper.instance().onLocationChange);
    });

    it("should set the selected location in state when location is changed", function () {
        const field = wrapper.find("#location");
        const autocompleteSelect = field.childAt(1);

        let location = {value: cities.cities[0], label: cities.cities[0].city};
        autocompleteSelect.simulate("change", location);
        wrapper.update();

        expect(wrapper.state().location).toEqual(location.value);
    });

    it("should navigate to profile page when new user is registered", function () {
        let newUser = {id: "12345ertyghbn", realName: "John Smith"};

        wrapper.setProps({user: newUser});
        wrapper.update();

        expect(history.push).toHaveBeenCalledWith(`/profile/${newUser.id}`);
    });

    it("should upload the image when clicked on edit icon for profile pic", function () {
        const files = ["file data"];
        const profilePicEdit = wrapper.find("#raised-button-file");

        profilePicEdit.simulate("change", {target: {files: files}});
        wrapper.update();

        expect(imageUpload).toHaveBeenCalledWith("file data");
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
});