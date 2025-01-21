import { Divider, Typography } from '@mui/material';
import { Female, Male, Transgender } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import { Patient } from '../types';

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

const PatientView = () => {  
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const data = await patientService.getOne(id);
        setPatient(data);
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{marginTop: '4rem'}}>
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

        <div style={{marginTop: '4rem'}}>
          <Typography variant='h4'>Entries</Typography>
            <ul>
            {patient.entries.map((entry) => (
              <li key={entry.id}>
                <Typography>
                  {entry.date} - {entry.description}
                </Typography>

                <div>
                  <Typography>Diagnoses Codes:</Typography>
                    <ul>
                      { entry.diagnosisCodes && 
                      entry.diagnosisCodes.map((code, index) => <li key={index}>{code}</li> )
                      }
                    </ul>
                </div>
              </li>
            ))}
            </ul>
        </div>

    </div>
  );
};

export default PatientView;
