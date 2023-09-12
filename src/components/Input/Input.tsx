import * as React from 'react'
import { TextField } from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  error?: boolean
  helperText?: string
  label?: string
  register?: UseFormRegisterReturn
  type?: string
}

export const Input: React.FC<InputProps> = ({ error, helperText, label, register, type }) => {
  return (
    <TextField
      type={type ? type : 'text'}
      error={error}
      helperText={helperText}
      label={label}
      variant='outlined'
      margin='normal'
      fullWidth
      size='small'
      required
      {...register}
    />
  )
}
