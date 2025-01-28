import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import PatientInfo from './PatientInfo';
import EntryDetails from './EntryDetails';
import { Patient, Diagnosis } from '../../types';

import AddEntryForm from '../AddEntryModal';

const PatientView = () => {  
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const data = await patientService.getOne(id);
        setPatient(data);
      }
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      const data = await diagnosisService.getAll();
      setDiagnosis(data);
    };
    void fetchDiagnosis();
  }, []);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{marginTop: '4rem'}}>
      <PatientInfo patient={patient}/>
      <EntryDetails patient={patient} diagnosis={diagnosis}/>
      <AddEntryForm patient={patient} setPatient={setPatient}/>
    </div>
  );
};

export default PatientView;
