import React from 'react'
// import { deleteUser } from '../features/userSlice';
// import { useDispatch } from 'react-redux';

export const ConfirmationModal = ({setShowConfirmModal, deleteEmployee}) => {

    let modalStyle ={
        display:'block',
        backgroundColor:'rgba(0,0,0,.4)'    
    }

  return (
    <div>
        {/* <!-- Modal --> */}
        <div className="modal show fade rounded" style={modalStyle}>
        <div className="modal-dialog modal-dialog-centered" >
            <div className="modal-content  py-5">
            <div className="text-center " style={{backgroundColor:'white'}}>
               
            </div>
            <div className="modal-body text-center">
            <h3 className='text-danger'>Are you sure you want to delete Employee?</h3>
            </div>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-danger mx-2" data-bs-dismiss="modal" onClick={deleteEmployee}>Yes</button>
                <button type="button" className="btn btn-secondary mx-2" onClick={() => setShowConfirmModal(false)}>No</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

// modal-dialog modal-dialog-centered