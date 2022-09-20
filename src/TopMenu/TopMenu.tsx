import "./TopMenu.scss";
import {AppBar, Toolbar, Typography, Button, makeStyles} from '@material-ui/core';
import { useAuth } from "../hooks/useAuth";

const useStyles = makeStyles(theme => ({
  menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
          display: 'none',
      },
  },
  title:{
      flexGrow: 1
  },
  appBar: {
      [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${240}px)`,
          marginLeft: 240,
      },
  },
}))
export function TopMenu() {
const classes = useStyles()
const {logout} = useAuth();





  return (

   <>
   <AppBar>
    <Toolbar>
      <Typography variant='h6' className={classes.title}>
        Admin
      </Typography>
      <Button variant="text" color="inherit" onClick={logout}>
                    Salir
                </Button>
    </Toolbar>
   </AppBar>
   </>
  );
}
