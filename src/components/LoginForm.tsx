import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Button, Grid, Input } from '@material-ui/core';
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginApi } from '../api/user';
import { toast } from "react-toastify";
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(4),
        flexShrink: 0,
      }
    },
    content_input:{
        width: '100%'
        },
    btn_submit:{

    }    
  }));

export default function LoginForm() {
    const {login} = useAuth();
    const classes = useStyles();
    const [error, setError] =  React.useState<any | null>(null);

    

    /**Estructura de formik */
    const formik = useFormik({
        initialValues: intialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            try {
           
                const response = await loginApi(formValue);
                const { token, user } = response;                
                login(token, user)
                toast.success('login success')
              } catch (error:any) {
                toast.error(error.message);
              } 
        },
      });

    
  return (
    <form className={classes.root} onSubmit={formik.handleSubmit}>
                <Grid>
                    <FormControl className={classes.content_input}>
                        <InputLabel htmlFor="component-simple">Email</InputLabel>
                        <Input 
                        id="component-simple" 
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.errors.email ? true : false}
                        
                        />
                    </FormControl>
                </Grid>
                <Grid>
                    <FormControl className={classes.content_input}>
                        <InputLabel htmlFor="component-simple">Password</InputLabel>
                        <Input 
                        id="component-simple" 
                        type='password' 
                        name='password' 
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.errors.password ? true : false}
                        />
                    </FormControl>
                </Grid>
               <div className="btn-submit">
                    <Button variant='contained' color='primary' type='submit'>
                            start session
                    </Button>
               </div>
                
                </form>
  )
}


function intialValues() {
    return {
      email: "",
      password: "",
    };
  }
  
  function validationSchema() {
    return {
        email: Yup.string().email().required(),
        password: Yup.string().required(),
  }
}