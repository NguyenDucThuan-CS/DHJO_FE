import { Button, Container } from '@mui/material'
import { Input } from '../../components/Input/Input'
import { useEffect, useState } from 'react'
import { Popup } from '../../components/Popup/Popup'
import { getImg, updateImgUser } from '../../apis/img.api'
import SelectDropdown from '../../components/SelectDropdown/SelectDown'
import Grid from '@mui/material/Grid'
import { getAllSkills } from '../../apis/skill.api'
import { getEduLevel } from '../../apis/education.api'
import { getGender } from '../../apis/gender.api'
import InputMultipleOption from '../../components/Input/InputMultipleOption'
import SelectDate from '../../components/SelectDate/SelectDate'
import dayjs from 'dayjs'
import { updateProfileHelper, getProfileHelper } from '../../apis/helperprofile.api'
import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'
import UploadImage from '../../components/ImageUpload/ImageUpload'
import { toBase64 } from '../../utils/common'
import { toast } from 'react-toastify'
import { ModalLoading } from '../../components/Modal/ModalLoading'

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
  const [doB, setDoB] = useState<string | number | Date | dayjs.Dayjs | null | undefined>(null)
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  
  const [nameErr, setNameErr] = useState('')
  const [phoneErr, setPhoneErr] = useState('')
  const [cccdErr, setCCCDErr] = useState('')
  const [eduErr, setEduErr] = useState('')
  const [genderErr, setGenderErr] = useState('')
  const [dobErr, setDobErr] = useState('')
  const [initiImg, setInitImg] = useState('')

  const handleSetImg = (img: any) => {
    setImg(img)
  }

  const handleSetInitImg = (img: any) => {
    setInitImg(img)
  }
   

  const validate = () => {
    let isValid = true;
    if(!name) {
      isValid = false;
      setNameErr('Vui lòng nhập họ tên')
    }

    if(!phone) {
      isValid = false;
      setPhoneErr('Vui lòng nhập số điện thoại')
    }

    if(!chosenEdu) {
      isValid = false;
      setEduErr('Vui lòng nhập trình độ học vấn')
    }
    if(!idNum) {
      isValid = false;
      setCCCDErr('Vui lòng nhập trình độ học vấn')
    }
    if(!idGender) {
      isValid = false;
      setGenderErr('Vui lòng chọn giới tính')
    }

    if(!doB) {
      isValid = false;
      setDobErr('Vui lòng chọn ngày sinh')
    }
    return isValid
  }
  const onSubmit = async () => {
    if(validate()) {
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
  
        
      ]).then(() => {
        toast.success('Cập nhật thông tin thành công')
        setDisabled(true)
      })
    }

    if(img) updateImgUser({id:null, base64String: await toBase64(img)})
   
  }

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getProfileHelper(), getImg()])
      .then((values) => {
        setIsLoading(false);
        const { data: dataImg } = values[1].data
        if (values[0].data.data) {
          setName(values[0].data.data.name)
          setPhone(values[0].data.data.phoneNum)
          setIdNumber(values[0].data.data.identificationNum)
          setChosenEdu(values[0].data.data.education.id)
          setIdGender(values[0].data.data.gender.id)
          setIdChosenSkill(
            values[0].data.data.skills.map((item: any) => ({
              id: item.id,
              value: item.skillName
            }))
          )
          setDoB(dayjs(`${values[0].data.data.birthday.year}-${values[0].data.data.birthday.month}-${values[0].data.data.birthday.day}`))
        }
        if (values[1].data.data && dataImg.base64String) {
          setInitImg(`data:image;base64,${dataImg.base64String}`)
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
    <Container sx={{ width: '820px' }}>
      <Box sx = {{background:'white', position:'relative', padding:'20px', display:'flex', flexDirection: 'column'}}>
        <span
          style={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={() => {
            setDisabled(false)
          }}
        >
          <EditIcon />
        </span>
        <UploadImage handleSetImg={handleSetImg} initImg={initiImg} disabled = {disabled} handleSetInitImg = {handleSetInitImg} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Input label='Họ tên' error = {nameErr ? true : false} helperText = {nameErr} value={name} onChange={(e) => {
              setNameErr('')
              setName(e.target.value)
            }} disabled={disabled} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Input label='Số điện thoại'  error = {phoneErr ? true : false} helperText = {phoneErr} value={phone} onChange={(e) => {
              setPhone(e.target.value)
              setPhoneErr('')
            }} disabled={disabled} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Input label='CCCD'  error = {cccdErr ? true : false} helperText = {phoneErr} value={idNum} onChange={(e) => {
              setIdNumber(e.target.value)
              setCCCDErr('')
              }} disabled={disabled} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <SelectDropdown
              list={eduLevels}
              id={chosenEdu}
              name={'Trình độ học vấn'}
              setId={(newValue) => {
               setChosenEdu(newValue)
               setEduErr('')
              }}
              disabled={disabled}
              error  = {eduErr ? true : false}
              helperText= {eduErr}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <InputMultipleOption
              label='Kỹ năng'
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
            <SelectDropdown error = {genderErr ? true: false} helperText = {genderErr} list={gender} id={idGender} name={'Giới tính'} setId={(newValue) => {
              setIdGender(newValue)
              setGenderErr('')
              }} disabled={disabled} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectDate error = {dobErr? true:false} helperText={dobErr} value={doB} setValue={(newValue) => {
              setDoB(newValue)
              setDobErr('')
              }} name={'Ngày sinh'} disabled={disabled}></SelectDate>
          </Grid>
        </Grid>
        {!disabled && (
          <Button type='submit' variant='outlined' onClick={onSubmit} sx={{ margin: 'auto', marginTop: '10px' }}>
            Cập nhật
          </Button>
        )}
      </Box>

      <Popup open={open} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
      <ModalLoading isLoading = {isLoading}></ModalLoading>
    </Container>
  )
}

export default PerInfo
