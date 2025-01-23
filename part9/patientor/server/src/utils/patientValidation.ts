import { NewPatient, Gender } from "../types";

const isString = (text: unknown): text is string =>  {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (value: unknown): string => {
  if (!isString(value)) {
    throw new Error(`Invalid or missing parameter: ${value}`);
  }
  return value;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Invalid type" + gender);
  };
  return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error("Incorrect or missing data");
  };

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    try {
      const newPatient: NewPatient =  {
        name: parseString(object.name),
        dateOfBirth: parseString(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: []
      };
      return newPatient;
    } catch (error) {
      throw new Error('Invalid patient data' + error);
    }
  }
  throw new Error("Incorrect data: a field missing");
};

export default toNewPatient;
