import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(false);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField id="outlined-basic" label="Enter title" aria-errormessage={'Title required!'}
                   variant="outlined"
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={error}
                   size="small"
                   className={error ? "error" : ""}
        />

        <Button variant="contained"
                style={{maxWidth: '39px', maxHeight: '70px', minWidth: '39px', minHeight: '39px', marginLeft: '5px'}}
                onClick={addItem}>+
        </Button>
    </div>
})

