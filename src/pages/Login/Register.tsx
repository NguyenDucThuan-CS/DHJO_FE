import * as React from 'react'

import { Button, Link, Grid, Stack, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import { rules } from '../../utils/rules'
import { useState } from 'react'

import { register as registerUser } from '../../apis/auth.api'

import { Popup } from '../../components/Popup/Popup'
import { Input } from '../../components/Input/Input'
import { useNavigate } from 'react-router-dom'
import { Wrapper } from './Wrapper'
import useStyles from './style'
interface FormData {
  email: string
  password: string
  confirm_password: string
  username: string
}

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
  const [text, setText] = useState<string>('')

  //const navigate = useNavigate()

  const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole((event.target as HTMLInputElement).value)
  }

  const onSubmit = handleSubmit(async (data) => {
    const { confirm_password, ...res } = data
    try {
      const response = await registerUser(res, role)
      if (response.status === 200) {
        setOpen(true)
        setText('Bạn đã đăng kí thành công.')
      }
    } catch (error: any) {
      setOpen(true)
      setText(error.response.data.detail)
    }
  })

  const agree = () => {
    setOpen(false)
    //navigate('/login')
  }

  const disagree = () => {
    setOpen(false)
  }

  const close = () => {
    setOpen(false)
  }

  return (
    <>
      <Wrapper title='Đăng ký'>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Input
            error={errors.email?.message ? true : false}
            helperText={errors.email?.message}
            label='Email'
            register={{ ...register('email', rules.email) }}
          ></Input>
          <Input
            error={errors.username?.message ? true : false}
            helperText={errors.username?.message}
            label='Username'
            register={{
              ...register('username', {
                required: {
                  value: true,
                  message: 'Username không được để trống'
                }
              })
            }}
          ></Input>
          <Input
            error={errors.password?.message ? true : false}
            helperText={errors.password?.message}
            label='Password'
            register={{
              ...register('password', {
                required: {
                  value: true,
                  message: 'Password không được để trống'
                }
              })
            }}
          ></Input>

          <Input
            error={errors.confirm_password?.message ? true : false}
            helperText={errors.confirm_password?.message}
            label='Confirm password'
            register={{
              ...register('confirm_password', {
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
              })
            }}
          ></Input>
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
        <Popup open={open} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
      </Wrapper>
    </>
  )
}
