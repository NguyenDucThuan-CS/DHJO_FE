import HelperCard from '../HelperCard/HelperCard'
import { Grid } from '@mui/material'

export default function ListHelperCard({ listHelpers, choose, idChosen }: any) {
  return (
    <div>
      <Grid container spacing={2}>
        {listHelpers?.map((item: any) => (
          <>
            <Grid item xs={4} sm={4} md={4}>
              <HelperCard
                key={item.id}
                helperId={item.helperId}
                name={item.name}
                gender={item.gender}
                birthday={item.birthday}
                education={item.education}
                skills={item.skills}
                choose={choose}
                isChosen={idChosen == item.id}
                phone={item.phoneNum}
                overallRating={item.overallRating}
                isFavourite={item.isFavourite}
                img={item.base64Image}
              />
            </Grid>
          </>
        ))}
      </Grid>
    </div>
  )
}
