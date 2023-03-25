import { Button } from './Button'
import React from 'react'

export const DeleteButton = ({deleteEmployee}) => {
  return (
    <Button className='btn btn-danger' onClick={deleteEmployee}>Delete</Button>
  )
}
