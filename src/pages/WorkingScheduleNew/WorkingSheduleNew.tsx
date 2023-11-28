import React from 'react'
import Paper from '@mui/material/Paper'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  DayView,
  Toolbar,
  Appointments,
  DateNavigator,
  ViewSwitcher,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui'

import Box from '@mui/material/Box'
import { getAllTask } from '../../apis/task.api'

class WorkingScheduleNew extends React.Component {
  constructor(props: any) {
    super(props)

    this.state = {
      data: [],
      currentDate: new Date(),
      currentView: 'Week',
      range: this.getRange(new Date(), 'Week')
    }
  }
  componentDidMount(): void {
    getAllTask().then((res) => {
      this.setState({
        data: res.data.data.map((item: any) => ({
          title: item.taskName,
          startDate: new Date(
            item.startDate.year,
            item.startDate.month - 1,
            item.startDate.day,
            item.startTime.hour,
            item.startTime.minute
          ),
          endDate: new Date(
            item.startDate.year,
            item.startDate.month - 1,
            item.startDate.day,
            item.startTime.hour + Math.floor(item.workTime/3600),
            item.startTime.minute
          ),
          id: item.id,
          location: ''
        }))
      })
    })
  }
  render() {
    const { data, currentDate, currentView, range } = this.state
    return ( 
      <Box>
        <Paper>
          <Scheduler height={600} data={data}>
            <ViewState
              currentDate={currentDate}
              currentView={currentView}
              onCurrentDateChange={this.currentDateChange}
              onCurrentViewNameChange={this.currentViewChange}
            />
            <WeekView startDayHour={4} endDayHour={19} name='Week' />
            <DayView />
            <Appointments />
            <Toolbar />
            <DateNavigator />
            <ViewSwitcher />
            <TodayButton />
          </Scheduler>
        </Paper>
      </Box>
    )
  }
  getRange = (date: any, view: any) => {
    if (view === 'Day') {
      return { startDate: date, endDate: date }
    }
    if (view === 'Week') {
      let firstDay = date.getDate() - date.getDay()
      let lastDay = firstDay + 6
      return {
        startDate: new Date(date.setDate(firstDay)),
        endDate: new Date(date.setDate(lastDay))
      }
    }
  }
  currentViewChange = (currentView: any) => {
    let currentDate = this.state.currentDate
    let range = this.getRange(currentDate, currentView)
    this.setState({
      currentView,
      range
    })
  }
  currentDateChange = (currentDate: any) => {
    console.log(currentDate)
    let currentView = this.state.currentView
    let range = this.getRange(currentDate, currentView)
    this.setState({
      currentDate,
      range
    })
  }
}

export default WorkingScheduleNew
