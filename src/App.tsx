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
    let todolistId1 = v1();
    let todolistId2 = v1();


    let [todolists, dispatchTodolists] = useReducer(TodolistReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTasks] = useReducer(TaskReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(id: string, todolistId: string) {
        dispatchTasks(RemoveTaskAC(id,todolistId))
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f => f.id !== id)})
    }

    function addTask(title: string, todolistId: string) {
        dispatchTasks(AddTaskAC(title,todolistId))
        // setTasks({...tasks, [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchTasks(ChangeTaskStatusAC(id,isDone,todolistId))
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(f => f.id === id ? {...f, isDone: isDone} : f)})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchTodolists(SetFilterAC(value, todolistId))
    }

    function removeTodolist(id: string) {
        dispatchTodolists(RemoveTodolistAC(id))
        // setTodolists(todolists.filter(f => f.id !== id))
    }

    function addTodolist(title: string) {
        const action = AddTodolistAC(title, v1())
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchTasks(ChangeTaskTitleAC(id,newTitle,todolistId))
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, title: newTitle} : t)})
    }

    function changeTodolistTitle(todolistId: string, newTitle: string, ) {
        dispatchTodolists(ChangeTodolistTitleAC(newTitle,todolistId))
        // setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl))
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
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
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
