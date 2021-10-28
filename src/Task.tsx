import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";


export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    changeTaskTitle: (taskId: string, newValue: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log('task render')

    const {id, isDone, title} = props.task


    const onClickHandler = useCallback(() => props.removeTask(id), [id])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(id, newIsDoneValue);
    }, [id, props.changeTaskStatus])
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(id, newValue);
    }, [id, props.changeTaskTitle])

    return <li key={id} className={isDone ? "is-done" : ""}>
        <Checkbox defaultChecked color={"success"}
                  onChange={onChangeHandler}
                  checked={isDone} />
        <EditableSpan value={title}
                      onChange={onTitleChangeHandler} />
        <IconButton aria-label="delete">
            <DeleteIcon onClick={onClickHandler}/>
        </IconButton>
    </li>
})


