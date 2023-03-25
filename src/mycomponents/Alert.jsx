import React from 'react'

export const Alert = ({children}) => {
    let modalStyle ={
        display:'block',
        backgroundColor:'rgba(0,0,0,.4)'    
    }
  return (
    <>
         <div className="modal show fade rounded" style={modalStyle}>
        <div className="modal-dialog modal-dialog-centered" >
           {children}
        </div>
        </div>
    </>
  )
}
