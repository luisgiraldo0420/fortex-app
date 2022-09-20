import React from 'react';
import {
    makeStyles, 
    createStyles, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Chip, 
    Input, 
    useTheme, 
    Theme, 
    Button 
} from '@material-ui/core';
import { useGroups } from '../../hooks/useGroups';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
     formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    btn_create:{
      textAlign: 'center',
      marginTop: 30
    },
    chip: {
        margin: 2,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      }
  }),
);
const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      }
      function getStyles(name: string, personName: string[], theme: Theme) {
        return {
          fontWeight:
            personName.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }

export default function AddDelRol(props: any) {
    const {assignRole, assignPerson} = useGroups();
    const classes = useStyles();
    const {onClose, onrefresh, group, flat} = props;
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);
    const [BuildData, setBuildData] =   React.useState<string[]>([]);        

    const handleChange = (event:any) => {
    const dataSelected = event.currentTarget.getAttribute('data-value').split(',');
        setPersonName(prev => [...prev, dataSelected[0]]);
        setBuildData(prev => [...prev, dataSelected[1]]);
    };


    const sendData = () => {
        if(BuildData){
            if(flat === 'roles'){
                assignRole(group, BuildData)
                onrefresh()
                onClose();
            }else if(flat === 'peoples'){
                assignPerson(group, BuildData)
                onrefresh()
                onClose();
            }
           
        }
    }
  return (
   
       <form>
         <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">{flat}</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
         {
            flat === 'roles' ? (
                group.roles.map((rol:any) => (
                    <MenuItem key={rol.id} value={[rol.name, rol.id]} style={getStyles(rol.name, personName, theme)}>
                      {!rol.active ? rol.name : ''}
                    </MenuItem>
                  ))
            ):
            (
                group.people.map((person:any) => (
                    <MenuItem key={person.id} value={[person.name, person.id]} style={getStyles(person.name, personName, theme)}>
                      {!person.active ? person.name : ''}
                    </MenuItem>
                  ))
            )
         }
        </Select>
      </FormControl>
      <Button 
      variant="contained" 
      color="primary" 
      id='crear'
      onClick={() => sendData()}
      >
       Assign
      </Button>
    </form>
  )
}
