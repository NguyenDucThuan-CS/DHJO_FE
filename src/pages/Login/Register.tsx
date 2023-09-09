import * as React from 'react'

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Grid,
  Typography,
  Stack,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel
} from '@mui/material'
import { LockOutlined } from '@mui/icons-material'

import { makeStyles } from '@mui/styles'
import { useForm } from 'react-hook-form'
import { rules } from '../../utils/rules'
import { useState } from 'react'

import { register as registerUser } from '../../apis/auth.api'

import { Popup } from '../../components/Popup/Popup'
interface FormData {
  email: string
  password: string
  confirm_password: string
  username: string
}

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  size: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px'
  },
  avatar: {},
  form: {
    width: '100%' // Fix IE 11 issue.
  },
  field: {
    padding: '14px'
  },
  submit: {
    width: 'fit-content',
    margin: 'auto'
  }
}))

export default function Register() {
  const classes = useStyles()
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<FormData>()

  const [role, setRole] = useState<string>('owner')
  const [open, setOpen] = useState<boolean>(false)

  const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole((event.target as HTMLInputElement).value)
  }

  const onSubmit = handleSubmit(async (data) => {
    const { confirm_password, ...res } = data
    const response = await registerUser(res, role)
    if (response.status === 200) {
      setOpen(true)
    }
  })
  const agree = () => {
    setOpen(false)
  }

  const disagree = () => {
    setOpen(false)
  }

  const close = () => {
    setOpen(false)
  }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid className={classes.paper} item xs={10} sm={8} md={4} component={Paper} elevation={1} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Đăng ký
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
              error={errors.email?.message ? true : false}
              helperText={errors.email?.message}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              size='small'
              {...register('email', rules.email)}
            />
            <TextField
              error={errors.username?.message ? true : false}
              helperText={errors.username?.message}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              size='small'
              {...register('username', {
                required: {
                  value: true,
                  message: 'Username không được để trống'
                }
              })}
            />
            <TextField
              className={classes.field}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              error={errors.password?.message ? true : false}
              helperText={errors.password?.message}
              size='small'
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password không được để trống'
                }
              })}
            />
            <TextField
              className={classes.field}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Confirm password'
              type='password'
              id='confirm_password'
              autoComplete='current-password'
              error={errors.confirm_password?.message ? true : false}
              helperText={errors.confirm_password?.message}
              size='small'
              {...register('confirm_password', {
                required: {
                  value: true,
                  message: 'Confirm password không được để trống'
                },
                validate: (value) => {
                  if (value === getValues('password')) {
                    return true
                  }
                  return 'Nhập lại email không chính xác'
                }
              })}
            />

            <FormControl>
              <FormLabel id='demo-controlled-radio-buttons-group'>Vai trò</FormLabel>
              <RadioGroup
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='controlled-radio-buttons-group'
                value={role}
                onChange={handleChangeRole}
              >
                <FormControlLabel value='owner' control={<Radio />} label='Chủ nhà' />
                <FormControlLabel value='helper' control={<Radio />} label='Người giúp việc' />
              </RadioGroup>
            </FormControl>

            <Stack direction='row' justifyContent='center' alignItems='center' mb={1} mt={1}>
              <Button type='submit' variant='contained' color='primary' className={classes.submit}>
                Đăng ký
              </Button>
            </Stack>

            <Grid container>
              <Grid item>
                <Link href='/login' variant='body2'>
                  {'Bạn đã có tài khoản? Đăng nhập'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>

      <Popup open={open} handleAgree={agree} handleDisAgree={disagree} handleClose={close} />
    </Grid>
  )
}
