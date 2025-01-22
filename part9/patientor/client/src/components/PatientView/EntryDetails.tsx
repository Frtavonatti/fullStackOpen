import { Typography } from '@mui/material';
import DiagnosesCodes from './DiagnosesCodes';
import { Patient } from '../../types';

interface Props {
  patient: Patient
}

const EntryDetails = ({ patient }: Props) => {
  return (
    <div style={{marginTop: '4rem'}}>
    { patient.entries.length > 0 
      ? <Typography variant='h4'>Entries</Typography> 
      : <Typography variant='h4'>No entries yet</Typography> 
    }
      <ul>
        { patient.entries.map((entry) => (
          <li key={entry.id}>
            <Typography> {entry.date} - {entry.description} </Typography>
            { entry.diagnosisCodes && <DiagnosesCodes codes={entry.diagnosisCodes} /> }
          </li>
          ))
        }
      </ul>
  </div>
  );
};

export default EntryDetails;