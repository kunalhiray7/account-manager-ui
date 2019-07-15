import {get, patch, post, put} from "../api/http";
import {paths} from "../common/constants";

export const ACTIONS = {
    SINGLE_CHOICE_ATTR_FETCHED: 'SINGLE_CHOICE_ATTR_FETCHED',
    CITIES_FETCHED: 'CITIES_FETCHED',
    LOADING: 'LOADING',
    ERROR_OCCURRED: 'ERROR_OCCURRED',
    USER_SAVED: 'USER_SAVED',
    PROFILE_FETCHED: 'PROFILE_FETCHED',
    IMAGE_UPLOADED: 'IMAGE_UPLOADED',
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
            path: `/single_choice_attributes`
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
            path: `/cities`
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
            path: `/profiles`,
            payload: getProfileRequest(userRequest)
        }).then(response => {
            dispatch(userRegistered(response));
            dispatch(loading(false));
        }, (error) => {
            dispatch(loading(false));
            dispatch(errorOccurred(error.message));
        });
    }
}

function getProfileRequest(userRequest) {
    const {location, ...profileRequest} = userRequest;
    profileRequest.city = location.city;
    profileRequest.location = [parseFloat(location.lat), parseFloat(location.lon)];
    return profileRequest;
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
            path: `/profiles/${userId}`
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
            history.push(paths.EDIT_PROFILE.replace(":userId", response.id));
            dispatch(loading(false));
        }, (error) => {
            dispatch(loading(false));
            dispatch(errorOccurred(error.message));
        });
    }
}

function imageUploaded(url) {
    return {
        type: ACTIONS.IMAGE_UPLOADED,
        payload: url
    }
}

export function imageUpload(file) {
    return dispatch => {

        const formData = new FormData();
        formData.append('file', file);
        post({path: `/images`, payload: formData})
            .then((response) => {
                dispatch(imageUploaded(response.headers.location));
                dispatch(loading(false));
            })
            .catch((error) => {
                dispatch(imageUploaded(undefined));
                dispatch(loading(false));
                dispatch(errorOccurred(error.message));
            })
    }
}

export function updateField(id, field, value) {
    const pathRequest = getPatchRequest(field, value);
    return dispatch => {
        patch({path: `/profiles/${id}`, payload: pathRequest})
            .then(response => {
                dispatch(profileFetched(response));
                dispatch(loading(false));
            })
            .catch(error => {
                dispatch(errorOccurred(error.message));
                dispatch(loading(false));
            })
    }
}

function getPatchRequest(field, value) {
    if(field === "city") {
        return [
            {
                "op": "replace",
                "path": "/location",
                "value": [parseFloat(value.value.lat), parseFloat(value.value.lon)]
            },
            {
                "op": "replace",
                "path": "/city",
                "value": `${value.value.city}`
            }
        ]
    } else {
        return [
            {
                "op": "replace",
                "path": `/${field}`,
                "value": `${value}`
            }
        ]
    }
}

export function navigateToPublicProfile(userId, history) {
    return dispatch => {
        history.push(paths.PUBLIC_PROFILE.replace(":userId", userId));
    };
}
