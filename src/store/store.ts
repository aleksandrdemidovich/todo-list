import {combineReducers, createStore} from 'redux';
import {TaskReducer} from "../reducers/TaskReducer";
import {TodolistReducer} from "../reducers/TodolistReducer";


const rootReducer = combineReducers({
    tasks: TaskReducer,
    todolists: TodolistReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;

