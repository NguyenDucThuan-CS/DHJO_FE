import HelperCard from '../HelperCard/HelperCard'
import { Grid } from '@mui/material'

// interface Props {
//   listHelpers: {
//     id: string
//     name: string
//     gender: {
//       id: string
//       name: string
//     }
//     birthday: any
//     education: {
//       id: string
//       name: string
//     }
//     skills: {
//       id: string
//       skillName: string
//     }[]
//     phoneNum:string
//     overallRating: any
//   }[]
//   choose?: (id: string, flag: boolean) => void
//   idChosen?: string
// }

export default function ListHelperCard({ listHelpers, choose, idChosen }: any) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          {listHelpers?.map((item:any) => (
            <HelperCard
              key={item.id}
              helperId={item.id}
              name={item.name}
              gender={item.gender}
              birthday={item.birthday}
              education={item.education}
              skills={item.skills}
              choose={choose}
              isChosen={idChosen == item.id}
              phone={item.phoneNum}
              overallRating={item.overallRating}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  )
}
