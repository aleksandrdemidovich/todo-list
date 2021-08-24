import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    //BLL
    const [tasks, setTasks] = useState<Array<TaskType>>([         //state
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'GraphQL', isDone: false},
        {id: 5, title: 'Redux', isDone: false},
        {id: 6, title: 'Vue', isDone: false},
        {id: 7, title: 'Angular', isDone: false},
        {id: 8, title: 'NodeJS', isDone: true},
    ])
    const [filter, setFilter] = useState<string>('all') //active, completed

    const changeTodoListFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID))
        console.log(tasks)
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
                title={'What to learn'}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
