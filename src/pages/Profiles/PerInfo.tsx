import { Container } from '@mui/material'
import AvatarChooser from '../../components/AvatarChooser/AvatarChooser'
import { Input } from '../../components/Input/Input'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

const PerInfo = () => {
  interface FormData {
    phoneNum?: string
    identificationNum?: string
    name?: string
  }

  const {
    register,
    formState: { errors },
    getValues,
    setValue
  } = useForm<FormData>()

  useEffect(() => {
    setValue('name', 'nguyen van a')
    setValue('phoneNum', '06363636')
    setValue('identificationNum', '063636jjeje36')
  }, [])

  return (
    <Container sx={{ width: { xs: '90%', md: '50%' } }}>
      <AvatarChooser />
      <Input label='Họ tên' register={{ ...register('name') }} />
      <Input label='Số điện thoại' register={{ ...register('phoneNum') }} />
      <Input label='CCCD' register={{ ...register('identificationNum') }} />
    </Container>
  )
}

export default PerInfo
