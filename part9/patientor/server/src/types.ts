// Diagnosis
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

//Entries
// export enum EntryType {
//   Hospital = 'Hospital',
//   HealthCheck = 'HealthCheck',
//   Occupational = 'OccupationalHealthcare'
// }

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string,
  date: string,
  specialist: string,
  description: string,
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  // type: EntryType.HealthCheck;
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  // type: EntryType.Hospital,
  type: 'Hospital',
  discharge?: {
    date: string;
    criteria: string;
  },
}

interface OccupationalHealthCareEntry extends BaseEntry {
  // type: EntryType.Occupational,
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

// Patients
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other' 
}

export interface Patients {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]  
}

export type NonSensitivePatiensData =  Omit<Patients, 'ssn' | 'entries'>

export type NewPatient = Omit<Patients, 'id'> 
