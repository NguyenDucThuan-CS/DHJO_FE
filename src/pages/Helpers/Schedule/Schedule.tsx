import { Stack, Box } from '@mui/material'

const Schedule = () => {
  const daysInWeek = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
  return (
    <Stack direction={{ xs: 'column' }} sx={{ border: '0.5px solid #DAE4EC' }}>
      <Box textAlign={'center'}>
        <p>
          Tháng {new Date().getMonth() + 1}, {new Date().getFullYear()}
        </p>
        <p>{daysInWeek[new Date().getDay()]}</p>
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
          {new Date().getDate()}
        </Box>
      </Box>

      <Stack direction={'column'} sx={{ marginTop: '12px' }}>
        {/* <table>
          <tr>
            <td>1</td>
            <td>2</td>
          </tr>
          <tr>
            <td>2</td>
            <td>1</td>
          </tr>
        </table> */}
        {/* {time.map((item) => (
          <Grid key={item} container fontSize={'14px'} textAlign={'center'}>
            <Grid item xs={3} border={'0.5px solid #DAE4EC'} color={'#102D42'}>
              {item}
            </Grid>
            <Grid item xs={9} border={'0.5px solid #DAE4EC'} color={'#102D42'}>
              <Grid container direction={'column'}>
                <Grid item xs={6} border={'0.5px solid #DAE4EC'} color={'#102D42'}></Grid>
                <Grid item xs={6} border={'0.5px solid #DAE4EC'} color={'#102D42'}></Grid>
              </Grid>
            </Grid>
          </Grid>
        ))} */}
      </Stack>
    </Stack>
  )
}

export default Schedule
