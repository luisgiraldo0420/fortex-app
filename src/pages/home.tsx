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

/* 

0
: 
{id: 'f97e2ea9-4556-415d-bbe5-7987d6f22fc1', name: 'Default', active: false}
1
: 
{id: '46745a7e-4a91-4370-86eb-39b615150e01', name: 'Executive', active: false}
2
: 
{id: 'ac801f1d-b9ad-4aa4-b185-81ab12be1741', name: 'Supervisor', active: false}
3
: 
{id: 'b1d3d930-9336-40d7-99e8-79abb25f85c1', name: 'Project manager', active: false}
4
: 
{id: 'a39ef3b3-1917-4303-ab41-814a186a1d42', name: 'Marketing manager', active: false}
5
: 
{id: '8988138c-9c5b-40fe-b99a-f408e3a90834', name: 'Finance manager', active: false}
6
: 
{id: 'c1a0fb23-e7fa-40e7-8c89-6cf8578b851b', name: 'Human resources', active: false}
length
: 
7 */