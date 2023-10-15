import Grid from '@mui/material/Grid'
import InputMultipleOption from '../../components/Input/InputMultipleOption'
import SelectDropdown from '../../components/SelectDropdown/SelectDown'
import { Input } from '../../components/Input/Input'
import Textarea from '../../components/TextArea/TextArea'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import React, { useState, useEffect, useImperativeHandle } from 'react'
import Typography from '@mui/material/Typography/Typography'
import SelectDate from '../../components/SelectDate/SelectDate'
import SelectTime from '../../components/SelectTime/SelectTime'
import dayjs, { Dayjs } from 'dayjs'
import { getAllSkills } from '../../apis/skill.api'
import { getEduLevel } from '../../apis/education.api'
import { getPeriod } from '../../apis/period.api'
import { getGender } from '../../apis/gender.api'
import { useSelector, useDispatch } from 'react-redux'
import { doUpdateInfoStep2 } from '../../redux/slice'
import { RootState } from '../../redux/store'
//const Step1
const Step2 = React.forwardRef(function Step2(props, ref) {
  const [checked, setChecked] = useState<boolean>(false)
  const [endDate, setEndDate] = useState<string | number | Date | dayjs.Dayjs | null | undefined>(dayjs(new Date()))
  const [startDate, setStartDate] = useState<string | number | Date | dayjs.Dayjs | null | undefined>(dayjs(new Date()))

  const [skills, setSkills] = useState<{ id: string; skillName: string }[]>([])
  const [eduLevels, setEdulevels] = useState<{ id: string; name: string }[]>([])
  const [period, setPeriod] = useState<{ id: string; name: string }[]>([])
  const [gender, setGender] = useState<{ id: string; name: string }[]>([])
  const [idGender, setIdGender] = useState<string>('')
  const [idPeriod, setIdPeriod] = useState<string>('')
  const [fee, setFee] = useState<string>('0')
  const [content, setContent] = useState<string>('')

  const [idChosenSkill, setIdChosenSkill] = useState<{ id: string; value: string }[]>([])
  const [chosenEdu, setChosenEdu] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'))
  const [workTime, setWorkTime] = useState<string>('0')

  const dispatch = useDispatch()
  const { post } = useSelector((state: RootState) => state.storeInfoReducer)

  useEffect(() => {
    getAllSkills().then((res) => setSkills(res.data.data))
    getEduLevel().then((res) => setEdulevels(res.data.data))
    getPeriod().then((res) => setPeriod(res.data.data))
    getGender().then((res) => setGender(res.data.data))
  }, [])

  useEffect(() => {
    if (post.title) {
      setIdChosenSkill(
        post.skills.map((item) => ({
          id: item.id,
          value: item.skillName
        }))
      )
      setChosenEdu(post.preferredEducation.id)
      setIdGender(post.preferredGender.id)
      setTitle(post.title)
      setContent(post.content)
      setStartDate(dayjs(post.startDate, 'YYYY-MM-DD'))
      setEndDate(dayjs(post.recurringPattern.endDate, 'YYYY-MM-DD'))

      setStartTime(dayjs(`2022-04-17T${post.startTime.hour}:${post.startTime.minute}`))
      setFee(post.fee.toString())
      setChecked(post.recurringPattern.endDate ? true : false)
      setIdPeriod(post.recurringPattern.period.id)
      setWorkTime(post.workTime.toString())
    }
  }, [post])

  const handleChange = () => {
    setChecked(!checked)
  }

  const validate = () => {
    if (!idChosenSkill.length || !chosenEdu || !idGender || !title || !content || fee == '0' || workTime == '0') {
      return false
    }
    if (checked && !idPeriod) {
      return false
    }
    return true
  }
  useImperativeHandle(ref, () => ({
    handlePassStep() {
      if (validate()) {
        dispatch(
          doUpdateInfoStep2({
            skills: idChosenSkill.map((item) => ({
              id: item.id,
              skillName: item.value
            })),
            preferredEducation: eduLevels.find((item) => item.id === chosenEdu),
            preferredGender: gender.find((item) => item.id === idGender),
            title,
            content,
            startDate: dayjs(startDate).format('YYYY-MM-DD'),
            startTime: {
              hour: startTime?.hour(),
              minute: startTime?.minute(),
              second: 0,
              nano: 0
            },
            fee: +fee,
            recurringPattern: checked
              ? {
                  endDate: dayjs(endDate).format('YYYY-MM-DD'),
                  period: idPeriod
                    ? period.find((item) => item.id === idPeriod)
                    : {
                        id: '',
                        name: ''
                      }
                }
              : null,
            workTime: +workTime
          })
        )
        return true
      } else return false
    }
  }))

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
        <Input label='Tên công việc' value={title} onChange={(e) => setTitle(e.target.value)}></Input>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Input label='Đơn giá (vnd/h)' type='number' onChange={(e) => setFee(e.target.value)} value={fee}></Input>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <SelectDropdown list={eduLevels} id={chosenEdu} name={'Trình độ học vấn tối thiểu'} setId={setChosenEdu} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Textarea label='Chi tiết công việc' value={content} onChange={setContent}></Textarea>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Box>
          <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label='Set tin định kì' />

          {checked && (
            <Box sx={{ background: 'rgba(0, 0, 0, 0.08)', padding: '10px' }}>
              <Typography>Tin đăng sẽ được set định kì sau khi hoàn thành</Typography>
              <SelectDropdown list={period} id={idPeriod} name={'Chu kì lặp lại'} setId={setIdPeriod} />
              <SelectDate value={endDate} setValue={setEndDate} name={'Ngày kết thúc'}></SelectDate>
            </Box>
          )}
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <SelectDropdown list={gender} id={idGender} name={'Giới tính'} setId={setIdGender} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SelectDate value={startDate} setValue={setStartDate} name={'Ngày làm việc'}></SelectDate>
        <Box sx={{ display: 'flex' }}>
          <SelectTime label='Thời gian bắt đầu' value={startTime} setValue={setStartTime} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Input
          label='Thời gian làm việc (h)'
          type='number'
          value={workTime}
          onChange={(e) => setWorkTime(e.target.value)}
        ></Input>
      </Grid>
    </Grid>
  )
})

export default Step2
