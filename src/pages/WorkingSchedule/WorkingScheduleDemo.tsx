import React, { useState } from 'react'
import Scheduler from 'react-mui-scheduler'

export default function WorkingScheduleDemo() {
  const [state, setState] = useState({
    options: {
      transitionMode: 'fade', // or fade
      startWeekOn: 'Mon', // or Sun
      defaultMode: 'day', // or week | day | timeline
      minWidth: 540,
      maxWidth: 540,
      minHeight: 540,
      maxHeight: 540
    },
    alertProps: {
      open: false,
      color: 'info', // info | success | warning | error
      severity: 'info', // info | success | warning | error
      message: "🚀 Let's start with awesome react-mui-scheduler 🔥 🔥 🔥",
      showActionButton: false,
      showNotification: false,
      delay: 1500
    },
    toolbarProps: {
      showSearchBar: true,
      showSwitchModeButtons: true,
      showDatePicker: true
    }
  })

  const events = [
    {
      id: 'event-1',
      label: 'Medical',
      groupLabel: 'Dr Shaun Murphy',
      user: 'Dr Shaun Murphy',
      color: '#f28f6a',
      startHour: '04:00 AM',
      endHour: '06:00 AM',
      date: '2022-04-01',
      createdAt: new Date(),
      createdBy: 'Kristina Mayer'
    }
  ]

  const handleCellClick = (event, row, day) => {
    // Do something...
  }

  const handleEventClick = (event, item) => {
    // Do something...
  }

  const handleEventsChange = (item) => {
    // Do something...
  }

  const handleAlertCloseButtonClicked = (item) => {
    console.log('exit aler')
  }

  return (
    <Scheduler
      locale='fr'
      events={events}
      legacyStyle={false}
      options={state?.options}
      alertProps={state?.alertProps}
      toolbarProps={state?.toolbarProps}
      onEventsChange={handleEventsChange}
      onCellClick={handleCellClick}
      onTaskClick={handleEventClick}
      onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
    />
  )
}
