import {useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateEmployeeStart, updateEmployee, cancelUpdate } from '../features/userSlice';
import { AddEmployeeModal } from '../components/EmployeeComponents/AddEmployeeModal';
import { DeleteEmployee } from '../components/EmployeeComponents/DeleteEmployee';


export const Dashboard = () => {
 
   // redux states and actions
   const employeeList = useSelector((state) => state.users.employees);
   const role = useSelector((state) => state.users.role);
   const dispatch =useDispatch()
    // employee record states 
  const [search, setSearch] = useState('')
 

  // open modal for add Employee data
  const [showModal, setShowModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [editingMode, setEditingMode] = useState(false)
  const [employeeId, setEmployeeId] = useState(null)

  // update edit functionality
  const [editEmployeeData, setEditEmployeeData] = useState([])

  const editChangeHandler = (event) =>{
    const {name, value} = event.target

    setEditEmployeeData( (prev) =>{
    return {...prev, [name]:value}
     })  
}

  const editEmployee = (employee) =>{

    setEditEmployeeData(employee)
    dispatch(
      updateEmployeeStart({id:employee.id})
    )    

    setEditingMode(true)
  }

  const editEmployeeSuccess = (userId) =>{

    dispatch(
      updateEmployee(
        {id:userId,
          fullName:editEmployeeData.fullName,
          email:editEmployeeData.email,
          role:editEmployeeData.role
        }
        )
    )
    
    setEditingMode(false)
  }
 
  // employee record handle change function
  const changeFilterEmployee = (event) =>{
    setSearch(event.target.value)    
  }

  const getEmployeeId = (userId) =>{
    setEmployeeId(userId)
    setShowConfirmModal(true)
  }

 
  return (
    <div className='container-dashboard'>
      <div className="card mt-3" style={{width:'80%'}}>
        <div className="card-header">
          <h3 className='fs-6'>
           <i className="bi bi-people-fill text-info fs-4"></i> Employee Record
          </h3>
        </div>
        <div className="card-body">
         <div className="record-header d-flex justify-content-between border-bottom pb-4">
          <button type='button' className='btn btn-sm btn-outline-secondary' onClick={() => setShowModal(true)}>Add Employee</button>
          <input type="text" className='form-control' name="search" placeholder='Search Employee...' style={{width:'25%'}} onChange={changeFilterEmployee}/>
         </div>
         <div className="employee-record">
         {employeeList.length >0 ? 
         <table className="table table-striped table-responsive employee-table">
            <thead>
              <tr>
                <th scope="col" style={{width:'5%'}}>#</th>
                <th scope="col" >Full Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col" style={{width:'11%'}}>{editingMode ? 'Update' : 'Edit'}</th>
                <th scope="col" style={{width:'11%'}}>{editingMode ? 'Cancel' :'Delete'}</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.filter((employee) => {
               
                if(search === ''){
                  return employee
                }else if(employee.fullName.toLowerCase().includes(search.toLowerCase()) || employee.role.toLowerCase().includes(search.toLowerCase()) || employee.email.toLowerCase().includes(search.toLowerCase())){
                  return employee;
                }
               else{
                return 0
               }
              })
              .map((employee, index) =>{
                return (
                <tr key={index}>
                    <th scope="row">{++index}</th>
                    <td>{!employee.editStatus
                     ? employee.fullName
                     : <input type='text' className='form-control' name='fullName' value={editEmployeeData.fullName}  onChange={ editChangeHandler}/>
                      }
                    </td>
                    <td>{!employee.editStatus
                     ? employee.email 
                     : <input type='text' className='form-control' name='email' value={editEmployeeData.email} onChange={editChangeHandler}/>
                     }
                    </td>
                    <td>{!employee.editStatus
                     ? employee.role 
                     : <select name="role" className='form-control' value={editEmployeeData.role} id="role" onChange={editChangeHandler}>
                          <option value=''>Select Role</option>
                          {role.map((role) =>{
                              return <option key={role} value={role}>{role}</option>
                          })}
                        </select>
                        }
                      </td>
                    <td>{!employee.editStatus
                     ? <i className="bi bi-pencil-square" onClick={()=>editEmployee(employee)}></i>
                     : <button type="button" className="btn btn-sm btn-outline-success"  onClick={() => editEmployeeSuccess(employee.id)}>Update</button>

                        }
                     </td>
                    <td>{employee.editStatus 
                      ? <button type="button" className="btn btn-sm btn-outline-danger" onClick = {()=> dispatch(cancelUpdate({id:employee.id}))}>Cancel</button>
                      : <i className="bi bi-trash3-fill" onClick={() => getEmployeeId(employee.id)}></i>
                      }
                    </td>
                </tr>
                )
                })
              }
            </tbody>
          </table>
          :<div className='text-danger text-center fs-1'>Record Not Found</div>
            }
         </div>
        </div>
      </div>
      {showModal ? <AddEmployeeModal setShowModal = {setShowModal} /> :''}
      {/* {showConfirmModal ? <ConfirmationModal setShowConfirmModal={setShowConfirmModal}/> : ''} */}
      { showConfirmModal ? <DeleteEmployee employeeId = {employeeId}  setShowConfirmModal = {setShowConfirmModal}  /> : ''}
      
      
      
      
      
    </div>
  )
}

