import {v1} from "uuid";
import {TasksStateType} from "../App";
import {RemoveTodolistACType} from "./TodolistReducer";

// let todolistId1 = v1();
// let todolistId2 = v1();

let initialState:TasksStateType = {
    // [todolistId1]: [
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ],
    // [todolistId2]: [
    //     {id: v1(), title: "Milk", isDone: true},
    //     {id: v1(), title: "Beer", isDone: true},
    //     {id: v1(), title: "Apple", isDone: false},
    //     {id: v1(), title: "Potato", isDone: false},
    // ]
}

export const TaskReducer = (state: TasksStateType = initialState, action: ActionsType):TasksStateType => {
    switch (action.type){
        case 'REMOVE-TASK':{
            return ({...state, [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.id)})
        }
        case 'ADD-TASK':{
            return ({...state, [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]})
        }
        case 'CHANGE-TASK-STATUS':{
            return ({...state, [action.todolistId]: state[action.todolistId].map(f => f.id === action.id ? {...f, isDone: action.isDone} : f)})
        }
        case 'CHANGE-TASK-TITLE':{
            return ({...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {...t, title: action.newTitle   } : t)})
        }
        case "ADD-TODOLIST":{
            let todolistId = action.todolistId;
            return { ...state, [todolistId]: [] }
        }
        case "REMOVE-TODOLIST":{
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        default: return state
    }
}

export type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType | AddTodolistACType | RemoveTodolistACType

export type  RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
export const RemoveTaskAC = (id: string, todolistId: string) => {
    return{
        type: 'REMOVE-TASK',
        id, todolistId
    } as const
}

export type  AddTaskACType = ReturnType<typeof AddTaskAC>
export const AddTaskAC = (title: string, todolistId: string) => {
    return{
        type: 'ADD-TASK',
        title, todolistId
    } as const
}

export type  ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>
export const ChangeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return{
        type: 'CHANGE-TASK-STATUS',
        id, isDone, todolistId
    } as const
}

export type  ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>
export const ChangeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return{
        type: 'CHANGE-TASK-TITLE',
        id, newTitle, todolistId
    } as const
}

export type  AddTodolistACType = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (title: string) => {
    return{
        type: 'ADD-TODOLIST',
        title, todolistId: v1()
    } as const
}
