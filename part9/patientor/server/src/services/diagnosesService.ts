import diagnosesData from '../data/diagnoses';
import { Diagnoses } from '../types/types';

const getDiagnoses = (): Diagnoses[] => {
  return diagnosesData;
};

export default { getDiagnoses };
