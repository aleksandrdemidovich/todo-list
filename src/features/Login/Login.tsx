import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikHelpers, useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-reducer";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {Navigate} from "react-router-dom";

type FormValuesType ={
    email: string
    password: string
    rememberMe: boolean
}
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Min length 3 symbols';
            } else if (!values.password) {
                errors.password = 'Required';
            }
            return errors
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            const res = await dispatch(loginTC(values))
            if(res.type === loginTC.rejected.type){
                if(res.payload.errors){
                    formikHelpers.setFieldError(res.payload.fieldsErrors[0].field, res.payload.fieldsErrors[0].error)
                }
            }
            console.log(res)
            // formik.resetForm()
        },
    })

    if(isLoggedIn){
        return  <Navigate to="/"/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}
                                   onBlur={formik.handleBlur}
                                   error={formik.touched.email && !!formik.errors.email?.length}
                                   helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                                   onBlur={formik.handleBlur}
                                   error={formik.touched.password && !!formik.errors.password?.length}
                                   helperText={formik.touched.password && formik.errors.password}
                        />
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox {...formik.getFieldProps('rememberMe')}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
