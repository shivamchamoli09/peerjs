import { ActionReducerMapBuilder, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { setUser } from '../actions/actions';

const initialState = {
    user: {}
}

interface actionType {
    payload: {};
    type: string
}

const userReducer = createReducer(initialState, (builder: ActionReducerMapBuilder<typeof initialState>) => {
    builder.addCase(setUser, (state, action) => {
        state.user = action.payload ? action.payload : initialState.user;
    })
})

export default userReducer;