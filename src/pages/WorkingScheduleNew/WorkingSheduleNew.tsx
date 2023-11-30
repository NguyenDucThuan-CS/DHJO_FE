import React from 'react'
import Paper from '@mui/material/Paper'
import { EditingState, ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  DayView,
  Toolbar,
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  ViewSwitcher,
  TodayButton,
  AppointmentForm,
  Resources
} from '@devexpress/dx-react-scheduler-material-ui'
import Box from '@mui/material/Box'
import { getAllTask } from '../../apis/task.api'
import { helperGetPostById } from '../../apis/post.api'
import { styled } from '@mui/material/styles'
import { Grid } from '@mui/material'
import Room from '@mui/icons-material/Room'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

import './style.css'

const resources = [
  {
    fieldName: 'type',
    title: 'Type',
    instances: [
      { id: 'draftTask', text: 'draftTask', color: '#EC407A' },
      { id: 'realTask', text: 'realTask', color: '#7E57C2' }
    ]
  }
]
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
class WorkingScheduleNew extends React.Component {
  constructor(props: any) {
    super(props)

    this.state = {
      data: [],
      currentDate: new Date(),
      currentView: 'Week',
      range: this.getRange(new Date(), 'Week'),
      postForHelper: undefined,
      openModalPostHelper: false
    }
  }

  componentDidMount(): void {
    getAllTask().then((res) => {
      this.setState({
        data: res.data.data.map((item: any) => ({
          ...item,
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
            item.startTime.hour + Math.floor(item.workTime / 3600),
            item.startTime.minute
          ),
          id: item.postId,
          location: `${item.house.street} ,${item.house.ward}, ${item.house.district}, ${item.house.province} `,
          type: item.isDraftTask ? 'draftTask' : 'realTask'
        }))
      })
    })
  }
  render() {
    const { data, currentDate, currentView }: any = this.state
    return (
      <Box>
        <Paper >
          <Scheduler height={600} data={data} >
            <ViewState
              currentDate={currentDate}
              currentView={currentView}
              onCurrentDateChange={this.currentDateChange}
              onCurrentViewNameChange={this.currentViewChange}
            />

            <WeekView startDayHour={4} endDayHour={19} name='Week' />
            <DayView />
            <Appointments />
            <Resources data={resources} />
            <AppointmentTooltip headerComponent={Header} contentComponent={Content}  />
            <AppointmentForm visible={false} />
            <Toolbar />
            <DateNavigator />
            <ViewSwitcher />
            <TodayButton />
          </Scheduler>
        </Paper>
        {/* <Modal
        open={openModalPostHelper}
        handleClose={() =>  this.setState({openModalPostHelper: false})}
        Content={<DetailPost isHideBtn = {true} isHideFooter={true} post={postForHelper} ></DetailPost>}
      /> */}
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
    let currentView = this.state.currentView
    let range = this.getRange(currentDate, currentView)
    this.setState({
      currentDate,
      range
    })
  }
}

export default WorkingScheduleNew
