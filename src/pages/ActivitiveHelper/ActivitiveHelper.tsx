import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
//import SelectDropdown from '../../components/SelectDropdown/SelectDown'
import CardPost from '../../components/CardPost/CardPost'
import Grid from '@mui/material/Grid'
import DetailPost from './DetailPost'
import Schedule from './Schedule/Schedule'
import { useResposive } from '../../utils/hook'
import { getActivePosts, filterActivePosts } from '../../apis/get-active-post'
import { useEffect, useState } from 'react'
import { applyPost, getPostById, Post } from '../../apis/post.api'
import { Popup } from '../../components/Popup/Popup'
import { Modal } from '../../components/Modal/Modal'
import Loading from '../../components/Loading/Loading'
import { getPostHelperAll } from '../../apis/post.api'
import { Button } from '@mui/material'
import Nofind from '../../components/NoFind/NoFind'
import WorkingSchedule from '../WorkingSchedule/WorkingSchedule'
import ScheduleToday from '../ScheduleToday/ScheduleToday'
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
  helpers: any[]
  overdue: boolean
  applied: boolean
  confirmed: boolean
  finished: boolean
}

const ActvitiveHelper = () => {
  const [listPost, setListPost] = useState<IPost[]>([])
  const [activePost, setActivePost] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [openTask, setOpenTask] = useState<boolean>(false)
  const [postForTask, setPostForTask] = useState<any>(null)

  const [text, setText] = useState<string>('')

  const [tab, setTab] = useState<number>(0)

  const agree = () => {
    setOpen(false)
  }

  const disagree = () => {
    setOpen(false)
  }

  const close = () => {
    setOpen(false)
  }


  useEffect(() => {
    getPostHelperAll().then((res) => {
      setListPost(res.data.data.content[0])
      setActivePost(res.data.data.content[0][0].id)
    })
  }, [])

  const { isFromLg, isFromMd } = useResposive()

  const helperApplyPost = () => {
    setIsLoading(true)
    applyPost(activePost)
      .then(() => {
        setText('Đăng kí giúp việc thành công')
        setOpen(true)
      })
      .catch(() => {
        setText('Đã có lỗi xảy ra vui long thử lại')
        setOpen(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const mapPost = (postForTask: any) => {
    if (postForTask)
      return {
        id: postForTask.id as string,
        createdAt: postForTask.createdAt,
        modifiedAt: postForTask.modifiedAt,
        deleted: postForTask.deleted,
        title: postForTask.title,
        content: postForTask.content,
        startTime: postForTask.startTime,
        startDate: postForTask.startDate,
        workTime: postForTask.workTime,
        fee: postForTask.fee,
        preferredGender: postForTask.preferredGender?.name,
        preferredEducation: postForTask.preferredEducation?.name,
        house: {
          houseName: postForTask.house.houseName,
          houseType: postForTask.house.houseType.name,
          floorArea: postForTask.house.floorArea,
          houseNo: postForTask.house.houseNo,
          street: postForTask.house.street,
          ward: postForTask.house.ward.name,
          district: postForTask.house.district.name,
          province: postForTask.house.province.name
        },
        //house: postForTask.house,
        skills: postForTask.skills?.map((item: any) => item.skillName),
        recurringPattern: postForTask.recurringPattern
      }
  }

  const renderTextForBtn = (post: any) => {
    if(post) {
      if (post.finished) return 'Đã hoàn thành'
      if (post.applied) return 'Đã nhận'
      if (post.confirmed) return 'Đã được xác nhận'
      if (post.rejected) return 'Đã được từ chối'
      return 'Nhận việc'
    }
    return "  "
  }

  const handleOnClick = (post: any) => {
    if (!post.finished && !post.applied && !post.confirmed && !post.rejected) {
      return helperApplyPost()
    }
    return
  }

  const filterPost = (listPost: any) => {
    if (tab === 0) return listPost
    if (tab === 1) return listPost.filter((post:any) => post.applied === true)
    if (tab === 2) return listPost.filter((post:any) => post.confirmed === true)
    if (tab === 3) return listPost.filter((post:any) => post.rejected === true)
    if (tab === 4) return listPost.filter((post:any) => post.finished === true)
    return []
  }

  useEffect(() => {
    if (listPost.length && filterPost(listPost).length) {
      setActivePost(filterPost(listPost)[0].id)
    } else {
      setActivePost('')
    }
  }, [tab])

  return (
    <Box>
      <Stack direction={'row'} mb={2} spacing={2} alignItems={'center'}>
        <Button variant={`${tab === 0 ? 'contained' : 'outlined'}`} onClick={() => setTab(0)}>
          Tất cả
        </Button>
        <Button variant={`${tab === 1 ? 'contained' : 'outlined'}`} onClick={() => setTab(1)}>
          Đã nhận
        </Button>
        <Button variant={`${tab === 2 ? 'contained' : 'outlined'}`} onClick={() => setTab(2)}>
          Đã được chấp nhận
        </Button>
        <Button variant={`${tab === 3 ? 'contained' : 'outlined'}`} onClick={() => setTab(3)}>
          Từ chối
        </Button>
        <Button variant={`${tab === 4 ? 'contained' : 'outlined'}`} onClick={() => setTab(4)}>
          Đã hoàn thành
        </Button>
      </Stack>
      <Stack direction='row' spacing={2}>
        {/* <SelectDropdown list={[]}></SelectDropdown>
           <SelectDropdown list={[]}></SelectDropdown>
 
           <SelectDropdown list={[]}></SelectDropdown> */}
      </Stack>
      <Grid container spacing={2} direction={{ sm: 'column', md: 'row' }}>
        {isFromMd && (
          <Grid item xs={4} lg={2}>
            {/* <Schedule
              onClick={(id: string) => {
                getPostById(id).then((res) => {
                  setPostForTask(res.data.data)
                  setOpenTask(true)
                })
              }}
            /> */}
            <ScheduleToday />
          </Grid>
        )}
        <>
          <Grid item xs={12} md={8} lg={4}>
            {filterPost(listPost).length === 0 && <Nofind />}
            <Stack direction={'column'} gap = {'10px'}>
            {filterPost(listPost)?.map((item:any, index:any) => (
              <CardPost
                key={`${index}${item.id}`}
                post={item}
                active={item.id === activePost}
                onClick={() => setActivePost(item.id)}
              />
            ))}
            </Stack>
            
          </Grid>
          {isFromLg && listPost.length && (
            <Grid item xs={6} lg={6}>
              <DetailPost
                post={listPost.find((item) => item.id === activePost)}
                onClick={() => handleOnClick(listPost.find((item) => item.id === activePost))}
                isHideFooter={true}
                contentBtn={renderTextForBtn(listPost.find((item) => item.id === activePost))}
              />
            </Grid>
          )}
        </>
      </Grid>
      <Popup open={open} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
      <Modal
        open={openTask}
        handleClose={() => setOpenTask(false)}
        Content={<DetailPost post={mapPost(postForTask as Post)} isHideBtn={true} isHideFooter={true}></DetailPost>}
      />
      <Modal open={isLoading} Content={<Loading></Loading>} />
    </Box>
  )
}

export default ActvitiveHelper
