import React from 'react'
import { Button } from './Button'
export const CancelButton = ({setShowConfirmModal}) => {
  return (
    <Button backgroundColor='blue' onClick={() => setShowConfirmModal(false)}>Cancel</Button>
  )
}
