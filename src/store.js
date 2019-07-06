import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer from './actionsAndReducers/reducer';


export default function configureStore() {

    const appReducer = combineReducers({
        registration: reducer,
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
