import {call, put, takeEvery} from "redux-saga/effects";
import {authAPI, LoginParamsType, ResponseType} from "../../api/todolists-api";
import {setAppStatusAC} from "../../app/app-reducer";
import {setIsLoggedInAC} from "./auth-reducer";
import {AxiosError, AxiosResponse} from "axios";
import {handleServerAppErrorSaga, handleServerNetworkErrorSaga} from "../../utils/error-utils";


export function* loginWorkerSaga(action: ReturnType<typeof login>) {
    yield put(setAppStatusAC('loading'))
    try {
        const res : AxiosResponse<ResponseType<{ userId: number }>> = yield call(authAPI.login, action.data)
        if (res.data.resultCode === 0) {
            yield put(setIsLoggedInAC(true))
            yield put(setAppStatusAC('succeeded'))
        } else {
            yield handleServerAppErrorSaga(res.data);
        }
    } catch (error) {
        yield handleServerNetworkErrorSaga(error as AxiosError)
    }
}
export const login = (data: LoginParamsType) => ({type: 'AUTH/LOGIN', data})


export function* logoutWorkerSaga(action: ReturnType<typeof logout>) {
    yield put(setAppStatusAC('loading'))
    try {
        const res : AxiosResponse<ResponseType> = yield call(authAPI.logout)
        if (res.data.resultCode === 0) {
            yield put(setIsLoggedInAC(false))
            yield put(setAppStatusAC('succeeded'))
        } else {
            yield handleServerAppErrorSaga(res.data);
        }
    } catch (error){
        yield handleServerNetworkErrorSaga(error as AxiosError)
    }
}
export const logout = () => ({type: 'AUTH/LOGOUT'})


export function* authWatcherSaga(){
    yield takeEvery('AUTH/LOGIN', loginWorkerSaga)
    yield takeEvery('AUTH/LOGOUT', logoutWorkerSaga)
}
