import ListHomeCard from './ListHomeCard/ListHomeCard'
import { Box, Button } from '@mui/material'
import { Modal } from '../../../components/Modal/Modal'
import { useState } from 'react'
import Grid from '@mui/material/Grid'
import { Input } from '../../../components/Input/Input'

const HomeProfiles = () => {
  const [open, setOpen] = useState<boolean>(false)

  const ContentModal = () => {
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Input label='Loại nhà'></Input>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Input label='Số nhà'></Input>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Input label='Tên đường'></Input>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Input label='Quận huyện'></Input>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Input label='Diện tích sàn'></Input>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Input label='Phường/Xã'></Input>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Input label='Tỉnh/Thành phố'></Input>
          </Grid>
        </Grid>
      </Box>
    )
  }

  const ActionsModal = () => {
    return <Button variant='outlined'>Tạo mới</Button>
  }
  return (
    <Box>
      <Button variant='outlined' sx={{ mb: '15px' }} onClick={() => setOpen(true)}>
        Thêm mới +
      </Button>
      <ListHomeCard />
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        Content={<ContentModal></ContentModal>}
        Actions={<ActionsModal></ActionsModal>}
      />
    </Box>
  )
}

export default HomeProfiles
