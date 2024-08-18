import { DB_FOLDER } from "../utils/constants";
import { get, getDatabase, push, ref, set } from "firebase/database";
import { normalizeData } from "../utils/helpers";
import app from "../firebaseConfig";
import moment from "moment";

import type { AppointmentModel } from "@devexpress/dx-react-scheduler";

export const saveData = (
  data: Partial<AppointmentModel>,
  setIsLaoding: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const db = getDatabase(app);
  const newDataRef = push(ref(db, DB_FOLDER));

  const newAppoitment = {
    ...data,
    startDate: moment(data.startDate).format(),
    endDate: moment(data.endDate).format(),
  };

  set(newDataRef, newAppoitment)
    .then(() => alert("data saved!"))
    .catch((error) => alert("error: " + error?.message))
    .finally(() => setIsLaoding(false));
};

export const readData = async (
  setIsLaoding: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const db = getDatabase();
  const dataRef = ref(db, DB_FOLDER);
  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      setIsLaoding(false);
      return normalizeData(snapshot.val());
    } else {
      alert("error with fetching data");
      setIsLaoding(false);
    }
  } catch (error) {
    alert("error: " + error);
    setIsLaoding(false);
  }
};

export const updateData = (
  data: Partial<AppointmentModel>,
  setIsLaoding: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const db = getDatabase(app);
  const dataRef = ref(db, `${DB_FOLDER}/${data.id}`);

  const newAppoitment = {
    ...data,
    startDate: moment(data.startDate).format(),
    endDate: moment(data.endDate).format(),
  };

  set(dataRef, newAppoitment)
    .then(() => alert("data saved!"))
    .catch((error) => alert("error: " + error?.message))
    .finally(() => setIsLaoding(false));
};
