import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import registrationReducer from './registration/reducer';


export default function configureStore() {

    const appReducer = combineReducers({
        registration: registrationReducer,
    });

    const rootReducer = (state, action) => {

        return appReducer(state, action);
    };

    return createStore(
        rootReducer,
            applyMiddleware(
                thunk
            )
    );
}
