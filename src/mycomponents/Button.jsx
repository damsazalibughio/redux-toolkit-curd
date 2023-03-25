import React from 'react'

export const Button = ({children, backgroundColor, className, event}) => {
  return (
   <button  style={{backgroundColor, className}} onClick ={event}>{children}</button>
  )
}
