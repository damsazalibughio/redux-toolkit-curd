import React, {useState} from 'react'

import { useSelector } from 'react-redux';
export const Select = () => {
    const [select, setSelect] = useState('')
    const role = useSelector((state) => state.users.role);

    const changeHandler = (event) =>{
        const {name, value} = event.target

        setSelect( (prev) =>{
        return {...prev, [name]:value}
         }) 
        // setSelect(event.target.value)
    }
  return (
    <>
        <label htmlFor="role">Role</label>
        <select name="role" className='form-control' value={select} id="role" onChange={changeHandler}>
            <option value=''>select role</option>
            {role.map((role) =>{
                return <option key={role} value={role}>{role}</option>
            })}
        </select>
    </>
  )
}
