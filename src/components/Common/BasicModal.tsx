import React from 'react'
import { Modal, makeStyles, createStyles } from '@material-ui/core';
import './BasicModal.scss';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '45%',
      left: '50%',
      transform: 'translate(-55%, -47%)',
      borderRadius: 10
    },
  }),
);
  
export function BasicModal(props:any) {
    const {show, title, children, onClose} = props;
    const classes = useStyles();
  return (
    <Modal
    className='basic_modal'
    open={show}
    onClose={onClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
     <div className={classes.paper}>
        {title && <h2 id="simple-modal-title">{title}</h2>}
        <div className="content-modal">{children}</div>
    </div>
  </Modal>
  )
}
