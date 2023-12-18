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
import { checkConflictWithActivePost } from '../../apis/post.api'

const Step2 = React.forwardRef(function Step2(props, ref) {
  const [checked, setChecked] = useState<boolean>(false)
  const [endDate, setEndDate] = useState<string | number | Date | dayjs.Dayjs | null | undefined>(null)
  const [startDate, setStartDate] = useState<string | number | Date | dayjs.Dayjs | null | undefined>(null)

  const [skills, setSkills] = useState<{ id: string; skillName: string }[]>([])
  const [eduLevels, setEdulevels] = useState<{ id: string; name: string }[]>([])
  const [period, setPeriod] = useState<{ id: string; name: string }[]>([])
  const [gender, setGender] = useState<{ id: string; name: string }[]>([])
  const [idGender, setIdGender] = useState<string>('')
  const [idPeriod, setIdPeriod] = useState<string>('')
  const [fee, setFee] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const [idChosenSkill, setIdChosenSkill] = useState<{ id: string; value: string }[]>([])
  const [chosenEdu, setChosenEdu] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [startTime, setStartTime] = useState<Dayjs | null>(null)
  const [workTime, setWorkTime] = useState<string>('')

  const dispatch = useDispatch()
  const { post } = useSelector((state: RootState) => state.storeInfoReducer)
  const [titleError, setTitleError] = useState<string>('')
  const [contentError, setContentError] = useState<string>('')
  const [startDateError, setStartDateError] = useState<string>('')
  const [startTimeError, setStartTimeError] = useState<string>('')
  const [workTimeError, setWorkTimeError] = useState<string>('')
  const [periodError, setPeriodError] = useState<string>('')
  const [feeError, setFeeError] = useState<string>('')

  const [endDateError, setendDateError] = useState<string>('')

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
      if (post.preferredEducation) setChosenEdu(post.preferredEducation.id)
      if (post.preferredGender) setIdGender(post.preferredGender.id)
      setTitle(post.title)
      setContent(post.content)
      setStartDate(dayjs(post.startDate, 'YYYY-MM-DD'))
      if (post.recurringPattern !== null) setEndDate(dayjs(post.recurringPattern.endDate, 'YYYY-MM-DD'))

      setStartTime(dayjs(`2022-04-17T${post.startTime.hour}:${post.startTime.minute}`))
      setFee(post.fee.toString())
      if (post.recurringPattern !== null) setChecked(post.recurringPattern.endDate ? true : false)
      if (post.recurringPattern !== null) setIdPeriod(post.recurringPattern.period.id)
      setWorkTime((post.workTime / 3600).toString())
    }
  }, [post])

  useEffect(() => {
    if (startDate && startTime && workTime) {
      checkConflictWithActivePost({
        houseId: post.house.id,
        startTime: {
          hour: startTime?.hour(),
          minute: startTime?.minute(),
          second: 0,
          nano: 0
        },
        startDate: dayjs(startDate).format('YYYY-MM-DD'),
        workTime: workTime,
        recurringPattern: checked
          ? {
              endDate: dayjs(endDate).format('YYYY-MM-DD'),
              period: period.find((item) => item.id === idPeriod)
            }
          : null
      }).then((res) => {
        if(!res.data.data) {
          setStartDateError('Thời gian làm việc đã bị trùng với một tin đăng khác')
        }
        else if(res.data.data) {
          setStartDateError('')
        }
      })
    }
  }, [startDate, startTime, checked, workTime, endDate, period])

  
  useEffect(() => {
    if(checked && endDate && startDate) {
      if(endDate < startDate) {
        setendDateError('Ngày kết thúc trước ngày bắt đầu')
      }
    }
  },[startDate, endDate])
  
  // useEffect(() => {
  //   if(startDate) {
  //     if(startDate < new Date()) {
  //       setStartDateError('Chọn ngày làm việc phù hợp')
  //     }
  //   }
  // }, [startDate])


  const handleChange = () => {
    setChecked(!checked)
  }

  const validate = () => {
    let isValid = true

    if (!title) {
      setTitleError('Vui lòng nhập tiêu đề')
      isValid = false
    }
    if (!content) {
      setContentError('Vui lòng nhập mô tả chi tiết công việc')
      isValid = false
    }

    if (!fee) {
      setFeeError('Vui lòng nhập đơn giá')
      isValid = false
    }
    if (!startDate) {
      setStartDateError('Vui lòng nhập ngày làm việc')
    }
    if(startDate) {
      if(startDate < new Date()) {
        setStartDateError('Chọn ngày làm việc phù hợp')
      }
    }
    if (!workTime) {
      setWorkTimeError('Vui lòng nhập thời gian làm việC')
    }

    if (!startTime) {
      setStartTimeError('Vui lòng nhập thời gian bắt đầu')
    }
    if (checked) {
      if (!idPeriod) setPeriodError('Vui lòng nhập chu kì lặp lại')
      if (!endDate) setendDateError('Vui lòng nhập ngày kết thúc')
    }

    return isValid
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
            workTime: Number(workTime)*3600
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
          options={
            skills.length
              ? skills.map((item) => ({
                  id: item.id,
                  value: item.skillName
                }))
              : []
          }
          setSelectedOptions={setIdChosenSkill}
          defaultValue={idChosenSkill}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Input
          label='Tên công việc'
          error={titleError ? true : false}
          helperText={titleError}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setTitleError('')
          }}
          isRequired={true}
        ></Input>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Input
          label='Tiền lương (vnd)'
          type='number'
          onChange={(e) => {
            setFee(e.target.value)
            setFeeError('')
          }}
          value={fee}
          isRequired={true}
          error={feeError ? true : false}
          helperText={feeError}
        ></Input>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <SelectDropdown list={eduLevels} id={chosenEdu} name={'Trình độ học vấn tối thiểu'} setId={setChosenEdu} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Textarea
          label='Chi tiết công việc'
          error={contentError ? true : false}
          helperText={contentError}
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
            setContentError('')
          }}
          isRequired={true}
        ></Textarea>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SelectDropdown list={gender} id={idGender} name={'Giới tính'} setId={setIdGender} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SelectDate
          value={startDate}
          setValue={(newValue) => {
            setStartDate(newValue)
            setStartDateError('')
          }}
          name={'Ngày làm việc'}
          isRequired={true}
          error={startDateError ? true : false}
          helperText={startDateError}
        ></SelectDate>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
          <Typography sx={{ textAlign: 'left', width: '100%', fontWeight: 'bold', marginBottom: 0 }}>
            Thời gian bắt đầu
            {<span style={{ color: 'red' }}> (*)</span>}
          </Typography>
          <SelectTime
            label='Thời gian bắt đầu'
            value={startTime}
            setValue={(newValue) => {
              setStartTime(newValue)
              setStartTimeError('')
            }}
            isRequired={true}
            error={startTimeError ? true : false}
            helperText={startTimeError}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Input
          isRequired={true}
          label='Thời gian làm việc (h)'
          type='number'
          value={workTime}
          onChange={(e) => {
            if(Number(e.target.value) < 4) setWorkTime(e.target.value)
            setWorkTimeError('')
          }}
          error={workTimeError ? true : false}
          helperText={workTimeError}
        ></Input>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Box>
          <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label='Set tin định kì' />
          {true && (
            <Box sx={{ background: 'rgba(0, 0, 0, 0.08)', padding: '10px' }}>
              <Typography>Tin đăng sẽ được set định kì sau khi hoàn thành</Typography>
              <SelectDropdown
                list={period}
                id={idPeriod}
                name={'Chu kì lặp lại'}
                setId={(newValue) => {
                  setIdPeriod(newValue)
                  setPeriodError('')
                }}
                isRequired={true}
                helperText={periodError}
                error={periodError ? true : false}
                disabled = {checked ? false : true}
              />
              <SelectDate
                value={endDate}
                setValue={(newValue) => {
                  setEndDate(newValue)
                  setendDateError('')
                }}
                name={'Ngày kết thúc'}
                isRequired={true}
                error={endDateError ? true : false}
                helperText={endDateError}
                disabled = {checked ? false : true}
              ></SelectDate>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  )
})

export default Step2
