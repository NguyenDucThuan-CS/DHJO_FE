import { Stack, Box } from '@mui/material'
import './styles.css'
import { getTime, sortIt, collision2 } from './../../../utils/schedule'
import { useCallback, useRef, useEffect, useState } from 'react'
import { getTaskToday } from '../../../apis/task.api'

export interface ITask {
  id: string
  postId: string
  taskName: string
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
  isDraftTask: boolean
}
interface Props {
  onClick?: (id: string) => void
}

const Schedule = ({ onClick }: Props) => {
  const daysInWeek = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']

  const [tasks, setTasks] = useState<ITask[]>([])

  const queue = useRef<any>([])
  const style = useCallback(function (ele: any) {
    const { startTimeHour, startTimeMinute, endTimeHour, endTimeMinute } = getTime(ele)
    const height = Number(endTimeHour) - Number(startTimeHour)
    const heightMinute = Number(endTimeMinute) - Number(startTimeMinute)

    const collisi = collision2(queue.current, ele)

    queue.current.push(ele)
    const widt = collisi * 25
    return {
      top: `${Number(startTimeHour) * 20 + Number(startTimeMinute)}px`,
      backgroundColor: ele.color,

      width: `${90 - widt}%`,
      height: `${Number(height * 20) + heightMinute}px`,
      left: `${collisi === 0 ? 25 : collisi * 150}px`
    }
  }, [])

  useEffect(() => {
    getTaskToday().then((res) => {
      //console.log(res)
      setTasks(res.data.data)
    })
  }, [])

  const mapTaskToCollisionList = (task: ITask[]) => {
    return task.map((item) => {
      return {
        startTime: `${item.startTime.hour}:${item.startTime.minute}`,
        endTime: `${item.startTime.hour + item.workTime}:${item.startTime.minute}`,
        color: '#029be5',
        title: item.taskName,
        postId: item.postId
      }
    })
  }

  return (
    <Stack direction={{ xs: 'column' }} sx={{ border: '0.5px solid #DAE4EC' }}>
      <Box textAlign={'center'}>
        <p>
          Tháng {new Date().getMonth() + 1}, {new Date().getFullYear()}
        </p>
        <p>{daysInWeek[new Date().getDay()]}</p>
        <Box
          sx={{
            width: '50px',
            height: '50px',
            background: 'yellow',
            borderRadius: '50%',
            margin: 'auto',
            lineHeight: '50px',
            fontWeight: 'bold'
          }}
        >
          {new Date().getDate()}
        </Box>
      </Box>

      <Stack direction={'column'} sx={{ marginTop: '12px' }}>
        <div className='calendar'>
          <h3 style={{ textAlign: 'center' }}>calendar</h3>
          <div className='container'>
            {Array(25)
              .fill(true)
              .map((ele, index) => (
                <div key={index} className='time'>
                  <p>{index}</p>
                </div>
              ))}
            {(() => {
              queue.current = []
            })()}
            {sortIt(mapTaskToCollisionList(tasks)).map((ele: any, index: any) => (
              <div key={index} className='schedule' onClick={() => onClick && onClick(ele.postId)} style={style(ele)}>
                <p>{ele.title}</p>
                <p>
                  {ele.startTime}-{ele.endTime}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Stack>
    </Stack>
  )
}

export default Schedule
