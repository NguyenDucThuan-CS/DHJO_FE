import * as React from 'react'
import Paper from '@mui/material/Paper'
import { ViewState } from '@devexpress/dx-react-scheduler'
import { Scheduler, DayView, Appointments } from '@devexpress/dx-react-scheduler-material-ui'
import { useEffect, useState } from 'react'
import { getTaskToday } from '../../apis/task.api'

const currentDate = '2023-11-28'


const renderHourMinute = (number:number) => {
    if(number < 10) return `0${number}`
    return number
}


const renderDate = (date:any, time:any) => {
    return `${date.year}-${date.month}-${date.day}T${renderHourMinute(time.hour)}-${renderHourMinute(time.minute)}`
}

const renderEndTime = ( startTime:any,workTime:number) => {
    const hour =  Math.floor(workTime / 3600)
    const minute = (workTime - hour*3600) / 60;

    return { hour: startTime.hour + hour, minute: startTime.minute + minute, second: 0, nano: 0}

}


const ScheduleToday = () => {
  const [tasks, setTasks] = useState<any>([])

  useEffect(() => {
    getTaskToday().then((res) => {
      if(res.data.data && res.data.data.length) setTasks(res.data.data.map((item:any) => ({
        startDate: renderDate(item.startDate, item.startTime),
        endDate: renderDate(item.startDate, renderEndTime(item.startTime, item.workTime)),
        title: item.taskName
      })))
    })
  })
  return (
    <Paper>
      <Scheduler data={tasks}>
        <ViewState currentDate={currentDate} />
        <DayView startDayHour={8} endDayHour={16} />
        <Appointments />
      </Scheduler>
    </Paper>
  )
}

export default ScheduleToday
