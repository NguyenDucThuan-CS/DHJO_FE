import HomeCard from '../HomeCard/HomeCard'
import Grid from '@mui/material/Grid'
export interface House {
  id: string
  houseName: string
  houseType: {
    id: string
    name: string
  }
  floorArea: number
  houseNo: string
  street: string
  ward: {
    code: string
    name: string
    type: string
  }
  district: {
    code: string
    name: string
    type: string
  }
  province: {
    code: string
    name: string
    type: string
    slug: string
  }
}
interface ListHousesProps {
  listHouses: House[]
  edit?: (id: string) => void
  remove?: (id: string) => void
  choose?: (id: string, flag: boolean) => void
  idChosen?: string
}

const ListHomeCard = ({ listHouses, edit, remove, choose, idChosen }: ListHousesProps) => {
  return (
    <>
      <Grid container spacing={2}>
        {listHouses?.map((i, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <HomeCard
              id={i.id}
              homeName={i.houseName}
              homeType={i.houseType.name}
              floorArea={i.floorArea}
              address={i.ward.name + i.district.name + i.province.name}
              edit={edit}
              remove={remove}
              choose={choose}
              isChosen={idChosen === i.id}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default ListHomeCard
