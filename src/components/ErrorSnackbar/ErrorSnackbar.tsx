import React from 'react'
import {useSelector} from 'react-redux'
import {appActions} from '../../features/CommonActions/App'
import {AppRootStateType} from '../../utils/types'
import {useActions} from '../../utils/redux-utils'
import {Alert, AlertProps, Snackbar} from "@mui/material";

function ErrorAlert(props: AlertProps) {
    return <Alert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    //const [open, setOpen] = React.useState(true)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);
    const {setAppError} = useActions(appActions)

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setAppError({error: null});
    }


    const isOpen = error !== null;

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <ErrorAlert onClose={handleClose} severity="error">
                {error}
            </ErrorAlert>
        </Snackbar>
    )
}
