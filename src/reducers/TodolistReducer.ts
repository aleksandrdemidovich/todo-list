import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";

export const TodolistReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type){
        case 'REMOVE-TODOLIST':{
            return state.filter(f => f.id !== action.id)
        }
        case 'ADD-TODOLIST':{
            const newTodolist: TodolistType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all',
            }
            return [newTodolist, ...state]

        }
        case 'CHANGE-TODOLIST-TITLE':{
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.newTitle} : tl)

        }
        case 'SET-FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.value} : tl);
        }
        default: return state
    }
}

export type ActionsType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | SetFilterACACType

export type  RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
export const RemoveTodolistAC = (id: string) => {
    return{
        type: 'REMOVE-TODOLIST',
        id
    } as const
}

export type  AddTodolistACType = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (title: string, todolistId: string) => {
    return{
        type: 'ADD-TODOLIST',
        title, todolistId
    } as const
}

export type  ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
export const ChangeTodolistTitleAC = (newTitle: string, todolistId: string) => {
    return{
        type: 'CHANGE-TODOLIST-TITLE',
        newTitle, todolistId
    } as const
}

export type  SetFilterACACType = ReturnType<typeof SetFilterAC>
export const SetFilterAC = (value: FilterValuesType, todolistId: string) => {
    return{
        type: 'SET-FILTER',
        value, todolistId
    } as const
}

