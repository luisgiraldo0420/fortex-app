import Items from './Items';
import {
    makeStyles,
    Drawer,
    Divider
} from '@material-ui/core'
const estilos = makeStyles(theme => ({
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
    },
    toolbar: theme.mixins.toolbar
}))

export function SideMenu(props: any) {

  const classes = estilos()
  return (
      <Drawer
    className={classes.drawer}  
    classes={{
        paper: classes.drawerPaper,
    }}
    anchor="left"
    >
    <div className={classes.toolbar}></div>
    <Divider />
    <Items/>
</Drawer>
    )
}
