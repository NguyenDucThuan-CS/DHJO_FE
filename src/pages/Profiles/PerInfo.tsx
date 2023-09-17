import { Button, Container } from '@mui/material'
import AvatarChooser from '../../components/AvatarChooser/AvatarChooser'
import { Input } from '../../components/Input/Input'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import useStyles from './style'
import { getProfileOwner, updateProfileOwner } from '../../apis/ownerprofile.api'

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
  const [idProfile, setIdProfile] = useState<string | null>(null)

  const classes = useStyles()

  const onSubmit = handleSubmit((data) => {
    if (disabled) {
      setDisabled(false)
    } else {
      console.log(data)
      if (idProfile) {
        updateProfileOwner({ id: idProfile, ...data }).then((res) => {
          console.log('ressss', res)
        })
      } else {
        updateProfileOwner({ ...data }).then((res) => {
          console.log('ressss', res)
        })
      }
    }
  })

  useEffect(() => {
    getProfileOwner().then((res) => {
      const { data } = res.data;

      setValue('name', data.name)
      setValue('phoneNum', data.identificationNum)
      setValue('identificationNum', data.phoneNum)
      setIdProfile(data.identificationNum)
    })
  }, [])

  return (
    <Container sx={{ width: { xs: '100%', md: '50%' } }}>
      <AvatarChooser />
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <Input
          label='Họ tên'
          error={errors.name?.message ? true : false}
          helperText={errors.name?.message}
          register={{
            ...register('name', {
              required: {
                value: true,
                message: 'Họ tên không được để trống'
              }
            })
          }}
          disabled={disabled}
        />
        <Input
          error={errors.phoneNum?.message ? true : false}
          helperText={errors.phoneNum?.message}
          label='Số điện thoại'
          register={{
            ...register('phoneNum', {
              required: {
                value: true,
                message: 'Số điện thoại không được để trống'
              }
            })
          }}
          disabled={disabled}
        />
        <Input
          error={errors.identificationNum?.message ? true : false}
          helperText={errors.identificationNum?.message}
          label='CCCD'
          register={{
            ...register('identificationNum', {
              required: {
                value: true,
                message: 'CCCD không được để trống'
              }
            })
          }}
          disabled={disabled}
        />
        <Button type='submit' variant='outlined'>
          Cập nhật
        </Button>
      </form>
    </Container>
  )
}

export default PerInfo
