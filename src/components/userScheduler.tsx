import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  WeekView,
  Toolbar,
  ViewSwitcher,
  MonthView,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useState } from "react";
import { VIEW_NAME } from "../utils/constants";

const schedulerData = [
  {
    startDate: "2018-11-01T09:45",
    endDate: "2018-11-01T11:00",
    title: "Meeting",
  },
  {
    startDate: "2018-11-01T12:00",
    endDate: "2018-11-01T13:30",
    title: "Go to a gym",
  },
];

function UserScheduler() {
  const [data, setData] = useState(schedulerData);
  const [currentViewName, setCurrentViewName] = useState<string>(
    VIEW_NAME.month
  );

  return (
    <Paper>
      <Scheduler data={data}>
        <ViewState
          defaultCurrentDate="2018-07-25"
          currentViewName={currentViewName}
          onCurrentViewNameChange={(name) => setCurrentViewName(name)}
        />

        <WeekView startDayHour={10} endDayHour={19} />
        <MonthView />
        <DayView />

        <Toolbar />
        <ViewSwitcher />
        <Appointments />
      </Scheduler>
    </Paper>
  );
}

export default UserScheduler;
