import Box from '@mui/material/Box'
// import { styled } from '@mui/material/styles'
// import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
//import SelectDropdown from '../../components/SelectDropdown/SelectDown'
import CardPost from '../../components/CardPost/CardPost'
import Grid from '@mui/material/Grid'
import DetailPost from './DetailPost'

const Helper = () => {
  return (
    <Box>
      <Stack direction='row' spacing={2}>
        {/* <SelectDropdown list={[]}></SelectDropdown>
          <SelectDropdown list={[]}></SelectDropdown>

          <SelectDropdown list={[]}></SelectDropdown> */}
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={2} textAlign={'center'}></Grid>
        <Grid item xs={4}>
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
        </Grid>
        <Grid item xs={6}>
          <DetailPost />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Helper
