import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
//import SelectDropdown from '../../components/SelectDropdown/SelectDown'
import CardPost from '../../components/CardPost/CardPost'
import Grid from '@mui/material/Grid'
import DetailPost from './DetailPost'
import { useResposive } from '../../utils/hook'
import { getActivePosts, filterActivePosts } from '../../apis/get-active-post'
import { useEffect, useState } from 'react'
import { applyPost, Post } from '../../apis/post.api'
import { Popup } from '../../components/Popup/Popup'
import { Modal } from '../../components/Modal/Modal'
import SelectDropdown from '../../components/SelectDropdown/SelectDown'
import { FilterIcon } from '../../assets/svg/FilterIcon'
import Typography from '@mui/material/Typography'
import Nofind from '../../components/NoFind/NoFind'
import ScheduleToday from '../ScheduleToday/ScheduleToday'
import { toast } from 'react-toastify'
import { Pagination } from '@mui/material'
import { ModalLoading } from '../../components/Modal/ModalLoading'
import Loading from '../../components/Loading/Loading'
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

const Helper = () => {
  const [listPost, setListPost] = useState<IPost[]>([])
  const [activePost, setActivePost] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [openTask, setOpenTask] = useState<boolean>(false)
  const [postForTask, setPostForTask] = useState<any>(null)

  const [text, setText] = useState<string>('')

  const [kindJob, setKindJob] = useState<string>('0')
  const [salaryOption, setSalaryOption] = useState<string>('0')
  const [distanceOption, setDistanceOption] = useState<string>('0')
  
  const [count, setCount] = useState<number>(1)
  const [pageNum, setPageNum] = useState<number>(1)

  
  const kindOfJobs = [
    {
      id: '1',
      name: 'Lặp lại'
    },
    { id: '2', name: 'Không lặp lại' }
  ]

  const salaryOptions = [
    {
      id: '1',
      name: 'trên 100.000 vnd'
    },

    { id: '2', name: 'trên 200.000vnd' },
    { id: '3', name: 'trên 300.000vnd' },
    { id: '4', name: 'trên 400.000vnd' }
  ]

  const distanceOptions = [
    {
      id: '1',
      name: 'dưới 5km'
    },

    { id: '2', name: 'dưới 10km' },
    { id: '3', name: 'dưới 15km' },
    { id: '4', name: 'dưới 20km' }
  ]

  const agree = () => {
    setOpen(false)
  }

  const disagree = () => {
    setOpen(false)
  }

  const close = () => {
    setOpen(false)
  }

  const renderValueSalary = (id: string) => {
    if (id === '0') return null
    return Number(id) * 100000
  }

  const renderValueDistance = (id: string) => {
    if (id === '0') return null
    return Number(id) * 5
  }

  const renderRecurring = (id: string) => {
    if (id === '0') return null
    if (id === '1') return true
    if (id === '2') return false
  }

  useEffect(() => {
    setIsLoading(true);
    getActivePosts().then((res) => {
      setIsLoading(false);
      setListPost(res.data.data.content[0])
      setActivePost(res.data.data.content[0][0].id)
      setCount(res.data.data.totalPage)
      setPageNum(1);
    })
  }, [])

  const getFilterActivePost = () => {
    setIsLoading(true);
    filterActivePosts({
      isRecurring: renderRecurring(kindJob),
      minFee: renderValueSalary(salaryOption),
      maxDistance: renderValueDistance(distanceOption),
      pageNo: pageNum - 1
    }).then((res) => {
      setIsLoading(false);
      setListPost(res.data.data.content[0])
      setActivePost(res.data.data.content[0][0].id)
      setCount(res.data.data.totalPage)
      setPageNum(1);
    })
  }

  useEffect(() => {
    getFilterActivePost()
  }, [pageNum])
  const { isFromLg } = useResposive()

  const helperApplyPost = () => {
    setIsLoading(true)
    applyPost(activePost)
      .then(() => {
        toast.success('Nhận việc thành công')
      })
      .catch((err) => {
        toast.error(err.response.data.message)
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
        skills: postForTask.skills?.map((item: any) => item.skillName),
        recurringPattern: postForTask.recurringPattern
      }
  }
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={2}>
          <ScheduleToday />
        </Grid>
        <Grid item md={10} direction={'column'}>
          <Stack direction={'row'} mb={2} spacing={2} alignItems={'center'}>
            <SelectDropdown list={kindOfJobs} id={kindJob} name={'Loại công việc'} setId={setKindJob} />
            <SelectDropdown list={salaryOptions} id={salaryOption} name={'Mức lương'} setId={setSalaryOption} />
            <SelectDropdown list={distanceOptions} id={distanceOption} name={'Khoảng cách'} setId={setDistanceOption} />
            <Box onClick={() => getFilterActivePost()}>
              <Typography sx={{ textAlign: 'left', width: '100%', fontWeight: 'bold', opacity: 0 }}>
                {'ffff'}
              </Typography>
              <FilterIcon />
            </Box>
          </Stack>
          <Grid container spacing={2}>
            {!isLoading? <Grid item md={5}>
              <Stack direction={'column'} gap={'5px'}>
                {listPost.length === 0 && <Nofind />}
                {listPost?.map((item, index) => (
                  <CardPost
                    key={`${index}${item.id}`}
                    post={item}
                    active={item.id === activePost}
                    onClick={() => setActivePost(item.id)}
                  />
                ))}
              </Stack>
            </Grid>:<Loading></Loading>}

            {isFromLg && listPost.length && !isLoading && (
              <Grid item md={7}>
                <DetailPost
                  post={listPost.find((item) => item.id === activePost)}
                  onClick={() => helperApplyPost()}
                  isHideFooter={true}
                />
              </Grid>
            )}
          </Grid>
          {!isLoading && <Pagination
            count={count}
            defaultPage={pageNum}
            siblingCount={0}
            onChange={(event: React.ChangeEvent<unknown>, page: number) => {
              setPageNum(page)
            }}
            sx = {{marginTop:'15px'}}
          />}
        </Grid>
      </Grid>

      <Popup open={open} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
      <Modal
        open={openTask}
        handleClose={() => setOpenTask(false)}
        Content={<DetailPost post={mapPost(postForTask as Post)} isHideBtn={true} isHideFooter={true}></DetailPost>}
      />
    
    </Box>
  )
}

export default Helper
