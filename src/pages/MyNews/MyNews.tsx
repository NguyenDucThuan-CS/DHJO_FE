import { Stack, Box, Button, Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import { useResposive } from '../../utils/hook'
//import CardPost from '../../components/CardPost/CardPost'
import DetailPost from '../Helpers/DetailPost'
import { getAllOwnerPost } from '../../apis/post.api'
import { IPost } from '../Helpers/Helper'
import CardPost from '../../components/CardPost/CardPost'
const MyNews = () => {
  const { isFromMd } = useResposive()
  const [tab, setTab] = useState<number>(0)
  const [listPost, setListPost] = useState<IPost[]>([])
  const [activePost, setActivePost] = useState<string>('')
  console.log('activePost', activePost)
  useEffect(() => {
    getAllOwnerPost().then((res) => {
      setListPost(res.data.data.content[0])
      setActivePost(res.data.data.content[0][0].id)
    })
  }, [])
  const filterPost = (listPost: IPost[]) => {
    if (tab === 0) return listPost
    if (tab === 1) return listPost.filter((item) => !item.applied && !item.confirmed && !item.finished && !item.overdue)
    if (tab === 2) return listPost.filter((item) => item.applied === true)
    if (tab === 3) return listPost.filter((item) => item.confirmed === true)
    if (tab === 4) return listPost.filter((item) => item.finished === true)
    if (tab === 5) return listPost.filter((item) => item.overdue === true)
    return []
  }
  return (
    <Box>
      <Stack direction={'row'} gap={2} sx={{ marginBottom: '20px' }}>
        <Button variant={`${tab === 0 ? 'contained' : 'outlined'}`} onClick={() => setTab(0)}>
          Tất cả
        </Button>
        <Button variant={`${tab === 1 ? 'contained' : 'outlined'}`} onClick={() => setTab(1)}>
          Tin mới đăng
        </Button>
        <Button variant={`${tab === 2 ? 'contained' : 'outlined'}`} onClick={() => setTab(2)}>
          Tin chờ xác nhận
        </Button>
        <Button variant={`${tab === 3 ? 'contained' : 'outlined'}`} onClick={() => setTab(3)}>
          Tin đã xác nhận
        </Button>
        <Button variant={`${tab === 4 ? 'contained' : 'outlined'}`} onClick={() => setTab(4)}>
          Tin đã hoàn thành
        </Button>
        <Button variant={`${tab === 5 ? 'contained' : 'outlined'}`} onClick={() => setTab(5)}>
          Tin đã quá hạn
        </Button>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          {filterPost(listPost).map((item, index) => (
            <CardPost
              key={`${index}${item.id}`}
              post={item}
              active={item.id === activePost}
              onClick={() => setActivePost(item.id)}
            />
          ))}
        </Grid>
        {isFromMd && (
          <Grid item xs={7}>
            <DetailPost post={listPost.find((item) => item.id === activePost)} isHideBtn={true} />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
export default MyNews
