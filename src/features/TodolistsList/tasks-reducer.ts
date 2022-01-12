import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {AppRootStateType} from '../../app/store'
import {handleAsyncServerNetworkError, handleServerAppError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {appActions} from "../CommonActions/App";

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks',
    async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
    return {tasks, todolistId}
})
export const removeTaskTC = createAsyncThunk('tasks/removeTask',
    async (payload: { taskId: string, todolistId: string }, thunkAPI) => {
    const res = await todolistsAPI.deleteTask(payload.todolistId, payload.taskId)
    return {taskId: payload.taskId, todolistId: payload.todolistId}
})
export const addTaskTC = createAsyncThunk<TaskType, { title: string, todolistId: string }>('tasks/addTask',
    async (payload, thunkAPI) => {
        thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}))
        try {
            const res = await todolistsAPI.createTask(payload.todolistId, payload.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
                return res.data.data.item
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch);
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err) {
            return handleAsyncServerNetworkError(err as AxiosError, thunkAPI, false)
        }
    })
export const updateTaskTC = createAsyncThunk('tasks/updateTask',
    async (payload: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, thunkAPI) => {
        const state = thunkAPI.getState() as AppRootStateType

        const task = state.tasks[payload.todolistId].find(t => t.id === payload.taskId)
        if (!task) {
            return thunkAPI.rejectWithValue('task not found in the state')
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...payload.model
        }

        const res = await todolistsAPI.updateTask(payload.todolistId, payload.taskId, apiModel)
        try {
            if (res.data.resultCode === 0) {
                return payload
            } else {
                return handleServerAppError(res.data, thunkAPI.dispatch)
            }
        } catch (error) {
            return handleAsyncServerNetworkError(error as AxiosError, thunkAPI)
        }
    })

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks.splice(index, 1)
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
    }
})

export const tasksReducer = slice.reducer;


// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

