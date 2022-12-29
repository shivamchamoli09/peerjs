import { ActionReducerMapBuilder, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IAlert } from '../../types/store.types';
import { setAlert } from '../actions/actions';

const initialState = {
    alert: {} as IAlert,
}

interface actionType {
    payload: IAlert;
    type: string
}


const alertReducer = createReducer(initialState, (builder: ActionReducerMapBuilder<typeof initialState>) => {
    builder.addCase(setAlert, (state, action) => {
        state.alert = action.payload ? action.payload : initialState.alert;
        // setTimeout(() => {
        //     state.alert = initialState.alert;
        // }, 1000)
    })
})


export default alertReducer;