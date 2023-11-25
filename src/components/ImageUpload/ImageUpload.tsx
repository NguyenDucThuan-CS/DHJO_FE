import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import './ImageUpload.css';

const UploadImage = ({ handleSetImg, initImg, disabled }: any) => {
  const [files, setFiles] = useState<any>([]);
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    onDrop: (acceptedFiles:any) => {
      handleSetImg(acceptedFiles[0])
      setFiles([
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        }),
      ]);
    },
  });

  useEffect(() => {
    if (initImg === "" || initImg === null) {
      setFiles([]);
    } else setFiles([
      Object.assign(initImg, {
        preview: initImg,
      }),
    ]);
  }, [initImg]);

  const thumbs = files.map((file: any, index: number) => (
    <Box className="thumb" key={index}>
      <Box className="thumb-inner">
        <img src={file.preview} className="img" alt="Ảnh đã chọn" />
      </Box>
    </Box>
  ));

  useEffect(
    () => () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <Box className='upload-file'>
      {!disabled && (
        <Box {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <Typography>
            Kéo và thả hình ảnh hoặc bấm vào đây để tải lên
          </Typography>
          <Button variant="outlined" type="button" onClick={open}>
            Chọn hình ảnh
          </Button>
        </Box>
      )}
      {files.length > 0 && (
        <>
          <Typography>
            Hình ảnh
          </Typography>
          <aside className="thumbs-container">{thumbs}</aside>
        </>
      )}
    </Box>
  );
};

export default UploadImage;
