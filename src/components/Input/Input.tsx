import * as React from 'react'
import { TextField, Typography } from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'
import Box from '@mui/material/Box/Box'
interface InputProps {
  error?: boolean
  helperText?: string
  label?: string
  register?: UseFormRegisterReturn
  type?: string
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
}

export const Input: React.FC<InputProps> = ({
  error,
  helperText,
  label,
  register,
  type,
  disabled,
  onChange,
  value
}) => {
  return (
    <Box>
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
        onChange={onChange}
        sx={{ mt: '5px' }}
        value={value}
        {...register}
      />
    </Box>
  )
}
