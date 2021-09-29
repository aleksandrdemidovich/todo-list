import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

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
        setError(false);
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

        {/*<input value={title}*/}
        {/*       onChange={onChangeHandler}*/}
        {/*       onKeyPress={onKeyPressHandler}*/}
        {/*       className={error ? "error" : ""}*/}
        {/*/>*/}
      {/*<button onClick={addItem}>+</button>*/}

        <Button variant="contained"
                style={{maxWidth: '39px', maxHeight: '70px', minWidth: '39px', minHeight: '39px', marginLeft:'5px'}}
                onClick={addItem}>+
        </Button>

        {/*{error && <div className="error-message">Title is required</div>}*/}
    </div>
}




//-----------------------------------------------------------------------------------------------------------------

// import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
// import {Button, TextField} from "@material-ui/core";
//
// type AddItemFormPropsType = {
//     addItem: (title: string) => void
// }
//
// export function AddItemForm(props: AddItemFormPropsType) {
//
//     let [title, setTitle] = useState("")
//     let [error, setError] = useState<string | null>(null)
//
//     const addItem = () => {
//         if (title.trim() !== "") {
//             props.addItem(title);
//             setTitle("");
//         } else {
//             setError("Title is required");
//         }
//     }
//
//     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         setTitle(e.currentTarget.value)
//     }
//
//     const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//         setError(null);
//         if (e.charCode === 13) {
//             addItem();
//         }
//     }
//
//     return <div>
//         <TextField id="outlined-basic" label="Outlined" variant="outlined"
//                    value={title}
//                    onChange={onChangeHandler}
//                    onKeyPress={onKeyPressHandler}
//                    size="small"
//                    className={error ? "error" : ""}
//         />
//
//         {/*<input value={title}*/}
//         {/*       onChange={onChangeHandler}*/}
//         {/*       onKeyPress={onKeyPressHandler}*/}
//         {/*       className={error ? "error" : ""}*/}
//         {/*/>*/}
//         {/*<button onClick={addItem}>+</button>*/}
//
//         <Button variant="contained"
//                 style={{maxWidth: '37px', maxHeight: '70px', minWidth: '37px', minHeight: '37px'}}
//                 onClick={addItem}>+
//         </Button>
//
//         {error && <div className="error-message">{error}</div>}
//     </div>
// }
