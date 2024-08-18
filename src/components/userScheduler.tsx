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
import { useState } from "react";
import { VIEW_NAME } from "../utils/constants";

function UserScheduler() {
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

  const commitChanges = ({ added, changed, deleted }: ChangeSet) => {
    setData((prev) => {
      let data = prev;

      if (added) {
        const startingAddedId =
          //@ts-expect-error added data cant be empty
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        //@ts-expect-error code works
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        console.log({ changed });
        data = data?.map((appointment) =>
          changed[appointment.id!]
            ? { ...appointment, ...changed[appointment.id!] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return data;
    });
  };

  return (
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
  );
}

export default UserScheduler;
