import { Divider, Typography } from '@mui/material';
import { Female, Male, Transgender } from '@mui/icons-material';
import { Patient } from '../../types';

interface Props {
  patient: Patient
}

const PatientInfo = ({ patient }: Props) => {
  const genderIcon = (gender: string) => {
    switch (gender) {
      case 'male':
        return <Male />;
      case 'female':
        return <Female />;
      case 'other':
        return <Transgender />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Typography variant='h3'>
        {patient.name}
        {genderIcon(patient.gender)}
      </Typography>
      <Typography>
        Date of Birth: {patient.dateOfBirth}
      </Typography>
      <Divider/>
      <Typography>
        Ssn: {patient.ssn}
      </Typography>
      <Typography>
        Occupation: {patient.occupation}
      </Typography>
    </div>
  );
};

export default PatientInfo;