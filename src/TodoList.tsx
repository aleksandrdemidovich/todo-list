import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeTodoListFilter: (filter: FilterValueType) => void
}


function TodoList(props: TodoListPropsType) {

    const [inputValue, setInputValue] = useState<string>('')

    const setAllFilter = () => props.changeTodoListFilter('all')
    const setActiveFilter = () => props.changeTodoListFilter('active')
    const setCompletedFilter = () => props.changeTodoListFilter('completed')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const addTask = () => {
        props.addTask(inputValue)
        setInputValue('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }

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
                <input value={inputValue}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={setAllFilter}>All</button>
                <button onClick={setActiveFilter}>Active</button>
                <button onClick={setCompletedFilter}>Completed</button>
            </div>
        </div>

    )
}


export default TodoList;