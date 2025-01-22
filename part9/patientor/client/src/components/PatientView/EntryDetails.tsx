import { Typography, Button } from '@mui/material';
import DiagnosesCodes from './DiagnosesCodes';
import { Diagnosis, Patient } from '../../types';

interface Props {
  patient: Patient,
  diagnosis: Diagnosis[]
}

const entryCardStyle = {
  padding: '1rem',
  margin: '5px 0',
  border: '2px solid black',
  borderRadius: '5px'
};

const EntryDetails = ({ patient, diagnosis }: Props) => {
  return (
    <div style={{marginTop: '4rem'}}>
    { patient.entries.length > 0 
      ? <Typography variant='h4'>Entries</Typography> 
      : <Typography variant='h4'>No entries yet</Typography> 
    }
      <div>
        { patient.entries.map((entry) => (
          <div key={entry.id} style={entryCardStyle}>
            <Typography> {entry.date} - {entry.type} </Typography>
            { entry.type === 'OccupationalHealthcare' && <Typography> Employer: {entry.employerName} </Typography> }
            <Typography> {entry.description} </Typography>
            <Typography> Diagnosed by: {entry.specialist} </Typography>
            { entry.diagnosisCodes && <DiagnosesCodes diagnosis={diagnosis} codes={entry.diagnosisCodes}/> }
          </div>
          ))
        }
      </div>

    <Button variant="contained" color="primary">Add new entry</Button>
  </div>
  );
};

export default EntryDetails;