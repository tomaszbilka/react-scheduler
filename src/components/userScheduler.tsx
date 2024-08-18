import { useEffect, useState } from "react";
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  DateNavigator,
  DayView,
  EditRecurrenceMenu,
  MonthView,
  Scheduler,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  AppointmentModel,
  EditingState,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import { Backdrop, CircularProgress } from "@mui/material";
import moment from "moment";
import Paper from "@mui/material/Paper";

import { commitChanges } from "../utils/helpers";
import { readData } from "../api/actions";
import { VIEW_NAME } from "../utils/constants";

function UserScheduler() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AppointmentModel[] | []>([]);
  const [addedAppointment, setAddedAppointment] = useState<
    Partial<AppointmentModel> | undefined
  >(undefined);
  const [appointmentChanges, setAppointmentChanges] = useState<
    Partial<AppointmentModel> | undefined
  >(undefined);
  const [editingAppointment, setEditingAppointment] = useState<
    Partial<AppointmentModel> | undefined
  >(undefined);
  const [currentViewName, setCurrentViewName] = useState<string>(
    VIEW_NAME.month
  );

  const fetchData = async () => {
    setIsLoading(true);
    const data = await readData(setIsLoading);
    setData(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <Paper>
        <Scheduler data={data} locale="pl">
          <ViewState
            currentViewName={currentViewName}
            defaultCurrentDate={moment().format()}
            onCurrentViewNameChange={(name) => setCurrentViewName(name)}
          />
          <EditingState
            onCommitChanges={(props) =>
              commitChanges({ ...props, setIsLoading, data, fetchData })
            }
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={(apointment) =>
              setAddedAppointment(apointment)
            }
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={(apointment) =>
              setAppointmentChanges(apointment)
            }
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={(apointment) =>
              setEditingAppointment(apointment)
            }
          />
          <WeekView displayName="Tydzień" endDayHour={19} startDayHour={8} />
          <MonthView displayName="Miesiąc" />
          <DayView displayName="Dzień" endDayHour={19} startDayHour={8} />
          <EditRecurrenceMenu />
          <ConfirmationDialog />
          <Toolbar />
          <DateNavigator />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    </>
  );
}

export default UserScheduler;
