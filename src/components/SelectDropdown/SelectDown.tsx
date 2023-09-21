import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Typography } from '@mui/material'

type ListOption = {
  id: string
  name: string
}[]
interface SelectDropdownDrops {
  list: ListOption
  name: string
  id?: string
  setId: (id: string) => void
}

export default function SelectDropdown({ list, name, id, setId }: SelectDropdownDrops) {
  const handleChange = (event: SelectChangeEvent) => {
    setId(event.target.value)
  }

  return (
    <Box>
      <FormControl fullWidth>
        <Typography sx={{ textAlign: 'left', width: '100%', fontWeight: 'bold' }}>{name}</Typography>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          //sx={{ padding: '12px 14px' }}
          value={id}
          onChange={handleChange}
        >
          <MenuItem key={0} value={'0'}>
            {'-----'}
          </MenuItem>
          {list.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
