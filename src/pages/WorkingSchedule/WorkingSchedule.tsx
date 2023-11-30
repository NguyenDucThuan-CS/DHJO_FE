import React, { useState, useEffect } from 'react'
import Scheduler from 'react-mui-scheduler'
import { getAllTask } from '../../apis/task.api'

import { ITask } from '../Helpers/Schedule/Schedule'

export const renderHour = (startTime: { hour: number; minute: number; nano: number; second: number }) => {
  const tag = startTime.hour > 11 ? 'pm' : 'am'
  return `${startTime.hour}:${startTime.minute} ${tag}`
}

export default function WorkingSchedule() {
  const [tasks, setTasks] = useState<ITask[]>([])

  const [state] = useState({
    options: {
      transitionMode: 'zoom', // or fade
      startWeekOn: 'mon', // or sun
      defaultMode: 'month', // or week | day | timeline
      minWidth: 540,
      maxWidth: 540,
      minHeight: 540,
      maxHeight: 540
    },

    toolbarProps: {
      showSearchBar: true,
      showSwitchModeButtons: true,
      showDatePicker: true
    },
    views:{ month: true, week: false, day: false, agenda: false, }
  })

  //   const events = [
  //     {
  //       id: 'event-1',
  //       label: 'Medical consultation',
  //       groupLabel: 'Dr Shaun Murphy',
  //       user: 'Dr Shaun Murphy',
  //       color: '#f28f6a',
  //       startHour: '04:00 AM',
  //       endHour: '05:00 AM',
  //       date: '2022-05-05',
  //       createdAt: new Date(),
  //       createdBy: 'Kristina Mayer'
  //     },
  //     {
  //       id: 'event-2',
  //       label: 'Medical consultation',
  //       groupLabel: 'Dr Claire Brown',
  //       user: 'Dr Claire Brown',
  //       color: '#099ce5',
  //       startHour: '09:00 AM',
  //       endHour: '10:00 AM',
  //       date: '2022-05-09',
  //       createdAt: new Date(),
  //       createdBy: 'Kristina Mayer'
  //     },
  //     {
  //       id: 'event-3',
  //       label: 'Medical consultation',
  //       groupLabel: 'Dr Menlendez Hary',
  //       user: 'Dr Menlendez Hary',
  //       color: '#263686',
  //       startHour: '13 PM',
  //       endHour: '14 PM',
  //       date: '2022-05-10',
  //       createdAt: new Date(),
  //       createdBy: 'Kristina Mayer'
  //     },
  //     {
  //       id: 'event-4',
  //       label: 'Consultation prénatale',
  //       groupLabel: 'Dr Shaun Murphy',
  //       user: 'Dr Shaun Murphy',
  //       color: '#f28f6a',
  //       startHour: '08:00 AM',
  //       endHour: '09:00 AM',
  //       date: '2022-05-11',
  //       createdAt: new Date(),
  //       createdBy: 'Kristina Mayer'
  //     }
  //   ]

//   const handleCellClick = (event: any, row: any, day: any) => {
//     console.log(row)
//   }

//   const handleEventClick = (event: any, item: any) => {
//     // Do something...
//   }

//   const handleEventsChange = (item: any) => {
//     // Do something...
//   }

//   const handleAlertCloseButtonClicked = (item) => {
//     // Do something...
//   }
  useEffect(() => {
    getAllTask().then((res) => {
      setTasks(res.data.data)
    })
  }, [])

  
  return (
    <Scheduler
      locale='en'
      events={tasks.map((item) => ({
        id: item.id,
        label: item.taskName,
        groupLabel: '',
        user: '',
        color: '#f28f6a',
        startHour: renderHour(item.startTime),
        endHour: renderHour({ ...item.startTime, hour: item.startTime.hour + item.workTime }),
        date: `${item.startDate.year}-${item.startDate.month}-${item.startDate.day}`,
        createdAt: new Date(),
        createdBy: ''
      }))}
      legacyStyle={false}
      options={state?.options}
      toolbarProps={state?.toolbarProps}
    //   onEventsChange={handleEventsChange}
    //   onCellClick={handleCellClick}
    //   onTaskClick={handleEventClick}
    //   onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
    />
  )
}
