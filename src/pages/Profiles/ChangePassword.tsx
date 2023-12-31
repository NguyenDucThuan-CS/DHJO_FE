import { Container, Button } from '@mui/material'
import { Input } from '../../components/Input/Input'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { rules } from '../../utils/rules'
import { readCookie } from '../../utils/cookie'
import { updateAuthInfo, getAuthInfo } from '../../apis/auth.api'
import useStyles from './style'
import { Popup } from '../../components/Popup/Popup'
import EditIcon from '@mui/icons-material/Edit'
import { ModalLoading } from '../../components/Modal/ModalLoading'
import Loading from '../../components/Loading/Loading'
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

  const [open, setOpen] = useState(false)
  const [text, setText] = useState<string>('')
  
  const [loading, setLoading] = useState<boolean>(false)

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
    try {
      const response = await updateAuthInfo({
        id: readCookie('userId') || '',
        username: data.username,
        email: data.email,
        password: data.newPassword
      })

      if (response.status === 200) {
        setOpen(true)
        setText('Cập nhật thông tin thành công')
      }
    } catch (error) {
      console.log(error)
    }
  })
  useEffect(() => {
    setLoading(true);
    getAuthInfo().then((res) => {
      setLoading(false);
      setValue('username', res.data.data.username)
      setValue('email', res.data.data.email)
      setValue('oldPassword','123456')
    })
  }, [])
  return (
    <Container sx={{ width: { xs: '100%', md: '50%' } }}>
      {!loading?<form className={classes.form} noValidate onSubmit={onSubmit} >
      <span
          style={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={() => {
            setDisabled(false)
          }}
        >
          <EditIcon />
        </span>
        <Input
            width = {'60%'}
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
          width = {'60%'}
          error={errors.email?.message ? true : false}
          helperText={errors.email?.message}
          label='Email'
          disabled={disabled}
          register={{
            ...register('email', rules.email)
          }}
        />

        {disabled && (
          <Input
          width = {'60%'}
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
        )}
        {!disabled && (
          <>
            <Input
              width = {'60%'}
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
              width = {'60%'}
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

            <Button type='submit' variant='outlined'>
              Cập nhật
            </Button>
          </>
        )}
        <ModalLoading isLoading = {loading}></ModalLoading>
      </form>:<Loading />}

      <Popup open={open} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
      
    </Container>
  )
}

export default ChangePassword
