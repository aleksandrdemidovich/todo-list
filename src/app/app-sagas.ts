import {authAPI, ResponseType} from "../api/todolists-api";
import {call, put, takeEvery} from "redux-saga/effects";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {setInitializedAC} from "./app-reducer";

export function* initializeAppWorkerSaga() {
    const res: ResponseType<{ resultCode: number }> = yield call(authAPI.me)
    if (res.data.resultCode === 0) {
        yield put(setIsLoggedInAC(true));
    } else {

    }
    yield put(setInitializedAC(true));
}

export const initializeApp = () => ({type: 'APP/INITIALIZE-APP'})

export function* appWatcherSaga(){
    yield takeEvery('APP/INITIALIZE-APP', initializeAppWorkerSaga)
}
