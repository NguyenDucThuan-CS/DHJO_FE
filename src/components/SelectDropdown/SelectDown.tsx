import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Typography } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText';

type ListOption = {
  id?: string
  name?: string
}[]
interface SelectDropdownDrops {
  list: ListOption
  name: string
  id?: string
  setId: (id: string) => void
  disabled?: boolean
  isRequired?: boolean
  error?: boolean
  helperText?:string
}

export default function SelectDropdown({ list, name, id, setId, disabled, isRequired, error, helperText }: SelectDropdownDrops) {
  const handleChange = (event: SelectChangeEvent) => {
    setId(event.target.value)
  }

  return (
    <Box>
      <FormControl fullWidth size='small' disabled={disabled}>
        <Typography sx={{ textAlign: 'left', width: '100%', fontWeight: 'bold', marginBottom:'7px' }}>{name}{isRequired && <span style={{ color: 'red' }}> (*)</span>}</Typography>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          //sx={{ padding: '12px 14px' }}
          value={id}
          onChange={handleChange}
          error = {error}
          sx = {{background:'white'}}
          //helperText = {helperText}
        >
          {list.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText sx = {{color: '#d32f2f'}}>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  )
}
