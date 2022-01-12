import {ResponseType} from '../api/todolists-api'
import {Dispatch} from 'redux'
import {AxiosError} from "axios";
import {appActions} from "../features/CommonActions/App";


type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(appActions.setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(appActions.setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(appActions.setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    dispatch(appActions.setAppStatusAC({status: 'failed'}))
}



export const handleAsyncServerAppError = <D>(data: ResponseType<D>,
                                             thunkAPI: ThunkAPIType,
                                             showError = true) => {
    if (showError) {
        thunkAPI.dispatch(appActions.setAppErrorAC({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleAsyncServerNetworkError = (error: AxiosError,
                                              thunkAPI: ThunkAPIType,
                                              showError = true) => {
    if (showError) {
        thunkAPI.dispatch(appActions.setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    }
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'failed'}))

    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}