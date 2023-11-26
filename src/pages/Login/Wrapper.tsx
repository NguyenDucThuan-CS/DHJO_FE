import { LockOutlined } from '@mui/icons-material'
import { Avatar, CssBaseline, Grid, Paper, Typography } from '@mui/material'
import useStyles from './style'
import { ReactNode } from 'react'

interface WrapperProps {
  children: ReactNode
  title: string
}

export const Wrapper = ({ children, title }: WrapperProps) => {
  const classes = useStyles()
  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid className={classes.paper} item xs={10} sm={8} md={4} component={Paper} elevation={1} square>
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            {title}
          </Typography>
          {children}
        </div>
      </Grid>
    </Grid>
  )
}
