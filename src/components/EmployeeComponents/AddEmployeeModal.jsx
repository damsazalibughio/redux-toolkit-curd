import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../features/userSlice';
import { EmployeeValidation } from '../generalComponents/EmployeeValidation';

export const AddEmployeeModal = ({setShowModal}) => {
    const [employeeValidation, setEmployeeValidation] = useState([])
    const dispatch =useDispatch()
    const employeeList = useSelector((state) => state.users.employees);
    const role = useSelector((state) => state.users.role);


    let modalStyle ={
        display:'block',
        backgroundColor:'rgba(0,0,0,.4)'    
    }
    const [employeeData, setEmployeeData] = useState({
        fullName:'',
        email:'',
        role:''
       
      })

    const changeHandler = (event) =>{
        const {name, value} = event.target

        setEmployeeData( (prev) =>{
        return {...prev, [name]:value}
         })  
    }
    const addEmployee = (event) => {
        event.preventDefault()
        if(employeeData.fullName && employeeData.email && employeeData.role){
            const employeeExists = employeeList.find((employee) => employee.email === employeeData.email)
           
            if(employeeExists){
                setEmployeeData({
                    fullName:'',
                    email:'',
                    role:''
                  })
                  setEmployeeValidation([{error:true, message:'Employee already Exists'}])
                  console.log('already');
            }else{
                
                const nameRegex = /^[A-Za-z]+([A-Za-z' -]*[A-Za-z]+)*$/;
                if(nameRegex.test(employeeData.fullName)){

                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if(emailRegex.test(employeeData.email)){
                        dispatch( 
                            addUser(
                            {
                              // id:employeeList[employeeList.length-1].id +1,
                              fullName:employeeData.fullName,
                              email:employeeData.email,
                              role:employeeData.role}
                            )
                          )
                          setEmployeeData({
                            fullName:'',
                            email:'',
                            role:''
                          })
    
                          setEmployeeValidation([{success:true, error:false, message:'Employee Added'}])
                    }else{
                        setEmployeeValidation([{ error:true, message:'Please provide correct Full name'}])
                    }
                }else{
                    setEmployeeValidation([{ error:true, message:'Please provide correct email'}])
                }

            }
        }
        else{
        //    l
        let errors = [];
        if(!employeeData.fullName){
            errors.push({error:true, message: "Full Name can't be empty"})
        }
        if(!employeeData.email){
            errors.push({error:true, message: "Username can't be empty"})
        }
        if(!employeeData.role){
            errors.push({error:true, message:"Role can't be empty"})
        }
       
        setEmployeeValidation(errors)
        }
      }

  return (
   
    <div className='add-employee'>
        {/* <!-- Modal --> */}
        <div className="modal show fade" style={modalStyle}>
            <div className="modal-dialog" >
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">
                    <i className="bi bi-person-fill text-info fs-2 me-3"></i>
                        Add Employee
                    </h1>
                    <button type="button" className="button-close" onClick={() => setShowModal(false)}><i className="bi bi-x fs-2"></i></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={addEmployee}>
                        <div className="form-group my-3">
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" className='form-control' value={employeeData.fullName || ''} placeholder='Name...' name='fullName' onChange={changeHandler}/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="text" className='form-control' value={employeeData.email || ''} placeholder='Username...'  name='email'  onChange={changeHandler}/>
                        </div>
                        <div className="form-group mb-3">
                        
                            <select name="role" className='form-control' value={employeeData.role} id="role" onChange={changeHandler}>
                                <option value=''>Select Role</option>
                                {role.map((role) =>{
                                    return <option key={role} value={role}>{role}</option>
                                })}
                            </select>
                            {/* <Select /> */}
                            
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-secondary">Add</button>
                        </div>
                    </form>
                    
                </div>
                {/* data-bs-dismiss="modal" aria-label="Close" */}
                {/* <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div> */}
                </div>
            </div>
            <EmployeeValidation employeeValidation = {employeeValidation} />
        </div>

        
    </div>
  )
}
