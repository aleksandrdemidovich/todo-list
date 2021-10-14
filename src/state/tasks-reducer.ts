import {TasksStateType} from '../App';
import {AddTodolistActionType} from "./todolists-reducer";


type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusActionType | AddTodolistActionType | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.taskID)}
        }
        case 'ADD-TASK':
            return ({
                ...state,
                [action.todolistID]: [{id: '4', title: action.taskTitle, isDone: false}, ...state[action.todolistID]]
            })
        case "CHANGE-TASK-STATUS":{
            return ({...state, [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {...t, isDone: action.status} : t)})
        }
        case "ADD-TODOLIST":{
            return { ...state, [action.todolistID]: [] }
        }
        case "REMOVE-TODOLIST":{
            const copyState = {...state};
            delete copyState[action.todolistID];
            return copyState;        }
        default:
            throw new Error("I don't understand this type")
    }
}

export type  RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        taskID, todolistID
    } as const
}

export type  AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (taskTitle: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        taskTitle, todolistID

    } as const
}

export type  ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskID: string, status:boolean, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskID, status, todolistID
    } as const
}

export type  RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export const RemoveTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistID
    } as const
}


