import { Button, Container } from '@mui/material'
import { Input } from '../../components/Input/Input'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import useStyles from './style'
import { getProfileOwner, updateProfileOwner } from '../../apis/ownerprofile.api'
import { Popup } from '../../components/Popup/Popup'
import { rules } from '../../utils/rules'
import { getImg } from '../../apis/img.api'
import EditIcon from '@mui/icons-material/Edit'
import UploadImage from '../../components/ImageUpload/ImageUpload'
import { updateImgUser } from '../../apis/img.api'
import { toBase64 } from '../../utils/common'

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

  const onSubmit = handleSubmit(async (data) => {
    //updateProfileOwner({...data})
    Promise.all([
      updateProfileOwner({ ...data }),
      updateImgUser({id:null, base64String: await toBase64(img)})
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
        if (values[1].data.data && dataImg.base64String) {
          setInitImg(`data:image;base64,${dataImg.base64String}`)
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  }, [])
  const [initiImg, setInitImg] = useState('')

  const handleSetImg = (img: any) => {
    setImg(img)
  }

  const handleSetInitImg = (img: any) => {
    setInitImg(img)
  }

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
        <UploadImage handleSetImg={handleSetImg} initImg={initiImg} disabled = {disabled} handleSetInitImg = {handleSetInitImg} />
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
