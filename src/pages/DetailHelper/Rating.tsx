import Stack from '@mui/material/Stack'

export const Rating = (numStar: number) => {
  return (
    <Stack direction={'row'}>
      <p>{numStar}</p>
    </Stack>
  )
}
