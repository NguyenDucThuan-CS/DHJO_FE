import { Stack, Box, Grid } from '@mui/material'

const Schedule = () => {
  const time = [
    '1am',
    '2am',
    '3am',
    '4am',
    '5am',
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12am',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm',
    '8pm',
    '9pm',
    '10pm',
    '11pm',
    '12pm'
  ]

  return (
    <Stack direction={{ xs: 'column'}} sx={{ border: '0.5px solid #DAE4EC' }}>
      <Box textAlign={'center'}>
        <p>Tháng 3, 0223</p>
        <p>CN</p>
        <Box
          sx={{
            width: '50px',
            height: '50px',
            background: 'yellow',
            borderRadius: '50%',
            margin: 'auto',
            lineHeight: '50px',
            fontWeight: 'bold'
          }}
        >
          1
        </Box>
      </Box>

      <Stack direction={'column'} sx={{ marginTop: '12px' }}>
        {time.map((item) => (
          <Grid key={item} container fontSize={'14px'} textAlign={'center'}>
            <Grid item md={3} border={'0.5px solid #DAE4EC'} color={'#102D42'}>
              {item}
            </Grid>
            <Grid item md={9} border={'0.5px solid #DAE4EC'} color={'#102D42'}>
              s
            </Grid>
          </Grid>
        ))}
      </Stack>
    </Stack>
  )
}

export default Schedule
