import { Button, Container } from '@mui/material'
import AvatarChooser from '../../components/AvatarChooser/AvatarChooser'
import { Input } from '../../components/Input/Input'
import { useEffect, useState } from 'react'

import { Popup } from '../../components/Popup/Popup'
import { objToFormData } from '../../utils/api'
import { readCookie } from '../../utils/cookie'
import { getImg } from '../../apis/img.api'
import SelectDropdown from '../../components/SelectDropdown/SelectDown'
import Grid from '@mui/material/Grid'
import { getAllSkills } from '../../apis/skill.api'
import { getEduLevel } from '../../apis/education.api'
import { getGender } from '../../apis/gender.api'
import InputMultipleOption from '../../components/Input/InputMultipleOption'
import SelectDate from '../../components/SelectDate/SelectDate'
import dayjs from 'dayjs'
import { updateProfileHelper, getProfileHelper } from '../../apis/helperprofile.api'

const PerInfo = () => {
  const [disabled, setDisabled] = useState<boolean>(true)

  const [open, setOpen] = useState(false)
  const [text, setText] = useState<string>('')
  const [img, setImg] = useState<File | null>(null)
  const [imgInit, setImgInit] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [idNum, setIdNumber] = useState<string>('')

  const [eduLevels, setEdulevels] = useState<{ id: string; name: string }[]>([])
  const [chosenEdu, setChosenEdu] = useState<string>('')
  const [skills, setSkills] = useState<{ id: string; skillName: string }[]>([])
  const [idChosenSkill, setIdChosenSkill] = useState<{ id: string; value: string }[]>([])
  const [gender, setGender] = useState<{ id: string; name: string }[]>([])
  const [idGender, setIdGender] = useState<string>('')
  const [doB, setDoB] = useState<string | number | Date | dayjs.Dayjs | null | undefined>(dayjs(new Date()))

  const agree = () => {
    setOpen(false)
    setDisabled(true)
  }

  const disagree = () => {
    setOpen(false)
    setDisabled(true)
  }

  const close = () => {
    setOpen(false)
    setDisabled(true)
  }
  const changeArrToDayjs = (arr: string[]) => {
    return arr.toString().replace(',', '-')
  }
  const onSubmit = () => {
    Promise.all([
      updateProfileHelper({
        name: name,
        phoneNum: phone,
        identificationNum: idNum,
        gender: gender.find((item) => item.id === idGender),
        education: eduLevels.find((item) => item.id === chosenEdu),
        birthday: dayjs(doB).format('YYYY-MM-DD'),
        intro: 'mo ta',
        skills: idChosenSkill.map((item) => ({
          id: item.id,
          skillName: item.value
        }))
      }),

      new Promise((resolve) => {
        if (img) {
          resolve(
            fetch('http://localhost:8080/api/image', {
              method: 'POST',
              body: objToFormData({
                profileImage: img
              }),
              headers: {
                Authorization: `Bearer ${readCookie('tokenDHJO')}`
              }
            })
          )
        } else {
          resolve(true)
        }
      })
    ]).then(() => {
      setOpen(true)
      setText('Cập nhật thông tin thành công')
    })
  }

  useEffect(() => {
    Promise.all([getProfileHelper(), getImg()])
      .then((values) => {
        const { data: dataImg } = values[1].data
        if (values[0].data.data) {
          setName(values[0].data.data.name)
          setPhone(values[0].data.data.phoneNum)
          setIdNumber(values[0].data.data.identificationNum)
          setChosenEdu(values[0].data.data.education.id)
          setIdGender(values[0].data.data.gender.id)
          setIdChosenSkill(
            values[0].data.data.skills.map((item:any) => ({
              id: item.id,
              value: item.skillName
            }))
          )
          setDoB(dayjs(changeArrToDayjs(values[0].data.data.birthday)))
        }
        if (values[1].data.data && dataImg.imageName) {
          setImgInit(`localhost:8080/images/${dataImg.imageName}`)
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  }, [])

  useEffect(() => {
    getAllSkills().then((res) => setSkills(res.data.data))
    getEduLevel().then((res) => setEdulevels(res.data.data))
    getGender().then((res) => setGender(res.data.data))
  }, [])

  return (
    <Container sx={{ width: { xs: '100%', md: '60%' } }}>
      <Button variant='outlined' onClick={() => setDisabled(false)}>
        Chinh sua
      </Button>
      <AvatarChooser setImg={setImg} imgInit={imgInit} disabled={disabled} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Input label='Họ tên' value={name} onChange={(e) => setName(e.target.value)} disabled={disabled} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Input label='Số điện thoại' value={phone} onChange={(e) => setPhone(e.target.value)} disabled={disabled} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Input label='CCCD' value={idNum} onChange={(e) => setIdNumber(e.target.value)} disabled={disabled} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <SelectDropdown
            list={eduLevels}
            id={chosenEdu}
            name={'Trình độ học vấn tối thiểu'}
            setId={setChosenEdu}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <InputMultipleOption
            label='Kỹ năng cần thiết'
            options={skills.map((item) => ({
              id: item.id,
              value: item.skillName
            }))}
            setSelectedOptions={setIdChosenSkill}
            defaultValue={idChosenSkill}
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <SelectDropdown list={gender} id={idGender} name={'Giới tính'} setId={setIdGender} disabled={disabled} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectDate value={doB} setValue={setDoB} name={'Ngày sinh'} disabled={disabled}></SelectDate>
        </Grid>
      </Grid>
      {!disabled && (
        <Button type='submit' variant='outlined' onClick={onSubmit} sx={{ margin: 'auto' }}>
          Cập nhật
        </Button>
      )}

      <Popup open={open} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
    </Container>
  )
}

export default PerInfo
