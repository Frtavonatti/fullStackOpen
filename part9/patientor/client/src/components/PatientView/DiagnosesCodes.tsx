import { Typography } from '@mui/material';
import { Diagnosis } from '../../types';

interface Props {
  diagnosis: Diagnosis[],
  codes: Array<Diagnosis['code']>
}

const DiagnosesCodes = ({ diagnosis, codes }: Props) => {
  const findDiagnosisName = (code: Diagnosis['code']): Diagnosis['name'] | undefined => {
    if (diagnosis) {
      const diagnosisName = diagnosis.find((d: Diagnosis) => d.code === code);
      return diagnosisName?.name;
    }
  };
  
  return (
    <div>
      <Typography>Diagnoses Codes:</Typography>
        <ul>
          {codes.map((code, index) => 
            <li key={index}>{code}: {findDiagnosisName(code)}</li>)
          }
        </ul>
    </div>
  );
};

export default DiagnosesCodes;
