import { Stack, Box, Button, Grid, Fab } from '@mui/material'
import { useState, useEffect } from 'react'
import { useResposive } from '../../utils/hook'
import DetailPost from '../Helpers/DetailPost'
import { getAllOwnerPost, deletePost, getPostById, chooseHelper } from '../../apis/post.api'
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

import { doUpdatePostRating } from '../../redux/slice/modalDetai'
import { doOpenModalRating } from '../../redux/slice/modalDetai'
import { markPostAsFinished } from '../../apis/post.api'
import { toast } from 'react-toastify'

import AddIcon from '@mui/icons-material/Add';
import Nofind from '../../components/NoFind/NoFind'
import { doClearInfo } from '../../redux/slice'
import { useLocation } from 'react-router-dom'


const MyNews = () => {
  const { isFromMd } = useResposive()
  const search = useLocation().search;
  const tabUrl = new URLSearchParams(search).get('tab');
  const postId = new URLSearchParams(search).get('postId');

  const [tab, setTab] = useState<any>(tabUrl || 0)


  const [listPost, setListPost] = useState<IPost[]>([])
  const [activePost, setActivePost] = useState<any>(postId || '')
  const [open, setOpen] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [modeModal, setModalMode] = useState<'DELETE' | 'CHOOSE' | ''>('')

  const dispatch = useDispatch()
  const history = useNavigate()

  const agree = () => {
    setOpen(false)
    if (modeModal === 'DELETE') {
      handleDeletePost()
    }
  }
  const handleDeletePost = () => {
    setIsLoading(true)

    deletePost(activePost)
      .then((res) => {
        getAllOwnerPost().then((res) => {
          setListPost(res.data.data.content[0])
          setActivePost(res.data.data.content[0][0].id) 
        })
        toast.success('Xóa bài đăng thành công')
      })
      .catch((err) => {
        toast.error('Xóa bài thất bại')
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
 const getAllOwnerPosts = () =>  {
    getAllOwnerPost().then((res) => {
      setListPost(res.data.data.content[0])
      setActivePost(res.data.data.content[0][0].id)
    })
  }
  useEffect(() => {
    getAllOwnerPost().then((res) => {
      setListPost(res.data.data.content[0])
      setActivePost(res.data.data.content[0][0].id)
    })
  }, [])

  useEffect(() => {
    if (listPost.length && filterPost(listPost).length) {
      setActivePost(filterPost(listPost)[0].id)
    } else {
      setActivePost('')
    }
  }, [tab])

  const filterPost = (listPost: IPost[]) => {
    if (tab == 0) return listPost
    if (tab == 1) return listPost.filter((item) => !item.applied && !item.confirmed && !item.finished && !item.overdue)
    if (tab == 2) return listPost.filter((item) => item.applied === true)
    if (tab == 3) return listPost.filter((item) => item.confirmed === true)
    if (tab == 4) return listPost.filter((item) => item.finished === true)
    if (tab == 5) return listPost.filter((item) => item.overdue === true)
    return []
  }

  const renderActionForPost = (post: IPost) => {
    if (post.applied || post.confirmed) return <></>
    if (post.finished || post.overdue) {
      return (
        <div
          onClick={() => {
            getPostById(post.id).then((res) => {
              dispatch(
                doUpdateInfo({
                  ...res.data.data,
                  id: null,
                  startDate: `${res.data.data.startDate.year}-${res.data.data.startDate.month}-${res.data.data.startDate.day}`,
                  recurringPattern: res.data.data.recurringPattern
                    ? {
                        ...res.data.data.recurringPattern,
                        endDate: `${res.data.data.recurringPattern.endDate.year}-${res.data.data.recurringPattern.endDate.month}-${res.data.data.recurringPattern.endDate.day}`
                      }
                    : null
                })
              )
              history('/owner/create-news')
            })
          }}
        >
          <ContentCopyIcon />
        </div>
      )
    }
    return (
      <Stack direction={'row'}>
        <div
          onClick={() => {
            getPostById(post.id).then((res) => {
              dispatch(
                doUpdateInfo({
                  ...res.data.data,
                  startDate: `${res.data.data.startDate.year}-${res.data.data.startDate.month}-${res.data.data.startDate.day}`,
                  recurringPattern: res.data.data.recurringPattern
                    ? {
                        ...res.data.data.recurringPattern,
                        endDate: `${res.data.data.recurringPattern.endDate.year}-${res.data.data.recurringPattern.endDate.month}-${res.data.data.recurringPattern.endDate.day}`
                      }
                    : null
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
            setModalMode('DELETE')
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
        <Box textAlign={'right'} fontSize={'14px'} fontStyle={'italic'} color={'red'} >
          Tin chờ xác nhận
        </Box>
      )
    if (post.confirmed) {
      return (
        <Box textAlign={'right'} fontSize={'14px'} fontStyle={'italic'} color={'green'}>
          Tin đã xác nhận
        </Box>
      )
    }
    if (post.finished) {
      return (
        <Box textAlign={'right'} fontSize={'14px'} fontStyle={'italic'} color={'orange'}>
          Tin đã hoàn thành
        </Box>
      )
    }
    if (post.overdue) {
      return (
        <Box textAlign={'right'} fontSize={'14px'} fontStyle={'italic'} color={'blue'}>
          Tin đã quá hạn
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
        <Button variant={`${tab == 0 ? 'contained' : 'outlined'}` } sx = {{textTransform: 'none'}} onClick={() => setTab(0)}>
          Tất cả
        </Button>
        <Button variant={`${tab == 1 ? 'contained' : 'outlined'}`} sx = {{textTransform: 'none'}} onClick={() => setTab(1)}>
          Tin mới đăng
        </Button>
        <Button variant={`${tab == 2 ? 'contained' : 'outlined'}`} sx = {{textTransform: 'none'}} onClick={() => setTab(2)}>
          Tin chờ xác nhận
        </Button>
        <Button variant={`${tab == 3 ? 'contained' : 'outlined'}`} sx = {{textTransform: 'none'}} onClick={() => setTab(3)}>
          Tin đã xác nhận
        </Button>
        <Button variant={`${tab == 4 ? 'contained' : 'outlined'}`} sx = {{textTransform: 'none'}} onClick={() => setTab(4)}>
          Tin đã hoàn thành
        </Button>
        <Button variant={`${tab == 5 ? 'contained' : 'outlined'}`} sx = {{textTransform: 'none'}}   onClick={() => setTab(5)}>
          Tin đã quá hạn
        </Button>
      </Stack>

      {filterPost(listPost).length ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Stack direction={'column'} gap = {'10px'}>
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
            </Stack>
           
          </Grid>
          {isFromMd && (
            <Grid item xs={7}>
              <DetailPost
                post={listPost.find((item) => item.id === activePost)}
                isHideBtn={true}
                listHelper={listPost.find((item) => item.id === activePost)?.helpers}
                clickRating = {() => {
                  dispatch(doOpenModalRating({}))
                  dispatch(doUpdatePostRating(listPost.find((item) => item.id === activePost)?.id))
                }}
                choose={(id:any) => {
                  setIsLoading(true)
                  chooseHelper(activePost, id)
                    .then(() => {
                      setOpen(true)
                      setText('Chọn người giúp việc thành công')
                      setModalMode('CHOOSE')
                      getAllOwnerPost().then((res) => {
                        setListPost(res.data.data.content[0])
                        setActivePost(res.data.data.content[0][0].id)
                      })
                    })
                    .finally(() => {
                      setIsLoading(false)
                    })
                }}
                isConfirmBtn = {listPost.find((item) => item.id === activePost)?.confirmed}
                onClickMarkPost = {() => {
                  if(listPost.find((item) => item.id === activePost)?.id) {
                    markPostAsFinished(listPost.find((item) => item.id === activePost)?.id || '').then((res) => {
                      toast.success('Xác nhận thành công')
                      getAllOwnerPosts()
                    })
                    .catch((err) => {
                      toast.error(err.response.data.message)
                    })
                  }
                  
                }}
              />
            </Grid>
          )}
        </Grid>
      ) : (
        <Nofind />
      )}
      <Popup open={open} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
      <Modal open={isLoading} Content={<Loading></Loading>} />
      <Box sx={{ position: 'sticky', bottom: '20px', display: 'flex', justifyContent:'flex-end'}}  onClick={() => {
          dispatch(doClearInfo({}))
          history('/owner/create-news')
        }}>
        <Fab color='primary' aria-label='add'>
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  )
}
export default MyNews
