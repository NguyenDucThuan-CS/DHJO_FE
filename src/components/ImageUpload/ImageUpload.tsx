import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { defaultAvatar } from '../../assets/img/defaultAvartar'
import './ImageUpload.css'
import { toBase64 } from '../../utils/common'
const UploadImage = ({ handleSetImg, initImg, disabled, handleSetInitImg }: any) => {
  const [files, setFiles] = useState<any>([])
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg']
    },
    onDrop: async (acceptedFiles: any) => {
      handleSetImg(acceptedFiles[0])
      handleSetInitImg(await toBase64(acceptedFiles[0]))
    }
  })

  useEffect(() => {
    if (initImg === '' || initImg === null) {
      setFiles([
        Object.assign(initImg, {
          preview: defaultAvatar
        })
      ])
    } else
      setFiles([
        Object.assign(initImg, {
          preview: initImg
        })
      ])
  }, [initImg])
 console.log('difif', files)
  const thumbs = files.map((file: any, index: number) => (
    <Box className='thumb' key={index}>
      <Box className='thumb-inner'>
        <img src={file.preview} className='img' alt='Ảnh đã chọn' />
      </Box>
    </Box>
  ))

  useEffect(
    () => () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <Box className='upload-file'>
      {files.length > 0 && (
        <>
          <aside className='thumbs-container'>{thumbs}</aside>
        </>
      )}
      {
        <Box {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Button disabled={disabled} variant='outlined' type='button' onClick={open}>
            Chọn hình ảnh
          </Button>
        </Box>
      }
    </Box>
  )
}

export default UploadImage
