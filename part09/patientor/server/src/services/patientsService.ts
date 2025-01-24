import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import { 
  Patients, 
  NonSensitivePatientsData, 
  NewPatient, 
  EntryWithoutId, 
  Entry
} from "../types";

const getPatients = (): Patients[] => {
  return patients;
};

const getNonSensitivePatientsData = (): NonSensitivePatientsData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getIndividualPatient = (id: string): Patients | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patientEntry: NewPatient) => {
  const newPatient = {
    id:  uuid(),
    ...patientEntry
  };
  patients.push(newPatient);
  return newPatient;
};

const getEntries = (id: string): Entry[] => {
  const patient = patients.find((patient) => patient.id === id);
  return patient?.entries || [];
};

const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  const patient = patients.find((p) => p.id === patientId);
  const newEntry = {
    id: uuid(),
    ...entry
  };
  patient?.entries.push(newEntry);
  return newEntry;
};

export default { 
  getPatients, 
  getNonSensitivePatientsData, 
  getIndividualPatient, 
  addPatient, 
  getEntries,
  addEntry 
};
