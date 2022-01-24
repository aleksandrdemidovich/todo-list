import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../app/store'
import {
    changeTodolistFilterAC,
    FilterValuesType,
    TodolistDomainType
} from './todolists-reducer'
import { TasksStateType } from './tasks-reducer'
import { TaskStatuses } from '../../api/todolists-api'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import { Todolist } from './Todolist/Todolist'
import {Navigate} from "react-router-dom";
import {addTask, removeTask, updateTask} from "./tasks-sagas";
import {addTodolist, changeTodolistTitle, fetchTodolists, removeTodolist} from "./todolists-sagas";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        const thunk = fetchTodolists()
        dispatch(thunk)
    }, [])

    const removeTaskHandler = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTask(todolistId, id))
    }, [])

    const addTaskHandler = useCallback(function (title: string, todolistId: string) {
        dispatch(addTask(title, todolistId))
    }, [])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTask(id, {status}, todolistId))
    }, [])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(updateTask(id, {title: newTitle}, todolistId))
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [])

    const removeTodolistCallback = useCallback(function (id: string) {
        dispatch(removeTodolist(id))
    }, [])

    const changeTodolistTitleCallback = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitle(id, title))
    }, [])

    const addTodolistCallback = useCallback((title: string) => {
        dispatch(addTodolist(title))
    }, [dispatch])


    if(!isLoggedIn){
        return  <Navigate to="login"/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolistCallback}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTaskHandler}
                                changeFilter={changeFilter}
                                addTask={addTaskHandler}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolistCallback}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitleCallback}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
