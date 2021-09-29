import {TaskType} from "../Todolist";
import {v1} from "uuid";

export const TaskReducer = (state: Array<TaskType>, action: ActionsType) => {
    switch (action.type){
        case 'REMOVE-TASK':{
            return [...state.filter(t => t.id !== action.id)]
        }
        case 'ADD-TASK':{
            return [{id: v1(), title: action.title, isDone: false},...state]
        }
        case 'CHANGE-TASK-STATUS':{
            return [...state.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)]
        }
        default: return state
    }
}

export type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType

export type  RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
export const RemoveTaskAC = (id: string) => {
    return{
        type: 'REMOVE-TASK',
        id
    } as const
}

export type  AddTaskACType = ReturnType<typeof AddTaskAC>
export const AddTaskAC = (title: string) => {
    return{
        type: 'ADD-TASK',
        title
    } as const
}

export type  ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>
export const ChangeTaskStatusAC = (taskId: string, isDone: boolean) => {
    return{
        type: 'CHANGE-TASK-STATUS',
        taskId,
        isDone
    } as const
}