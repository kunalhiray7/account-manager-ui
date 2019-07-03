import {ACTIONS} from "../actions";
import reducer, {DEFAULT_STATE} from '../reducer';

describe("Profile Reducer", () => {
    const user = {
        "id": "5678yuighjbnm",
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

    it('should return state with single choice attributes when SINGLE_CHOICE_ATTR_FETCHED action is reduced', function () {
        const action = {type: ACTIONS.PROFILE_FETCHED, payload: user};

        const updatedState = reducer(undefined, action);

        expect(updatedState.user).toEqual(user);
    });

    it('should return state with loading status when LOADING action is reduced', function () {
        const action = {type: ACTIONS.LOADING, payload: true};

        const updatedState = reducer(undefined, action);

        expect(updatedState.isLoading).toEqual(true);
    });

    it('should return state with error when AD_SAVED action is reduced', function () {
        const action = {type: ACTIONS.ERROR_OCCURRED, payload: "Error"};

        const updatedState = reducer(undefined, action);

        expect(updatedState.error).toEqual("Error");
    });

    it("should return default state when the action type is not matched", () => {
        const action = {type: "UNKNOWN", payload: {}};

        const updatedState = reducer(undefined, action);

        expect(updatedState).toEqual(DEFAULT_STATE);
    });

});
