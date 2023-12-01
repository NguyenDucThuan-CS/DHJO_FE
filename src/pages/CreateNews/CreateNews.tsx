import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'
import Step1 from './Step1'
import Step2 from './Step2'
import { useState, useRef } from 'react'
import { Popup } from '../../components/Popup/Popup'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { createPost } from '../../apis/post.api'
import { useNavigate } from 'react-router-dom'
import { doClearInfo } from '../../redux/slice'
import { toast } from 'react-toastify'
import PreviewPost from '../Helpers/Preview'
import { Grid } from '@mui/material'

const steps = ['Chọn nhà', 'Chi tiết', 'Xem trước']

export default function CreateNews() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [open, setOpen] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const { post } = useSelector((state: RootState) => {
    return state.storeInfoReducer
  })
  console.log('post nhaaaaa', post)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const agree = () => {
    setOpen(false)
    navigate('/owner/my-news')
  }

  const disagree = () => {
    setOpen(false)
  }

  const close = () => {
    setOpen(false)
  }

  const refStep1 = useRef<any>(null)
  const refStep2 = useRef<any>(null)
 
  const handleNext = () => {
    if (activeStep === 0) {
      if (refStep1?.current?.handlePassStep()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      } else {
        toast.error('Vui lòng chọn căn nhà')
      }
    } else if (activeStep === 1) {
      if (refStep2.current.handlePassStep()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      } /* else {
        toast.error('Vui lòng nhập đầy đủ thông tin')
      } */
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSumit = () => {
    return createPost(post)
      .then(() => {
        navigate('/owner/my-news')
        dispatch(doClearInfo({}))
        toast.success('Tạo bài post thành công')
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }

  const renderStep = (activeStep: number) => {
    if (activeStep === 0) return <Step1 ref={refStep1} />
    if (activeStep === 1) return <Step2 ref={refStep2} />
  }
 
  return (
    <Box sx={{ width: { xs: '100%' } }}>
      <Container sx={{ width: { xs: '100%', md: '80%' } }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {}
            const labelProps: {
              optional?: React.ReactNode
            } = {}
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === 2 ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Đã hoàn thành các bước</Typography>

            <PreviewPost post = {post}/>
             

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button color='inherit'  onClick={handleBack} sx={{ mr: 1 }}>
                Quay lại
              </Button>
              <Button onClick={handleSumit}>Đăng bài</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ paddingTop: '20px' }}>{renderStep(activeStep)}</Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Quay lại
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Kết thúc' : 'Tiếp tục'}</Button>
            </Box>
          </React.Fragment>
        )}
      </Container>

      <Popup open={open} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
    </Box>
  )
}
