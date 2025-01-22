import { Typography, Button } from '@mui/material';
import { MonitorHeart, LocalHospital, Work } from '@mui/icons-material';
import DiagnosesCodes from './DiagnosesCodes';
import { Diagnosis, Patient, Entry } from '../../types';

interface Props {
  patient: Patient,
  diagnosis: Diagnosis[]
}

const getEntryTypeIcon = (entry: Entry) => {
  switch(entry.type) {
    case 'HealthCheck': 
      return <MonitorHeart/>;
    case 'Hospital': 
      return <LocalHospital/>;
    case 'OccupationalHealthcare':
      return <Work/>;
    default:
      return null; 
  }
};

const entryCardStyle = {
  padding: '1rem',
  margin: '5px 0',
  border: '2px solid black',
  borderRadius: '5px'
};

const EntryDetails: React.FC<Props> = ({ patient, diagnosis }) => {
  return (
    <div style={{marginTop: '4rem'}}>
    { patient.entries.length > 0 
      ? <Typography variant='h4'>Entries</Typography> 
      : <Typography variant='h4'>No entries yet</Typography> 
    }
      <div>
        { patient.entries.map((entry) => (
          <div key={entry.id} style={entryCardStyle}>
            <Typography> {entry.date} - {entry.type} {getEntryTypeIcon(entry)} </Typography>
            { entry.type === 'OccupationalHealthcare' && <Typography> Employer: {entry.employerName} </Typography> }
            <Typography> {entry.description} </Typography>
            <Typography> Diagnosed by: {entry.specialist} </Typography>
            { entry.diagnosisCodes && <DiagnosesCodes diagnosis={diagnosis} codes={entry.diagnosisCodes}/> }
          </div>
        ))}
      </div>
      <Button variant="contained" color="primary">Add new entry</Button>
    </div>
  );
};

export default EntryDetails;