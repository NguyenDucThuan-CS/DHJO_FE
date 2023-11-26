import * as React from 'react'
import { Dayjs } from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import Typography from '@mui/material/Typography'
interface SelectimeProps {
  label: string
  value: Dayjs | null
  setValue: (value: Dayjs | null) => void
  isRequired?: boolean
}
export default function SelectTime({ label, value, setValue, isRequired }: SelectimeProps) {
  //const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'))

  return (
    <>
     
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker', 'TimePicker']}>
          <TimePicker
            slotProps={{ textField: { size: 'small' } }}
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  )
}
