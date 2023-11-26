import { Button, Container } from '@mui/material'
import AvatarChooser from '../../components/AvatarChooser/AvatarChooser'
import { Input } from '../../components/Input/Input'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import useStyles from './style'
import { getProfileOwner, updateProfileOwner } from '../../apis/ownerprofile.api'
import { Popup } from '../../components/Popup/Popup'
import { rules } from '../../utils/rules'
import { objToFormData } from '../../utils/api'
import { readCookie } from '../../utils/cookie'
import { getImg } from '../../apis/img.api'
import EditIcon from '@mui/icons-material/Edit'
const PerInfo = () => {
  interface FormData {
    phoneNum?: string
    identificationNum?: string
    name?: string
  }

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm<FormData>()
  const [disabled, setDisabled] = useState<boolean>(true)

  const [open, setOpen] = useState(false)
  const [text, setText] = useState<string>('')
  const [img, setImg] = useState<File | null>(null)
  const [imgInit, setImgInit] = useState<string>('')
  const classes = useStyles()

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

  const onSubmit = handleSubmit((data) => {
    Promise.all([
      updateProfileOwner({ ...data }),
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
  })

  useEffect(() => {
    Promise.all([getProfileOwner(), getImg()])
      .then((values) => {
        const { data } = values[0].data
        const { data: dataImg } = values[1].data
        if (values[0].data.data) {
          setValue('name', data.name)
          setValue('phoneNum', data.phoneNum)
          setValue('identificationNum', data.identificationNum)
        }
        if (values[1].data.data && dataImg.imageName) {
          setImgInit(`localhost:8080/images/${dataImg.imageName}`)
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  }, [])

  return (
    <Container sx={{ width: { xs: '100%', md: '50%' } }}>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <span
          style={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={() => {
            setDisabled(false)
          }}
        >
          <EditIcon />
        </span>
        <AvatarChooser setImg={setImg} imgInit={imgInit} disabled={disabled} />
        <Input
          label='Họ tên'
          error={errors.name?.message ? true : false}
          helperText={errors.name?.message}
          disabled={disabled}
          register={{
            ...register('name', {
              required: {
                value: true,
                message: 'Họ tên không được để trống'
              }
            })
          }}
          width = {'60%'}
        />
        <Input
          error={errors.phoneNum?.message ? true : false}
          helperText={errors.phoneNum?.message}
          label='Số điện thoại'
          disabled={disabled}
          register={{
            ...register('phoneNum', rules.phone)
          }}
          width = {'60%'}
        />
        <Input
          error={errors.identificationNum?.message ? true : false}
          helperText={errors.identificationNum?.message}
          label='CCCD'
          disabled={disabled}
          register={{
            ...register('identificationNum', {
              required: {
                value: true,
                message: 'CCCD không được để trống'
              }
            })
          }}
          width = {'60%'}
        />
        {!disabled && (
          <Button type='submit' variant='outlined'>
            Cập nhật
          </Button>
        )}
      </form>

      <Popup open={open} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
    </Container>
  )
}

export default PerInfo
