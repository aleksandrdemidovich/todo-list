import {v1} from "uuid";
import {TasksStateType } from "../App";

export const TaskReducer = (state: TasksStateType, action: ActionsType) => {
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
        default: return state
    }
}

export type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType | AddTodolistACType

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
export const AddTodolistAC = (title: string, todolistId: string) => {
    return{
        type: 'ADD-TODOLIST',
        title, todolistId
    } as const
}
