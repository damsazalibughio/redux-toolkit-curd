import React from 'react'
import { deleteUser } from '../../features/userSlice';
import { useDispatch } from 'react-redux';
import { ConfirmationModal } from './ConfirmationModal';


export const DeleteEmployee = ({employeeId, setShowConfirmModal}) => {
    const dispatch = useDispatch()

    const deleteEmployee = () =>{
      // console.log(employeeId);
        dispatch(deleteUser({id:employeeId}))
        setShowConfirmModal(false)
      }

  return (
    <div>
        
       <ConfirmationModal setShowConfirmModal={setShowConfirmModal} deleteEmployee={deleteEmployee}/>
       
    </div>
  )
}
