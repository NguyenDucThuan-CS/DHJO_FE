import { Button, Link, Box, Grid, Typography, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Input } from '../../components/Input/Input'
import { login } from '../../apis/auth.api'
import { Popup } from '../../components/Popup/Popup'
import { useState, useRef } from 'react'
import useStyles from './style'
import { Wrapper } from './Wrapper'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '../../utils/cookie'
import { useDispatch } from 'react-redux'
import { doStoreToken } from '../../redux/slice/currentUser'
interface FormData {
  password: string
  username: string
}

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href=''>
        DHJO
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Login() {
  const classes = useStyles()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const [open, setOpen] = useState(false)
  const [text, setText] = useState<string>('')
  const success = useRef<boolean>(false)
  const role = useRef<string>('')

  const agree = () => {
    setOpen(false)
    if (success.current && role.current === 'ROLE_HELPER') return window.location.replace('/helper')
    if (success.current && role.current === 'ROLE_OWNER') return window.location.replace('/owner')
  }

  const disagree = () => {
    setOpen(false)
  }

  const close = () => {
    setOpen(false)
  }
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await login(data)
      if (response.status === 200) {
        dispatch(doStoreToken(response.data.data.accessToken))
        setCookie(365, response.data.data.accessToken, 'tokenDHJO')
        setCookie(365, response.data.data.userId, 'userId')
        setCookie(365, response.data.data.roles[0], 'roles')
        setOpen(true)
        setText('Bạn đã đăng nhập thành công')
        success.current = true
        role.current = response.data.data.roles[0]
      }
    } catch (error) {
      setOpen(true)
      setText('Mật khẩu hoặc username chưa đúng')
      success.current = false
    }
  })

  return (
    <Wrapper title='Đăng nhập'>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <Input
          error={errors.username?.message ? true : false}
          helperText={errors.username?.message}
          label='Username'
          register={{
            ...register('username', {
              required: {
                value: true,
                message: 'Email hoặc username không được để trống'
              }
            })
          }}
        />
        <Input
          error={errors.password?.message ? true : false}
          helperText={errors.password?.message}
          label='Password'
          type='password'
          register={{
            ...register('password', {
              required: {
                value: true,
                message: 'Password không được để trống'
              }
            })
          }}
        />
        <Stack direction='row' justifyContent='center' alignItems='center' mb={1} mt={1}>
          <Button type='submit' variant='contained' color='primary' className={classes.submit}>
            Đăng nhập
          </Button>
        </Stack>

        <Grid container>
          <Grid item>
            <Link href='/register' variant='body2'>
              {'Bạn chưa có tài khoản? Đăng ký'}
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
      <Popup open={open} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
    </Wrapper>
  )
}
