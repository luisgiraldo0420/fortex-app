import {
    Table, 
    TableContainer,
    TableHead,
    TableRow, 
    TableCell, 
    makeStyles, 
    Paper,
    TableBody,
 } from '@material-ui/core';
import { map } from 'lodash';
import BtnColapse from './BtnColapse';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  content:{
    padding: 100
  },
  heading_table:{
    textAlign: 'center',
    paddingTop: 20
  },
  table_flex:{
    display: 'flex',

  }
});

export default function GroupsTable(props: any) {
    const classes = useStyles();

           
    const {group} = props   
  return (
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="collapsible table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Description</TableCell>
          <TableCell align="right">Members</TableCell>
          <TableCell>actions</TableCell>
        </TableRow>
      </TableHead>
        <TableBody>
            {map(group, (row:any) => (
            <>
            <BtnColapse config={props} row={row}/>
            </>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
  )
}

