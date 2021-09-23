import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
    onChange: (title: string) => void
    title: string
}

export const EditableSpan = (props:EditableSpanPropsType) => {
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)

    const setActiveMode = () => {
        setEditMode(true)
    }
    const setViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }



    return( editMode
            ? <input autoFocus
                     onChange={onChangeHandler}
                     onBlur={setViewMode}
                     value={title}
                     type="text"/>
            : <span   onDoubleClick={setActiveMode}>{title}</span>
    )
}