import HomeCard from '../HomeCard/HomeCard'
import Grid from '@mui/material/Grid'

const ListHomeCard = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <HomeCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <HomeCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <HomeCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <HomeCard />
        </Grid>
      </Grid>
    </>
  )
}

export default ListHomeCard
