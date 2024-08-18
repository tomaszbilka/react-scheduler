import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  ChangeSet,
  AppointmentModel,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  WeekView,
  Toolbar,
  ViewSwitcher,
  MonthView,
  AppointmentTooltip,
  ConfirmationDialog,
  AppointmentForm,
  EditRecurrenceMenu,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useEffect, useState } from "react";
import { VIEW_NAME } from "../utils/constants";
import { Backdrop, CircularProgress } from "@mui/material";
import { deleteData, readData, saveData, updateData } from "../api/actions";

function UserScheduler() {
  const [isLoading, setIsLaoding] = useState(false);
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
    setIsLaoding(true);
    const data = await readData(setIsLaoding);
    setData(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const commitChanges = async ({ added, changed, deleted }: ChangeSet) => {
    if (added) {
      saveData(added, setIsLaoding);
    }
    if (changed) {
      const changedId = Object.keys(changed)[0];
      const appoitmentToUpdate = data.find((el) => el.id === changedId);
      const updates = Object.values(changed)[0];
      updateData({ ...appoitmentToUpdate, ...updates }, setIsLaoding);
    }
    if (deleted !== undefined) {
      deleteData(`${deleted}`, setIsLaoding);
    }
    fetchData();
  };

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
            defaultCurrentDate="2018-07-25"
            onCurrentViewNameChange={(name) => setCurrentViewName(name)}
          />
          <EditingState
            onCommitChanges={commitChanges}
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
          <WeekView displayName="Tydzień" endDayHour={19} startDayHour={10} />
          <MonthView displayName="Miesiąc" />
          <DayView displayName="Dzień" />
          <EditRecurrenceMenu />
          <ConfirmationDialog />
          <Toolbar />
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
