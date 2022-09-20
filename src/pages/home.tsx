import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container'
import { useGroups } from '../hooks/useGroups';
import { CircularProgress, Button } from '@material-ui/core';
import './styles.scss'
import GroupsTable from '../components/groupsTable';
import {BasicModal} from '../components/Common';
import { AddEditGroups } from '../components/groups';
import Swal from 'sweetalert2';
import { Group, Person } from '../types';
import AddDelRol from '../components/rolesAndPerson/AddDelRol'; 


export default function Home() {
  const [titleModal, setTitleModal] = useState<any | null>(null);
  const [contentModal, setContentModal] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const {groups, loading, getGroups, deleteGroup, deletePerson, deleteRole} = useGroups();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getGroups();
    
  }, [refresh]);
  console.log(groups);
  

  const openCloseModal = () =>{ setShowModal((prev) => !prev)};
  const onrefresh = () => setRefresh((prev) =>  !prev);

  const addGroup = () => {
    setTitleModal("New group");
    setContentModal(<AddEditGroups onClose={openCloseModal} onrefresh={onrefresh} />)
    openCloseModal()
  }

const updateGroup = (data:Group) => {
  setTitleModal("Edit group");
  setContentModal(<AddEditGroups onClose={openCloseModal} onrefresh={onrefresh} group={data} />)
  openCloseModal()
}
const onDeleteGroup= (data:Group) => {
  Swal.fire({
    text: "Are you sure you want to delete the record?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteGroup(data.id)
      onrefresh();
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}
const postGroup =(data:Group, person:Person)=>{
  deletePerson(data, person);
  onrefresh();
}
const postPoles =(data:Group, person:Person)=>{
  deleteRole(data, person);
  onrefresh();
}
const addRol = (group:Group ) => {
  setTitleModal("Assingn Roles");
  setContentModal(<AddDelRol onClose={openCloseModal} onrefresh={onrefresh} group={group} flat="roles"/>)
  openCloseModal()
}
const addPerson = (group:Group ) => { 
  setTitleModal("Assign peoples");
  setContentModal(<AddDelRol onClose={openCloseModal} onrefresh={onrefresh} group={group} flat="peoples"/>)
  openCloseModal()
}

  return (
   <Container className='content'>
    <div className='heading_table'>
      <h1>Groups</h1>
      <Button variant="contained" color="primary" onClick={addGroup}>
      New Group
    </Button>
    </div>
    {loading === true || loading === null ? ( 
      <div className="loader">
      <CircularProgress color="secondary" />
      </div> 
      ):
      (
     <GroupsTable
       group={groups.groups}
       updateGroup={updateGroup}
       onDeleteGroup={onDeleteGroup}
       postGroup={postGroup}
       postPoles={postPoles}
       addRol={addRol}
       addPerson={addPerson}
       />
       ) }
       <BasicModal 
       show={showModal} 
       title={titleModal}
       children={contentModal}
       onClose={openCloseModal}/>
   </Container>
  );
}
