import { ACTIONS } from './actions';

export const DEFAULT_STATE = {
    isLoading: false,
    error: undefined,
    user: undefined
};

const registrationReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ACTIONS.PROFILE_FETCHED:
            return {
                ...state,
                user: action.payload
            };
        case ACTIONS.LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case ACTIONS.ERROR_OCCURRED:
            return {
                ...state,
                error: action.payload
            };

        default:
            return {
                ...state
            }
    }
};

export default registrationReducer;
