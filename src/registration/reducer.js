import { ACTIONS } from './actions';

export const DEFAULT_STATE = {
    singleChoiceAttributes: {},
    cities: {},
    isLoading: false,
    error: undefined
};

const registrationReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ACTIONS.SINGLE_CHOICE_ATTR_FETCHED:
            return {
                ...state,
                singleChoiceAttributes: action.payload
            };
        case ACTIONS.LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case ACTIONS.CITIES_FETCHED:
            return {
                ...state,
                cities: action.payload
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
