import React from "react";
import { render } from "react-dom";
import Paper from '@mui/material/Paper'
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  DayView,
  Toolbar,
  Appointments,
  DateNavigator,
  ViewSwitcher,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
//import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Box from "@mui/material/Box";

import { appointments } from "./data";

//const theme = createTheme({ palette: { type: "light", primary: blue } });

class WorkingScheduleNew extends React.Component {
  constructor(props:any) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: new Date(),
      currentView: "Week",
      range: this.getRange(new Date(), "Week"),
    };
  }
  render() {
    const { data, currentDate, currentView, range } = this.state;

    return (
      <Box>
        <Paper>
          <Scheduler height={500} data={data}>
            <ViewState
              currentDate={currentDate}
              currentView={currentView}
              onCurrentDateChange={this.currentDateChange}
              onCurrentViewNameChange={this.currentViewChange}
            />
            <WeekView startDayHour={9} endDayHour={19} name="Week" />
            <DayView />
            <Appointments />
            <Toolbar />
            <DateNavigator />
            <ViewSwitcher />
            <TodayButton />
          </Scheduler>
        </Paper>
      </Box>
    );
  }
  getRange = (date:any, view:any) => {
    if (view === "Day") {
      return { startDate: date, endDate: date };
    }
    if (view === "Week") {
      let firstDay = date.getDate() - date.getDay();
      let lastDay = firstDay + 6;
      return {
        startDate: new Date(date.setDate(firstDay)),
        endDate: new Date(date.setDate(lastDay)),
      };
    }
  };
  currentViewChange = (currentView:any) => {
    let currentDate = this.state.currentDate;
    let range = this.getRange(currentDate, currentView);
    this.setState({
      currentView,
      range,
    });
  };
  currentDateChange = (currentDate:any) => {
    console.log(currentDate);
    let currentView = this.state.currentView;
    let range = this.getRange(currentDate, currentView);
    this.setState({
      currentDate,
      range,
    });
  };
}

export default WorkingScheduleNew


