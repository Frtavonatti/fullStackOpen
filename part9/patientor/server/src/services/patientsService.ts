import { Patients, NonSensitivePatiensData } from "../types/types";
import patients from "../data/patients";

const getPatients = (): Patients[] => {
  return patients;
};

const getNonSensitivePatiensData = (): NonSensitivePatiensData[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getPatients, getNonSensitivePatiensData };
