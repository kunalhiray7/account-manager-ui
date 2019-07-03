import {get} from "../api/http";

export const ACTIONS = {
    PROFILE_FETCHED: 'PROFILE_FETCHED',
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
