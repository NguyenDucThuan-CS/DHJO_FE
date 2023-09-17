import { Container, Button } from '@mui/material'
import { Input } from '../../components/Input/Input'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { rules } from '../../utils/rules'
import { readCookie } from '../../utils/cookie'
import { updateAuthInfo } from '../../apis/auth.api'
import useStyles from './style'
interface FormData {
  username?: string
  oldPassword?: string
  email?: string
  newPassword?: string
  confirmPassword?: string
}

const ChangePassword = () => {
  const classes = useStyles()

  const [disabled, setDisabled] = useState<boolean>(true)

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await updateAuthInfo({
        id: readCookie('userId') || '',
        username: data.username,
        email: data.email,
        password: data.newPassword
      })

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  })
  useEffect(() => {
    //console.log('response', response)
    //fake data get Info user
    setValue('username', 'thuannguyen')
    setValue('email', 'nguyenducthuan@gmail.com')
  }, [])
  return (
    <Container sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', flexDirection: 'column' }}>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <Input
          error={errors.username?.message ? true : false}
          helperText={errors.username?.message}
          label='Tên đăng nhập'
          disabled={disabled}
          register={{
            ...register('username', {
              required: {
                value: true,
                message: 'Tên đăng nhập không được để trống'
              }
            })
          }}
        />
        <Input
          error={errors.email?.message ? true : false}
          helperText={errors.email?.message}
          label='Email'
          disabled={disabled}
          register={{
            ...register('email', rules.email)
          }}
        />

        <Input
          error={errors.oldPassword?.message ? true : false}
          helperText={errors.oldPassword?.message}
          label='Mật khẩu'
          disabled={disabled}
          type='password'
          register={{
            ...register('oldPassword', {
              required: {
                value: true,
                message: 'Mật khẩu không được để trống'
              }
            })
          }}
        />
        <Input
          error={errors.newPassword?.message ? true : false}
          helperText={errors.newPassword?.message}
          label='Mật khẩu mới'
          disabled={disabled}
          type='password'
          register={{
            ...register('newPassword', {
              required: {
                value: true,
                message: 'Mật khẩu mới không được để trống'
              }
            })
          }}
        />
        <Input
          error={errors.confirmPassword?.message ? true : false}
          helperText={errors.confirmPassword?.message}
          label='Nhập lại mật khẩu'
          disabled={disabled}
          type='password'
          register={{
            ...register('confirmPassword', {
              required: {
                value: true,
                message: 'Mật khẩu mới không được để trống'
              },
              validate: (value) => {
                if (value === getValues('newPassword')) {
                  return true
                }
                return 'Nhập lại mật khẩu không chính xác'
              }
            })
          }}
        />

        <Button type='submit' variant='outlined' onClick={() => setDisabled(false)}>
          Cập nhật
        </Button>
      </form>
    </Container>
  )
}

export default ChangePassword
