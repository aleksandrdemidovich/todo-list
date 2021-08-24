import React from 'react';
import {FilterValueType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeTodoListFilter: (filter: FilterValueType) => void
}


function TodoList(props: TodoListPropsType) {

    const tasksList = props.tasks.map(t => {
        return (
            <li>
                <button onClick={() => props.removeTask(t.id)}>x</button>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={() => props.changeTodoListFilter("all")}>All</button>
                <button onClick={() => props.changeTodoListFilter("active")}>Active</button>
                <button onClick={() => props.changeTodoListFilter("completed")}>Completed</button>
            </div>
        </div>

    )
}


export default TodoList;