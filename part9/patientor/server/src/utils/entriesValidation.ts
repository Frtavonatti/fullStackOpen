import { BaseEntry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthCareEntry,
  EntryWithoutId, 
  HealthCheckRating 
} from "../types";

const isString = (text: unknown): text is string =>  {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (value: unknown): string => {
  if (!isString(value)) {
    throw new Error(`Invalid or missing parameter: ${value}`);
  }
  return value;
};

const isHealthCheckRating = (param: unknown): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param as HealthCheckRating);
};

const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(value)) {
    throw new Error(`Invalid or missing parameter: ${value}`);
  }
  return value;
};

const parseDischarge = (discharge: unknown): { date: string; criteria: string } => {
  if (!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge)) {
    throw new Error('Invalid or missing discharge');
  }
  return {
    date: parseString(discharge.date),
    criteria: parseString(discharge.criteria)
  };
};

const parseSickLeave = (sickLeave: unknown): { startDate: string; endDate: string } => {
  if (!sickLeave || typeof sickLeave !== 'object' || !('startDate' in sickLeave) || !('endDate' in sickLeave)) {
    throw new Error('Invalid or missing sick leave');
  }
  return {
    startDate: parseString(sickLeave.startDate),
    endDate: parseString(sickLeave.endDate)
  };
};


const toNewBaseEntry = (object: any): Omit<BaseEntry, 'id'> => {
  const newEntry = {
    date: parseString(object.date),
    specialist: parseString(object.specialist),
    description: parseString(object.description),
  };
  return newEntry;
};

const toNewHealthCheckEntry = (object: any): Omit<HealthCheckEntry, 'id'> => {
  const newEntry = toNewBaseEntry(object);
  return {
    ...newEntry,
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    type: "HealthCheck" as const
  };
};

const toNewHospitalEntry = (object: any): Omit<HospitalEntry, 'id'> => {
  const newEntry = toNewBaseEntry(object);
  return {
    ...newEntry,
    discharge: object.discharge ? parseDischarge(object.discharge) : undefined,
    type: "Hospital" as const
  };
};

const toNewOccupationalHealthCareEntry = (object: any): Omit<OccupationalHealthCareEntry, 'id'> => {
  const newEntry = toNewBaseEntry(object);
  return {
    ...newEntry,
    employerName: parseString(object.employerName),
    sickLeave: object.sickLeave? parseSickLeave(object.sickLeave) : undefined,
    type: "OccupationalHealthcare" as const
  };
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error("Incorrect or missing data");
  };

  if('date' in object && 'specialist' in object && 'description' in object && 'type' in object) {
    try {
      switch (object.type) {
        case 'HealthCheck':
          return toNewHealthCheckEntry(object);
        case 'Hospital':
          return toNewHospitalEntry(object);
        case 'OccupationalHealthcare':
          return toNewOccupationalHealthCareEntry(object);
        default:
          throw new Error(`Unhandled entry type: ${object.type}`);
      }
    } catch (error) {
      throw new Error('Incorrect format in some field ' + error);
    }
  }
  throw new Error("Incorrect data: a field missing");  
};

export default toNewEntry;
