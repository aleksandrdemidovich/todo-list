import {initializeAppWorkerSaga} from "./app-sagas";
import {call, put} from "redux-saga/effects";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {setInitializedAC} from "./app-reducer";

let meResponse: any

beforeEach(() => {
    meResponse = {
        resultCode: 0,
        data: {
            login: '',
            email: '',
            id: 1,
            resultCode: 0
        },
        fieldsErrors: [],
        messages: []
    }
});

test('initializeAppWorkerSaga success', () => {
    const gen = initializeAppWorkerSaga()
    let result = gen.next()
    expect(result.value).toEqual(call(authAPI.me))

    result = gen.next(meResponse)
    expect(result.value).toEqual(put(setIsLoggedInAC(true)))

    result = gen.next()
    expect(result.value).toEqual(put(setInitializedAC(true)))
})


test('initializeAppWorkerSaga unsuccess', () => {
    const gen = initializeAppWorkerSaga()
    let result = gen.next()
    expect(result.value).toEqual(call(authAPI.me))

    meResponse.data.resultCode = 1

    result = gen.next(meResponse)
    expect(result.value).toEqual(put(setInitializedAC(true)))
})
