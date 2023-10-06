import HelperCard from '../HelperCard/HelperCard'
import { Grid } from '@mui/material'

interface Props {
  listHelpers: {
    id: string
    name: string
    gender: {
      id: string
      name: string
    }
    birhday: string
    education: {
      id: string
      name: string
    }
    skills: {
      id: string
      skillName: string
    }[]
  }[]
  choose?: (id: string, flag: boolean) => void
  idChosen?: string
}
export default function ListHelperCard({ listHelpers, choose, idChosen }: Props) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          {listHelpers.map((item) => (
            <HelperCard
              key={item.id}
              id={item.id}
              name={item.name}
              gender={item.gender}
              birhday={item.birhday}
              education={item.education}
              skills={item.skills}
              choose={choose}
              isChosen={idChosen == item.id}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  )
}
