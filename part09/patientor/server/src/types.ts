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

export interface BaseEntry {
  id: string,
  date: string,
  specialist: string,
  description: string,
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  // type: EntryType.HealthCheck;
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  // type: EntryType.Hospital,
  type: 'Hospital',
  discharge?: {
    date: string;
    criteria: string;
  },
}

export interface OccupationalHealthCareEntry extends BaseEntry {
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

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

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

export type NonSensitivePatientsData =  Omit<Patients, 'ssn' | 'entries'>

export type NewPatient = Omit<Patients, 'id'> 
