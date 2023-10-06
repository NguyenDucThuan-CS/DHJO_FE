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
import Step3 from './Step3'
import { useState, useRef } from 'react'
import { Popup } from '../../components/Popup/Popup'
import { useSelector } from 'react-redux'
// import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { createPost } from '../../apis/post.api'

const steps = ['Chọn nhà', 'Chi tiết', 'Chọn người giúp việc']

export default function CreateNews() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [open, setOpen] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const { post } = useSelector((state: RootState) => {
    return state.storeInfoReducer
  })
  // const { house } = useSelector((state: RootState) => {
  //   return state.storeInfoReducer
  // })

  const agree = () => {
    setOpen(false)
  }

  const disagree = () => {
    setOpen(false)
  }

  const close = () => {
    setOpen(false)
  }

  const refStep1 = useRef<any>(null)
  const refStep2 = useRef<any>(null)
  //const refStep3 = useRef(null)

  const handleNext = () => {
    if (activeStep === 0) {
      if (refStep1?.current?.handlePassStep()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      } else {
        setText('Vui long chon nha')
        setOpen(true)
      }
    } else if (activeStep === 1) {
      if (refStep2.current.handlePassStep()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      } else {
        setText('Vui nhap du thong tin')
        setOpen(true)
      }
    } else if (activeStep === 2) {
      return createPost(post)
        .then(() => {
          setText('Cập nhật bài post thành công')
          setOpen(true)
        })
        .catch(() => {
          setText('Đã có lỗi xảy ra vui long thử lại')
          setOpen(true)
        })
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSumit = () => {
    console.log('Đăng bài')
  }

  const renderStep = (activeStep: number) => {
    if (activeStep === 0) return <Step1 ref={refStep1} />
    if (activeStep === 1) return <Step2 ref={refStep2} />
    return <Step3 />
  }

  return (
    <Box sx={{ width: { xs: '100%' } }}>
      <Typography>Tạo tin đăng</Typography>
      <Container sx={{ width: { xs: '100%', md: '80%' } }}>
        <Stepper activeStep={activeStep}>
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
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Button onClick={handleSumit}>Đăng bài</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ paddingTop: '20px' }}>{renderStep(activeStep)}</Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
            </Box>
          </React.Fragment>
        )}
      </Container>

      <Popup open={open} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
    </Box>
  )
}
