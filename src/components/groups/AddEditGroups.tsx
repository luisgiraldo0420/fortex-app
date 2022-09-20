import React from 'react'
import {TextField, makeStyles, createStyles, Button} from '@material-ui/core';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {useGroups} from '../../hooks/useGroups';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
    btn_create:{
      textAlign: 'center',
      marginTop: 30
    }
  }),
);

export function AddEditGroups(props:any) {
  const {onClose, onrefresh, group} = props
  const {addGroup, updateGroup} = useGroups();
  const classes = useStyles();
  const [error, setError] =  React.useState<any | null>(null);


  const formik = useFormik({
    initialValues: intialValues(group),
    validateOnChange: true,
    validationSchema: Yup.object(newSchema()),
    onSubmit: async (formValue) => {
        try {
          if (group) await updateGroup(group.id, formValue);
          else await addGroup(formValue);
          onrefresh();
          onClose();
          } catch (error:any) {
            toast.error(error.message);
          } 
    },
  });



  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
      <div>
        <TextField 
        label="Group name" 
        id="name" 
        size="small"
        name='name' 
        value={formik.values.name}
        onChange={formik.handleChange}
        />
        <TextField 
        label="Group description" 
        size="small"
        id="description" 
        name='description'
        value={formik.values.description}
        onChange={formik.handleChange}
         />
      </div>
     <div className={classes.btn_create}>
     <Button 
      variant="contained" 
      color="primary" 
      type='submit'
      id='crear'
      >
       {group ? "Update" : "Create"}
      </Button>
     </div>
    </form>
  )
}

function intialValues(group: any) {
  return {
    name: group?.name || "",
    description: group?.description || "",
  };
}

function newSchema() {
  return {
    name: Yup.string().required('true'),
    description: Yup.string().required('error'),
}
}