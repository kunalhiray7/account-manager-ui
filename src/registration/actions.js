import {get} from "../api/http";

export const ACTIONS = {
    SINGLE_CHOICE_ATTR_FETCHED: 'SINGLE_CHOICE_ATTR_FETCHED',
    CITIES_FETCHED: 'CITIES_FETCHED',
    LOADING: 'LOADING',
    ERROR_OCCURRED: 'ERROR_OCCURRED',
};

function loading(isLoading) {
    return {
        type: ACTIONS.LOADING,
        payload: isLoading
    }
}

function errorOccurred(error) {
    return {
        type: ACTIONS.ERROR_OCCURRED,
        payload: error
    }
}

function singleChoiceAttrFetched(attributes) {
    return {
        type: ACTIONS.SINGLE_CHOICE_ATTR_FETCHED,
        payload: attributes
    }
}

export function fetchSingleChoiceAttributes() {
    return dispatch => {
        dispatch(loading(true));

        get({
            path: `/en/single_choice_attributes.json`
        }).then(response => {
            dispatch(singleChoiceAttrFetched(response));
            dispatch(loading(false));
        }, (error) => {
            dispatch(loading(false));
            dispatch(errorOccurred(error.message));
        });
    }
}

function citiesFetched(cities) {
    return {
        type: ACTIONS.CITIES_FETCHED,
        payload: cities
    }
}

export function fetchCities() {
    return dispatch => {
        dispatch(loading(true));

        get({
            path: `/en/locations/cities.json`
        }).then(response => {
            dispatch(citiesFetched(response));
            dispatch(loading(false));
        }, (error) => {
            dispatch(loading(false));
            dispatch(errorOccurred(error.message));
        });
    }
}
