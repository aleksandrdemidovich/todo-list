import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeTodoListFilter: (filter: FilterValueType) => void
    changeTaskStatus : (taskID: string, isDone:boolean) => void
}


function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const setAllFilter = () => props.changeTodoListFilter('all')
    const setActiveFilter = () => props.changeTodoListFilter('active')
    const setCompletedFilter = () => props.changeTodoListFilter('completed')

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if(error){
            setError(false)
        }
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(title)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }
    const tasksList = props.tasks.map(t => {
        return (
            <li key={t.id} >
                <button onClick={() => props.removeTask(t.id)}>x</button>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={e => props.changeTaskStatus(t.id, e.currentTarget.checked)}
                />
                <span className={t.isDone? 'is-done' : ''}>{t.title}</span>
            </li>
        )
    })

    const allBtnClass = props.filter === 'all' ? 'active-filter' : ''
    const activeBtnClass = props.filter === 'active' ? 'active-filter' : ''
    const completedBtnClass = props.filter === 'completed' ? 'active-filter' : ''

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeTitle}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div style={{color:'red'}}>Title is required</div>}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button
                    className={allBtnClass}
                    onClick={setAllFilter}>All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={setActiveFilter}>Active
                </button>
                <button
                    className={completedBtnClass}
                    onClick={setCompletedFilter}>Completed
                </button>
            </div>
        </div>

    )
}


export default TodoList;