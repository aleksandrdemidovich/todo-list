import React from 'react';
import './App.css';
import TodoList from "./TodoList";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const tasksOne: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS' , isDone: true },
        {id: 2, title: 'JS' , isDone:true },
        {id: 3, title: 'React' , isDone: false },
    ]
    const tasksTwo: Array<TaskType> = [
        {id: 1, title: 'Meat' , isDone: true },
        {id: 2, title: 'Beer' , isDone:true },
        {id: 3, title: 'Fish' , isDone: false },
    ]
    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasksOne}/>
            <TodoList title={'What to buy'} tasks={tasksTwo}/>
        </div>
    );
}

export default App;
