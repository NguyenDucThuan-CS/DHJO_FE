import * as React from 'react'
import { TextField, Typography } from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  error?: boolean
  helperText?: string
  label?: string
  register?: UseFormRegisterReturn
  type?: string
  disabled?: boolean
}

export const Input: React.FC<InputProps> = ({ error, helperText, label, register, type, disabled }) => {
  return (
    <>
      <Typography sx={{ textAlign: 'left', width: '100%', fontWeight: 'bold' }}>{label}</Typography>
      <TextField
        type={type ? type : 'text'}
        error={error}
        helperText={helperText}
        variant='outlined'
        margin='normal'
        fullWidth
        size='small'
        required
        disabled={disabled}
        sx={{ mt: '5px' }}
        {...register}
      />
    </>
  )
}
