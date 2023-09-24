import HomeCard from '../HomeCard/HomeCard'
import Grid from '@mui/material/Grid'

const ListHomeCard = ({ listHouses }: any) => {

  return (
    <>
      <Grid container spacing={2}>
        {listHouses?.map((i, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <HomeCard
              homeName={i.houseName}
              homeType={i.name}
              floorArea={i.floorArea}
              address={i.ward.name + i.district.name + i.province.name}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default ListHomeCard
