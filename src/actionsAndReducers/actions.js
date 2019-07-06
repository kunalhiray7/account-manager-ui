import {get, post, put} from "../api/http";

export const ACTIONS = {
    SINGLE_CHOICE_ATTR_FETCHED: 'SINGLE_CHOICE_ATTR_FETCHED',
    CITIES_FETCHED: 'CITIES_FETCHED',
    LOADING: 'LOADING',
    ERROR_OCCURRED: 'ERROR_OCCURRED',
    USER_SAVED: 'USER_SAVED',
    PROFILE_FETCHED: 'PROFILE_FETCHED',
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

function userRegistered(user) {
    return {
        type: ACTIONS.USER_SAVED,
        payload: user
    }
}

export function registerUser(userRequest) {
    return dispatch => {
        post({
            path: `/users`,
            payload: userRequest
        }).then(response => {
            dispatch(userRegistered(response));
            dispatch(loading(false));
        }, (error) => {
            dispatch(loading(false));
            dispatch(errorOccurred(error.message));
        });
    }
}

function profileFetched(profile) {
    return {
        type: ACTIONS.PROFILE_FETCHED,
        payload: profile
    }
}

export function fetchUserProfile(userId) {
    return dispatch => {
        dispatch(loading(true));

        get({
            path: `/user/${userId}`
        }).then(response => {
            dispatch(profileFetched(response));
            dispatch(loading(false));
        }, (error) => {
            dispatch(loading(false));
            dispatch(errorOccurred(error.message));
        });
    }
}

export function authenticate(username, history) {
    return dispatch => {
        put({
            path: `/authentications`,
            payload: {username: username}
        }).then(response => {
            dispatch(profileFetched(response));
            history.push(`/profile/${response.id}`);
            dispatch(loading(false));
        }, (error) => {
            dispatch(loading(false));
            dispatch(errorOccurred(error.message));
        });
    }
}

