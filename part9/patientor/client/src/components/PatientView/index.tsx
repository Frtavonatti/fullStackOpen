import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import PatientInfo from './PatientInfo';
import EntryDetails from './EntryDetails';
import { Patient } from '../../types';

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
      <PatientInfo patient={patient}/>
      <EntryDetails patient={patient}/>
    </div>
  );
};

export default PatientView;
