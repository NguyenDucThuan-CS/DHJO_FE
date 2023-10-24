import { Stack, Box, Button, Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import { useResposive } from '../../utils/hook'
import DetailPost from '../Helpers/DetailPost'
import { getAllOwnerPost, deletePost, getPostById } from '../../apis/post.api'
import { IPost } from '../Helpers/Helper'
import CardPost from '../../components/CardPost/CardPost'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Popup } from '../../components/Popup/Popup'
import { Modal } from '../../components/Modal/Modal'
import Loading from '../../components/Loading/Loading'
import { doUpdateInfo } from '../../redux/slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MyNews = () => {
  const { isFromMd } = useResposive()
  const [tab, setTab] = useState<number>(0)
  const [listPost, setListPost] = useState<IPost[]>([])
  const [activePost, setActivePost] = useState<string>('')

  const [open, setOpen] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const history = useNavigate()
  const agree = () => {
    setOpen(false)
    setIsLoading(true)
    deletePost(activePost)
      .then((res) => {
        console.log(res)
        setListPost((prev) => prev.filter((item) => item.id !== activePost))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const disagree = () => {
    setOpen(false)
  }

  const close = () => {
    setOpen(false)
  }

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

  const renderActionForPost = (post: IPost) => {
    if (post.applied || post.confirmed) return <></>
    if (post.finished || post.overdue) {
      return <ContentCopyIcon />
    }
    return (
      <Stack direction={'row'}>
        <div
          onClick={() => {
            getPostById(post.id).then((res) => {
              dispatch(
                doUpdateInfo({
                  ...res.data.data,
                  startDate: `${res.data.data.startDate.year}-${res.data.data.startDate.month}-${res.data.data.startDate.day}`
                })
              )
              history('/owner/create-news')
            })
          }}
        >
          <EditIcon />
        </div>
        <div
          onClick={() => {
            setOpen(true)
            setText('Bạn có chắc chắn muốn xóa?')
          }}
        >
          <DeleteIcon />
        </div>
      </Stack>
    )
  }

  const renderNotePost = (post: IPost) => {
    if (post.applied)
      return (
        <Box textAlign={'right'} fontSize={'14px'} fontStyle={'italic'}>
          Tin chờ xác nhận
        </Box>
      )
    if (post.confirmed) {
      return (
        <Box textAlign={'right'} fontSize={'14px'} fontStyle={'italic'}>
          Tin đã xác nhận
        </Box>
      )
    }
    if (post.finished) {
      return (
        <Box textAlign={'right'} fontSize={'14px'} fontStyle={'italic'}>
          Tin đã hoàn thành
        </Box>
      )
    }
    if (post.overdue) {
      return (
        <Box textAlign={'right'} fontSize={'14px'} fontStyle={'italic'}>
          Tin đã hoàn quá hạn
        </Box>
      )
    }
    return (
      <Box textAlign={'right'} fontSize={'14px'} fontStyle={'italic'}>
        Tin mới đăng
      </Box>
    )
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
              CardAction={renderActionForPost(item)}
              CardNote={renderNotePost(item)}
            />
          ))}
        </Grid>
        {isFromMd && (
          <Grid item xs={7}>
            <DetailPost post={listPost.find((item) => item.id === activePost)} isHideBtn={true} />
          </Grid>
        )}
      </Grid>
      <Popup open={open} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
      <Modal open={isLoading} Content={<Loading></Loading>} />
    </Box>
  )
}
export default MyNews
