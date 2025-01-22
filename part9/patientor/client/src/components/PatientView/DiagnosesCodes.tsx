import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import diagnosisService from '../../services/diagnoses';
import { Diagnosis } from '../../types';

interface Props {
  codes: Array<Diagnosis['code']>
}

const DiagnosesCodes = ({ codes }: Props) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      const data = await diagnosisService.getAll();
      setDiagnosis(data);
    };
    void fetchDiagnosis();
  }, []);

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
