import {ACTIONS} from "../actions";
import reducer, {DEFAULT_STATE} from '../reducer';

describe("Registration Reducer", () => {
    const singleChoiceAttributes = {
        "gender": [
            {
                "id": "8f9d76ad-2c6b-4a98-8496-6165a2770a5e",
                "name": "Male"
            },
            {
                "id": "1969cf48-7ae7-4073-abb3-d09ba6a19946",
                "name": "Female"
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

    it('should return state with single choice attributes when SINGLE_CHOICE_ATTR_FETCHED action is reduced', function () {
        const action = {type: ACTIONS.SINGLE_CHOICE_ATTR_FETCHED, payload: singleChoiceAttributes};

        const updatedState = reducer(undefined, action);

        expect(updatedState.singleChoiceAttributes).toEqual(singleChoiceAttributes);
    });

    it('should return state with loading status when LOADING action is reduced', function () {
        const action = {type: ACTIONS.LOADING, payload: true};

        const updatedState = reducer(undefined, action);

        expect(updatedState.isLoading).toEqual(true);
    });

    it('should return state with cities when CITIES_FETCHED action is reduced', function () {
        const action = {type: ACTIONS.CITIES_FETCHED, payload: cities};

        const updatedState = reducer(undefined, action);

        expect(updatedState.cities).toEqual(cities);
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
