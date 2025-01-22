import { Typography } from '@mui/material';
import { Diagnosis } from '../../types';

interface Props {
  diagnoses: Array<Diagnosis['code']>
}

const DiagnosesCodes = ({ diagnoses }: Props) => {
  return (
    <div>
      <Typography>Diagnoses Codes:</Typography>
        <ul>
          {diagnoses.map((code, index) => <li key={index}>{code}</li>)}
        </ul>
    </div>
  );
};

export default DiagnosesCodes;
