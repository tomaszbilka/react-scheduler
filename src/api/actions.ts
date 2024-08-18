import { get, getDatabase, push, ref, remove, set } from "firebase/database";
import moment from "moment";

import { DB_FOLDER } from "../utils/constants";
import { normalizeData } from "../utils/helpers";
import app from "../firebaseConfig";

import type { AppointmentModel } from "@devexpress/dx-react-scheduler";

export const saveData = (
  data: Partial<AppointmentModel>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
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
    .finally(() => setIsLoading(false));
};

export const readData = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const db = getDatabase();
  const dataRef = ref(db, DB_FOLDER);
  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      setIsLoading(false);
      return normalizeData(snapshot.val());
    } else {
      alert("error with fetching data");
      setIsLoading(false);
    }
  } catch (error) {
    alert("error: " + error);
    setIsLoading(false);
  }
};

export const updateData = (
  data: Partial<AppointmentModel>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
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
    .finally(() => setIsLoading(false));
};

export const deleteData = async (
  id: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const db = getDatabase(app);
  const dataRef = ref(db, `${DB_FOLDER}/${id}`);
  try {
    await remove(dataRef);
    alert("data removed!");
    setIsLoading(false);
  } catch (error) {
    alert("error: " + error);
    setIsLoading(false);
  }
};
