import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    //BLL
    const [tasks, setTasks] = useState<Array<TaskType>>([         //state
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Vue', isDone: false},
        {id: v1(), title: 'Angular', isDone: false},
        {id: v1(), title: 'NodeJS', isDone: true},
    ])
    const [filter, setFilter] = useState<FilterValueType>('all') //active, completed

    const changeTodoListFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
        console.log(tasks)
    }
    const addTask = (title: string) =>{
        let newTask = {id: v1(), title: title, isDone: false}
        const updatedTask: Array<TaskType> = [newTask, ...tasks]
        setTasks(updatedTask)
    }
    const changeTaskStatus = (taskID: string, isDone:boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
    }

    let tasksForRender = tasks

    if (filter === "active") {
        tasksForRender = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForRender = tasks.filter(t => t.isDone)
    }

    //UI
    return (
        <div className="App">
            <TodoList
                filter={filter}
                title={'What to learn'}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
