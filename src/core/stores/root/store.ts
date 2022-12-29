import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setUser } from '../actions/actions';
import alertReducer from '../reducers/alert.reducer';
import loaderReducer from '../reducers/loader.reducer';
import userReducer from '../reducers/user.reducer';



const store = configureStore({
    reducer: combineReducers({
        userStore: userReducer,
        alertStore: alertReducer,
        loaderStore: loaderReducer
    })
});

export default store;