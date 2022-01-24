import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './app-reducer'
import {authReducer} from "../features/Login/auth-reducer";
import createSagaMiddleware from 'redux-saga'
import {all, call} from 'redux-saga/effects'
import {tasksWatcherSaga} from "../features/TodolistsList/tasks-sagas";
import {appWatcherSaga} from "./app-sagas";
import {todolistsWatcherSaga} from "../features/TodolistsList/todolists-sagas";
import {authWatcherSaga} from "../features/Login/auth-sagas";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield all([
        call(appWatcherSaga),
        call(tasksWatcherSaga),
        call(todolistsWatcherSaga),
        call(authWatcherSaga),
    ]);
}

// @ts-ignore
window.store = store;
