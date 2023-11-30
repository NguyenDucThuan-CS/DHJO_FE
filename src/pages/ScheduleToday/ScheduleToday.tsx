import Paper from '@mui/material/Paper'
import { ViewState } from '@devexpress/dx-react-scheduler'
import { Scheduler, DayView, Appointments, Resources, AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui'
import { useEffect, useState } from 'react'
import { getTaskToday } from '../../apis/task.api'
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'
import { Grid } from '@mui/material'
import Room from '@mui/icons-material/Room'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'


const currentDate = dayjs(new Date()).format('YYYY-MM-DD')

export const renderHourMinute = (number:number) => {
    if(number < 10) return `0${number}`
    return number
}

const resources = [
  {
    fieldName: 'type',
    title: 'Type',
    instances: [
      { id: 'draftTask', text: 'draftTask', color: '#d3d3d3' },
      { id: 'realTask', text: 'realTask', color: '#1976d2' }
    ]
  }
]

export const renderDate = (date:any, time:any) => {
    return `${date.year}-${date.month}-${date.day}T${renderHourMinute(time.hour)}:${renderHourMinute(time.minute)}`
}

const renderEndTime = ( startTime:any,workTime:number) => {
    const hour =  Math.floor(workTime / 3600)
    const minute = (workTime - hour*3600) / 60;

    return { hour: startTime.hour + hour, minute: startTime.minute + minute, second: 0, nano: 0}

}
const PREFIX = 'Demo'

const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  firstRoom: `${PREFIX}-firstRoom`,
  secondRoom: `${PREFIX}-secondRoom`,
  thirdRoom: `${PREFIX}-thirdRoom`,
  header: `${PREFIX}-header`,
  commandButton: `${PREFIX}-commandButton`
}
const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(() => ({
  [`&.${classes.header}`]: {
    padding: 0
  }

}))
const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.textCenter}`]: {
    textAlign: 'center'
  }
}))

const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: palette.action.active
  }
}))

const StyledPerson = styled(PersonIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: palette.action.active
  }
}))

const StyledPhoneIcon = styled(PhoneIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: palette.action.active
  }
}))


const Header = ({ children, appointmentData, ...restProps }: any) => (
  <StyledAppointmentTooltipHeader {...restProps} appointmentData={appointmentData}>
    <MapContainer
      center={[appointmentData.house.coordinate.latitude, appointmentData.house.coordinate.longitude]}
      zoom={50}
      scrollWheelZoom={false}
      style={{ height: '200px',width:'100%'}}
      key={appointmentData.id}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[appointmentData.house.coordinate.latitude, appointmentData.house.coordinate.longitude]}>
        {/* <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup> */}
      </Marker>
    </MapContainer>
  </StyledAppointmentTooltipHeader>
)

const Content = ({ children, appointmentData, appointmentResources, ...restProps }: any) => {
  return (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <Grid container alignItems='center'>
        <StyledGrid item xs={2} className={classes.textCenter}>
          <StyledRoom className={classes.icon} />
        </StyledGrid>
        <Grid item xs={10}>
          <span>{appointmentData.location}</span>
        </Grid>
      </Grid>
      {appointmentData.ownerName && (
        <Grid container alignItems='center'>
          <StyledGrid item xs={2} className={classes.textCenter}>
            <StyledPerson className={classes.icon} />
          </StyledGrid>
          <Grid item xs={10}>
            <span>{appointmentData.ownerName}</span>
          </Grid>
        </Grid>
      )}
      {appointmentData.ownerPhoneNum && (
        <Grid container alignItems='center'>
          <StyledGrid item xs={2} className={classes.textCenter}>
            <StyledPhoneIcon className={classes.icon} />
          </StyledGrid>
          <Grid item xs={10}>
            <span>{appointmentData.ownerPhoneNum}</span>
          </Grid>
        </Grid>
      )}
    </AppointmentTooltip.Content>
  )
}

const ScheduleToday = () => {
  const [tasks, setTasks] = useState<any>([])

  useEffect(() => {
    getTaskToday().then((res) => {
      if(res.data.data && res.data.data.length) setTasks(res.data.data.map((item:any) => ({
        ...item,
        startDate: renderDate(item.startDate, item.startTime),
        endDate: renderDate(item.startDate, renderEndTime(item.startTime, item.workTime)),
        title: item.taskName,
        id: item.postId,
        location: `${item.house.street} ${item.house.ward}, ${item.house.district}, ${item.house.province} `,
        type: item.isDraftTask ? 'draftTask' : 'realTask'
      })))
    })
  }, [])


  return (
    <Paper>
      <Scheduler data={tasks}>
        <ViewState currentDate={currentDate} />
        <DayView startDayHour={0} endDayHour={24} />
        <Appointments />
        <Resources data={resources} />
        <AppointmentTooltip headerComponent={Header} contentComponent={Content}  />
      </Scheduler>
    </Paper>
  )
}

export default ScheduleToday
