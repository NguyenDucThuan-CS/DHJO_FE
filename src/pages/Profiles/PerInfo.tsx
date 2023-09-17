import { Button, Container } from '@mui/material'
import AvatarChooser from '../../components/AvatarChooser/AvatarChooser'
import { Input } from '../../components/Input/Input'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import useStyles from './style'
import { getProfileOwner } from '../../apis/ownerprofile.api'
import { updateProfileOwner } from '../../apis/ownerprofile.api'

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
  const classes = useStyles()

  const onSubmit = handleSubmit((data) => {
    if (disabled) {
      setDisabled(false)
    } else {
      console.log(data)
      updateProfileOwner
    }
  })

  useEffect(() => {
    getProfileOwner().then((res) => {
      console.log('resssss', res)
    })
    // setValue('name', 'nguyen van a')
    // setValue('phoneNum', '06363636')
    // setValue('identificationNum', '063636jjeje36')
  }, [])

  return (
    <Container sx={{ width: { xs: '90%', md: '50%' } }}>
      <AvatarChooser />
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <Input label='Họ tên' register={{ ...register('name') }} disabled={disabled} />
        <Input label='Số điện thoại' register={{ ...register('phoneNum') }} disabled={disabled} />
        <Input label='CCCD' register={{ ...register('identificationNum') }} disabled={disabled} />
        <Button type='submit' variant='outlined'>
          Cập nhật
        </Button>
      </form>
    </Container>
  )
}

export default PerInfo
