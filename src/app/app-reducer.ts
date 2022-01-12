import {authAPI} from "../api/todolists-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {appActions} from "../features/CommonActions/App";


export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (payload, thunkAPI) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setIsLoggedInAC({isLoggedIn: true}))
    } else {

    }
})


const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initializeAppTC.fulfilled, (state, action) => {
            state.isInitialized = true
        });
        builder.addCase(appActions.setAppStatusAC, (state, action) => {
            state.status = action.payload.status
        });
        builder.addCase(appActions.setAppErrorAC, (state, action) => {
            state.error = action.payload.error
        })
    }
})
export const appReducer = slice.reducer;

