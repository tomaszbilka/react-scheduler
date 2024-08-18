import { AppointmentModel, ChangeSet } from "@devexpress/dx-react-scheduler";

export type TFirebaseData = {
  [key: string]: AppointmentModel;
};

export type TCommitChanges = ChangeSet & {
  data: [] | AppointmentModel[];
  fetchData: () => Promise<void>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
