import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const DetailHelper = () => {
  return (
    <Container maxWidth='md'>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box
            component='img'
            sx={{
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 }
            }}
            alt='The house from the offer.'
            src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
          />
        </Grid>
        <Grid item xs={8}>
          <Stack
            height={'163px'}
            direction={'column'}
            justifyContent={'flex-end'}
            sx={{
              color: 'white',
              background:
                'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 52.31%, rgba(0, 0, 0, 0.8) 100%)'
            }}
          >
            Nguyễn Mai Hương
          </Stack>
          <Stack spacing={2} direction={'row'}>
            <Button variant='text'>Text</Button>
            <Button variant='contained'>Contained</Button>
          </Stack>
          <></>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DetailHelper
