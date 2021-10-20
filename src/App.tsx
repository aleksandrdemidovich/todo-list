import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from "@mui/material";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, TaskReducer} from "./reducers/TaskReducer";
import {
    AddTodolistAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    SetFilterAC,
    TodolistReducer
} from "./reducers/TodolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const dispatch = useDispatch()
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    function removeTask(id: string, todolistId: string) {
        dispatch(RemoveTaskAC(id,todolistId))
    }
    function addTask(title: string, todolistId: string) {
        dispatch(AddTaskAC(title,todolistId))
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(ChangeTaskStatusAC(id,isDone,todolistId))
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(SetFilterAC(value, todolistId))
    }
    function removeTodolist(id: string) {
        let action = RemoveTodolistAC(id)
        dispatch(action)
    }
    function addTodolist(title: string) {
        const action = AddTodolistAC(title)
        dispatch(action)
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(ChangeTaskTitleAC(id,newTitle,todolistId))
    }
    function changeTodolistTitle(todolistId: string, newTitle: string, ) {
        dispatch(ChangeTodolistTitleAC(newTitle,todolistId))
    }

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Todolists
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding:'20px'}}><AddItemForm addItem={addTodolist}/></Grid>
                <Grid container spacing={3}>  {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        let tasksForTodolist = allTodolistTasks;

                        if (tl.filter === "active") {
                            tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                        }

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }</Grid>
            </Container>
        </div>
    );
}

export default App;
