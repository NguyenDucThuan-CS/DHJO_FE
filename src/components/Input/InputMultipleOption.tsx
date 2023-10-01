import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import { Stack, Typography } from '@mui/material'

interface InputMultipleOptionProps {
  label: string
  options: { id: string; value: string }[]
  setSelectedOptions: (value: { id: string; value: string }[]) => void
  defaultValue: { id: string; value: string }[]
}

export default function InputMultipleOption({ label, options, setSelectedOptions }: InputMultipleOptionProps) {
  return (
    <Stack sx={{ width: '100%' }}>
      <Typography sx={{ textAlign: 'left', width: '100%', fontWeight: 'bold' }}>{label}</Typography>
      <Autocomplete
        multiple
        id='size-small-outlined-multi'
        size='small'
        options={options}
        getOptionLabel={(option) => {
          return option.value
        }}
        onChange={(event, value) => setSelectedOptions(value)}
        defaultValue={[] as { id: string; value: string }[]}
        renderInput={(params) => <TextField {...params} sx={{ flexWrap: 'nowrap' }} />}
      />
    </Stack>
  )
}
