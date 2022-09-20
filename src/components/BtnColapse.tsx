import React, {useState} from 'react'
import {
    Table, 
    TableHead,
    TableRow, 
    TableCell, 
    makeStyles, 
    Paper,
    TableBody,
    IconButton,
    Collapse,
    Box,
    Typography,
    Button
 } from '@material-ui/core';
 import DeleteIcon from '@material-ui/icons/Delete';
 import EditIcon from '@material-ui/icons/Edit';
 import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export default function BtnColapse({config, row}:any) {
const [open, setOpen] = useState<any | null>(null);

const {updateGroup, onDeleteGroup, postGroup, postPoles, addRol, addPerson} = config   

  return (
    <>
    <TableRow key={row.id}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">{row.members}</TableCell>
              <TableCell align="right" >
                  <Button
                    onClick={() => updateGroup(row)}
                      color="secondary"
                      startIcon={<EditIcon />}>
                  </Button> 
                  <Button
                  onClick={() => onDeleteGroup(row)}
                      color="secondary"
                      startIcon={<DeleteIcon />}>
                  </Button> 
                </TableCell>
                
            </TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                    People 
                    </Typography>
                    <Button
                        onClick={() => addPerson(row)}
                        color="secondary"
                        startIcon={<AddIcon />}>
                    </Button> 
                    <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>status</TableCell>
                        <TableCell>actions</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                       {row.people.filter((p:any) => p.active).map((p:any) => (
                                <TableRow key={p.id}>
                                     <TableCell align="left">{p.name}</TableCell>
                                     <TableCell align="left">{p.active}</TableCell>
                                     <TableCell align="center">
                                        <Button
                                           onClick={() => postGroup(row, p.id)}
                                            color="secondary"
                                            startIcon={<DeleteIcon />}>
                                        </Button> 
                                     </TableCell>
                                </TableRow> 
                            ))}
                        </TableBody>
                    </Table>
                    <Typography variant="h6" gutterBottom component="div">
                    Roles
                    </Typography>
                    <Button
                     onClick={() => addRol(row)}
                        color="secondary"
                        startIcon={<AddIcon />}>
                    </Button> 
                    <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>status</TableCell>
                        <TableCell>actions</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {row.roles.filter((r:any) => r.active).map((r:any) => (
                                <TableRow key={r.id} >
                                     <TableCell align="left">{r.name}</TableCell>
                                     <TableCell align="left">{r.active}</TableCell>
                                     <TableCell align="center">
                                        <Button
                                          onClick={() => postPoles(row, r.id)}
                                            color="secondary"
                                            startIcon={<DeleteIcon />}>
                                        </Button> 
                                     </TableCell>
                                </TableRow> 
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                </Collapse>
            </TableCell>
    </>
  )
}
