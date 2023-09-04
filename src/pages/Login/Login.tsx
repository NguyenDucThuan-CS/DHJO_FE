import { MouseEvent } from 'react'

import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, Stack } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'

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
  submit: {
    width: 'fit-content',
    margin: 'auto'
  }
}))

export default function Login() {
  const classes = useStyles()

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid className={classes.paper} item xs={12} sm={8} md={5} component={Paper} elevation={1} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Đăng nhập
          </Typography>
          <form className={classes.form} noValidate action='/'>
            <TextField
              onChange={() => {}}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
            />
            <TextField
              onChange={() => {}}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Stack direction='row' justifyContent='center' alignItems='center' mb={1} mt={1}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault()
                }}
              >
                Đăng nhập
              </Button>
            </Stack>

            <Grid container>
              <Grid item>
                <Link href='#' variant='body2'>
                  {'Bạn chưa có tài khoản? Đăng ký'}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
