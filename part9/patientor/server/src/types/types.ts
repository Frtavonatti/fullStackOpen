export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export type Gender = 'male' | 'female' | 'other';

export interface Patients {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string, // Pending: Change gender for type Gender
  occupation: string,
}

export type NonSensitivePatiensData =  Omit<Patients, 'ssn'>
