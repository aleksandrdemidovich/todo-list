import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {appActions} from "../CommonActions/App";


export const loginTC = createAsyncThunk('auth/login',
    async (data: LoginParamsType, thunkAPI) => {
        try {
            thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}))
            const res = await authAPI.login(data)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
                return {isLoggedIn: true}
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (error) {
            return handleAsyncServerNetworkError(error as AxiosError, thunkAPI)
        }

    })

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
            return {isLoggedIn: false}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, thunkAPI)
    }
})



const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        });
        builder.addCase(logoutTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }
})

export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions
