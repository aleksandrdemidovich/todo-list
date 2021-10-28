import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, Checkbox} from "@mui/material";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    }, [props.id, props.removeTodolist])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);


    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }


    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [])
    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean) => props.changeTaskStatus(taskId, newIsDoneValue, props.id), [])
    const changeTaskTitle = useCallback((taskId: string, newValue: string) => props.changeTaskTitle(taskId, newValue, props.id), [])

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton aria-label="delete">
                <DeleteIcon onClick={removeTodolist}/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ol>
            {
                tasksForTodolist.map(t => {
                    return <Task key={t.id}
                                 task={t}
                                 removeTask={removeTask}
                                 changeTaskStatus={changeTaskStatus}
                                 changeTaskTitle={changeTaskTitle}
                    />
                })
            }
        </ol>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button variant={props.filter === 'all' ? "contained" : "outlined"} size="small"
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "contained" : "outlined"} color="secondary" size="small"
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "contained" : "outlined"} color="success" size="small"
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
})


