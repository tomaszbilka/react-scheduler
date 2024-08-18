import type { TCommitChanges, TFirebaseData } from "./types";
import { deleteData, saveData, updateData } from "../api/actions";

export const normalizeData = (firebaseDate: TFirebaseData) => {
  return Object.keys(firebaseDate).map((appoitmentId) => ({
    ...firebaseDate[appoitmentId],
    startDate: new Date(firebaseDate[appoitmentId].startDate!),
    endDate: new Date(firebaseDate[appoitmentId].endDate!),
    id: appoitmentId,
  }));
};

export const commitChanges = async ({
  added,
  changed,
  deleted,
  setIsLoading,
  data,
  fetchData,
}: TCommitChanges) => {
  if (added) {
    saveData(added, setIsLoading);
  }
  if (changed) {
    const changedId = Object.keys(changed)[0];
    const appoitmentToUpdate = data.find((el) => el.id === changedId);
    const updates = Object.values(changed)[0];
    updateData({ ...appoitmentToUpdate, ...updates }, setIsLoading);
  }
  if (deleted !== undefined) {
    deleteData(`${deleted}`, setIsLoading);
  }
  fetchData();
};
