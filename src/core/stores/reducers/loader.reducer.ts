import { ActionReducerMapBuilder, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { setLoader } from '../actions/actions';

const initialState = {
    loader: false
}

interface actionType {
    payload: {};
    type: string
}

const loaderReducer = createReducer(initialState, (builder: ActionReducerMapBuilder<typeof initialState>) => {
    builder.addCase(setLoader, (state, action) => {
        state.loader = action?.payload ? action.payload : false;
    })
})

export default loaderReducer;