import Grid from '@mui/material/Grid'
import InputMultipleOption from '../../components/Input/InputMultipleOption'
import SelectDropdown from '../../components/SelectDropdown/SelectDown'
import { Input } from '../../components/Input/Input'
import Textarea from '../../components/TextArea/TextArea'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography/Typography'
import SelectDate from '../../components/SelectDate/SelectDate'
import SelectTime from '../../components/SelectTime/SelectTime'
import dayjs, { Dayjs } from 'dayjs'
import { getAllSkills } from '../../apis/skill.api'
import { getEduLevel } from '../../apis/education.api'
import { getPeriod } from '../../apis/period.api'
import { getGender } from '../../apis/gender.api'

//const Step1
const Step2 = () => {
  const [checked, setChecked] = useState<boolean>(false)
  const [endDate, setEndDate] = useState<string | number | Date | dayjs.Dayjs | null | undefined>(dayjs(new Date()))
  const [workDay, setWorkDay] = useState<string | number | Date | dayjs.Dayjs | null | undefined>(dayjs(new Date()))

  const [skills, setSkills] = useState<{ id: string; skillName: string }[]>([])
  const [eduLevels, setEdulevels] = useState<{ id: string; name: string }[]>([])
  const [period, setPeriod] = useState<{ id: string; name: string }[]>([])
  const [gender, setGender] = useState<{ id: string; name: string }[]>([])

  const [idGender, setIdGender] = useState<string>('')

  const [idPeriod, setIdPeriod] = useState<string>('')

  const [price, setPrice] = useState<string>('')
  const [detail, setDetail] = useState<string>('')

  const [idChosenSkill, setIdChosenSkill] = useState<{ id: string; value: string }[]>([])
  const [chosenEdu, setChosenEdu] = useState<string>('')

  const [name, setName] = useState<string>('')
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'))

  useEffect(() => {
    getAllSkills().then((res) => setSkills(res.data.data))
    getEduLevel().then((res) => setEdulevels(res.data.data))
    getPeriod().then((res) => setPeriod(res.data.data))
    getGender().then((res) => setGender(res.data.data))
  }, [])

  const handleChange = () => {
    setChecked(!checked)
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <InputMultipleOption
          label='Kỹ năng cần thiết'
          options={skills.map((item) => ({
            id: item.id,
            value: item.skillName
          }))}
          setSelectedOptions={setIdChosenSkill}
          defaultValue={idChosenSkill}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Input label='Tên công việc' value={name} onChange={(e) => setName(e.target.value)}></Input>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Input label='Đơn giá (vnd/h)' type='number' onChange={(e) => setPrice(e.target.value)} value={price}></Input>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <SelectDropdown list={eduLevels} id={chosenEdu} name={'Trình độ học vấn tối thiểu'} setId={setChosenEdu} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Textarea label='Chi tiết công việc' value={detail} onChange={setDetail}></Textarea>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Box>
          <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label='Set tin định kì' />
          <Typography>Tin đăng sẽ được set định kì sau khi hoàn thành</Typography>
          <SelectDropdown list={period} id={idPeriod} name={'Chu kì lặp lại'} setId={setIdPeriod} />
          <SelectDate value={endDate} setValue={setEndDate} name={'Ngày kết thúc'}></SelectDate>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <SelectDropdown list={gender} id={idGender} name={'Giới tính'} setId={setIdGender} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SelectDate value={workDay} setValue={setWorkDay} name={'Ngày làm việc'}></SelectDate>
        <Box sx={{ display: 'flex' }}>
          <SelectTime label='Thời gian bắt đầu' value={startTime} setValue={setStartTime} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Input label='Thời gian làm việc (h)' type='number'></Input>
      </Grid>
    </Grid>
  )
}

export default Step2
