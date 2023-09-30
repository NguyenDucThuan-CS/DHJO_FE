import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import Typography from '@mui/material/Typography'

interface SelectDateProps {
  value: string | number | Date | dayjs.Dayjs | null | undefined
  setValue: (newValue: string | number | Date | dayjs.Dayjs | null | undefined) => void
  name: string
}
export default function SelectDate({ value, setValue, name }: SelectDateProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography sx={{ textAlign: 'left', width: '100%', fontWeight: 'bold' }}>{name}</Typography>
      <DatePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
        slotProps={{ textField: { size: 'small' } }}
      />
    </LocalizationProvider>
  )
}
