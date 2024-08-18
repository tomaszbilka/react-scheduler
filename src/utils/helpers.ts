import type { TFirebaseData } from "./types";

export const normalizeData = (firebaseDate: TFirebaseData) => {
  return Object.keys(firebaseDate).map((appoitmentId) => ({
    ...firebaseDate[appoitmentId],
    id: appoitmentId,
  }));
};
