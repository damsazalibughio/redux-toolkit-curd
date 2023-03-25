import React from 'react'

export const EmployeeValidation = ({employeeValidation}) => {
  return (
    <>
        <ul className='errors-location'>
            {employeeValidation.length > 0 && 
                employeeValidation.map((validation, index) =>{
                return(
                    <li className='nav-link' key={index}>
                        <div className="toast-wrapper">
                            <div className={`r-toast ${validation.success ? 'success' : validation.error ? 'error' : ''} `}>
                                <div className="outer-container">
                                <i className={`bi ${validation.error ? 'bi-x-circle-fill' : 'bi-check-circle-fill'}`}></i>
                                </div>
                                <div className="inner-container">
                                    <p>{validation.error ? 'Error' : 'Success'}</p>
                                    <p>{validation.message}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                )
                })
                }
        </ul>
    </>
  )
}
