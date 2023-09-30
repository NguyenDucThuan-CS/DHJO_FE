import Grid from '@mui/material/Grid'
import InputMultipleOption from '../../components/Input/InputMultipleOption'
import SelectDropdown from '../../components/SelectDropdown/SelectDown'
import { Input } from '../../components/Input/Input'
import Textarea from '../../components/TextArea/TextArea'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { useState } from 'react'
import Typography from '@mui/material/Typography/Typography'
import SelectDate from '../../components/SelectDate/SelectDate'
import SelectTime from '../../components/SelectTime/SelectTime'
import dayjs from 'dayjs'

const Step2 = () => {
  const [checked, setChecked] = useState<boolean>(false)
  const [endDate, setEndDate] = useState<string | number | Date | dayjs.Dayjs | null | undefined>(dayjs(new Date()))

  const handleChange = () => {
    setChecked(!checked)
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <InputMultipleOption label='Kỹ năng cần thiết ' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Input label='Tên công việc'></Input>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Input label='Đơn giá (vnd/h)' type='number'></Input>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <SelectDropdown
          list={[]}
          id={'0'}
          name={'Trình độ học vấn tối thiểu'}
          setId={() => {
            console.log('')
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Textarea label='Chi tiết công việc'></Textarea>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Box>
          <FormControlLabel
            control={<Switch defaultChecked checked={checked} onChange={handleChange} />}
            label='Set tin định kì'
          />
          <Typography>Tin đăng sẽ được set định kì sau khi hoàn thành</Typography>
          <SelectDropdown
            list={[]}
            id={'0'}
            name={'Chu kì lặp lại'}
            setId={() => {
              console.log('')
            }}
          />
          <SelectDate value={endDate} setValue={setEndDate} name={'Ngày kết thúc'}></SelectDate>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <SelectDropdown
          list={[]}
          id={'0'}
          name={'Giới tính'}
          setId={() => {
            console.log('')
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SelectDate value={endDate} setValue={setEndDate} name={'Ngày làm việc'}></SelectDate>
        <Box sx={{ display: 'flex' }}>
          <SelectTime label='Thời gian bắt đầu' />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Input label='Thời gian làm việc (h)' type='number'></Input>
      </Grid>
    </Grid>
  )
}

export default Step2
