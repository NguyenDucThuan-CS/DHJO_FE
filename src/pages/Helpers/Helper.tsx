import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
//import SelectDropdown from '../../components/SelectDropdown/SelectDown'
import CardPost from '../../components/CardPost/CardPost'
import Grid from '@mui/material/Grid'
import DetailPost from './DetailPost'
import Schedule from './Schedule'
import { useResposive } from '../../utils/hook'
import { getActivePosts } from '../../apis/get-active-post'
import { useEffect, useState } from 'react'
export interface IPost {
  id: string
  createdAt: {
    year: number
    month: number
    day: number
    hour: number
    minute: number
    second: number
    nano: number
  }
  modifiedAt: {
    year: number
    month: number
    day: number
    hour: number
    minute: number
    second: number
    nano: number
  }
  deleted: null
  title: string
  content: string
  startTime: {
    hour: number
    minute: number
    second: number
    nano: number
  }
  startDate: {
    year: number
    month: number
    day: number
  }
  workTime: number
  fee: number
  preferredGender: string
  preferredEducation: string
  house: {
    houseName: string
    houseType: string
    floorArea: number
    houseNo: string
    street: string
    ward: string
    district: string
    province: string
  }
  skills: string[]
  recurringPattern: null
}

const Helper = () => {
  const [listPost, setListPost] = useState<IPost[]>([])
  const [activePost, setActivePost] = useState<string>('')

  useEffect(() => {
    getActivePosts().then((res) => {
      setListPost(res.data.data)
      setActivePost(res.data.data[0].id)
    })
  }, [])

  const { isFromLg, isFromMd } = useResposive()
  return (
    <Box>
      <Stack direction='row' spacing={2}>
        {/* <SelectDropdown list={[]}></SelectDropdown>
          <SelectDropdown list={[]}></SelectDropdown>

          <SelectDropdown list={[]}></SelectDropdown> */}
      </Stack>
      <Grid container spacing={2} direction={{ sm: 'column', md: 'row' }}>
        {isFromMd && (
          <Grid item xs={4} lg={2}>
            <Schedule />
          </Grid>
        )}
        <Grid item xs={12} md={8} lg={4}>
          {listPost.map((item) => (
            <CardPost
              key={item.id}
              post={item}
              active={item.id === activePost}
              onClick={() => setActivePost(item.id)}
            />
          ))}
        </Grid>
        {isFromLg && (
          <Grid item xs={6} lg={6}>
            <DetailPost post={listPost.find((item) => item.id === activePost)}/>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default Helper
