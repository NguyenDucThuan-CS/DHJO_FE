import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import Typography from '@mui/material/Typography'

interface SelectDateProps {
  value: string | number | Date | dayjs.Dayjs | null | undefined
  setValue: (newValue: string | number | Date | dayjs.Dayjs | null | undefined) => void
  name: string
  disabled?: boolean,
  isRequired? : boolean,
  error?: boolean,
  helperText?: string
}
export default function SelectDate({ value, setValue, name, disabled, isRequired, error, helperText }: SelectDateProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography sx={{ textAlign: 'left', width: '100%', fontWeight: 'bold', marginBottom: '6px' }}>{name}{isRequired && <span style={{ color: 'red' }}> (*)</span>}</Typography>
      <DatePicker
        sx= {{background:'white'}} 
        value={value}
        format='DD/MM/YYYY'
        onChange={setValue}
        disabled={disabled}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
            helperText: helperText,
            error: error,
          },
        }}
      />
    </LocalizationProvider>
  )
}
