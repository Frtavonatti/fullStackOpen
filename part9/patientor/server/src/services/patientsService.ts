import { v1 as uuid } from "uuid";
import { Patients, NonSensitivePatiensData, NewPatient } from "../types";
import patients from "../../data/patients";

const getPatients = (): Patients[] => {
  return patients;
};

const getNonSensitivePatiensData = (): NonSensitivePatiensData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patientEntry: NewPatient) => {
  const newPatient = {
    id:  uuid(),
    ...patientEntry
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensitivePatiensData, addPatient };
