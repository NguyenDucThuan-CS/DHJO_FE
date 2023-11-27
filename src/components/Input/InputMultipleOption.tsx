import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import { Stack, Typography } from '@mui/material'

interface InputMultipleOptionProps {
  label: string
  options: { id: string; value: string }[]
  setSelectedOptions: (value: { id: string; value: string }[]) => void
  defaultValue: { id: string; value: string }[]
  disabled?: boolean,
  err?: boolean,
  helperText?: string
}

export default function InputMultipleOption({
  label,
  options,
  setSelectedOptions,
  defaultValue,
  disabled
}: InputMultipleOptionProps) {
  return (
    <Stack sx={{ width: '100%' }}>
      <Typography sx={{ textAlign: 'left', width: '100%', fontWeight: 'bold', marginBottom:'5px' }}>{label}</Typography>
      <Autocomplete
        multiple
        id='size-small-outlined-multi'
        size='small'
        //key={defaultValue}
        options={options}
        getOptionLabel={(option) => {
          return option.value
        }}
        onChange={(event, value) => setSelectedOptions(value)}
        value={defaultValue}
        renderInput={(params) => <TextField {...params} sx={{ flexWrap: 'nowrap' }} />}
        disabled={disabled}
        sx = {{background: 'white'}}
      />
    </Stack>
  )
}
