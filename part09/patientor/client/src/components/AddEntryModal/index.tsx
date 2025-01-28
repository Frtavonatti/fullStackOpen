import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import patientsService from "../../services/patients";
import AddEntryModal from "./AddEntryModal";
import { EntryWithoutId, Patient } from "../../types";

const initialHealthCheckState: EntryWithoutId = {
  type: "HealthCheck",
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: [],
  healthCheckRating: 0
};

const initialHospitalState: EntryWithoutId = {
  type: "Hospital",
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: [],
  discharge: {
    date: '',
    criteria: ''
  }
};

const initialOccupationalHealthcareState: EntryWithoutId = {
  type: "OccupationalHealthcare",
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: [],
  employerName: '',
  sickLeave: {
    startDate: '',
    endDate: ''
  }
};

interface AddEntryFormProps {
  patient: Patient,
  setPatient: React.Dispatch<React.SetStateAction<Patient | null >>
}

const AddEntryForm = ({ patient, setPatient }: AddEntryFormProps) => {
  const [formState, setFormState] = useState(initialHealthCheckState);
  const [entryType, setEntryType] = useState('HealthCheck');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;

    if (typeof name === 'string') {
      if (name === 'healthCheckRating') {
        setFormState({
          ...formState,
          [name]: Number(value)
        });
      } else {
        setFormState({
          ...formState,
          [name]: value
        });
      }
    }
  };

  const handleEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEntryType(value);

    switch(value) {
      case 'Hospital':
        setFormState(initialHospitalState);
        break;
      case 'OccupationalHealthcare':
        setFormState(initialOccupationalHealthcareState);
        break;
        case 'HealthCheck':
        default:
          setFormState(initialHealthCheckState);
          break;
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setFormState({
      ...formState,
      diagnosisCodes: typeof value === 'string' ? value.split(',') : value
    });
  };

  const handleSubmit = async (event: React.SyntheticEvent) =>  {
    event.preventDefault();
    setErrorMessage(null);
    
    try {
      const newEntry = await patientsService.addEntry(formState, patient.id);
      if (newEntry.error) {
        setErrorMessage(newEntry.error);
      } else {
        setPatient({
          ...patient,
          entries: patient.entries.concat(newEntry)
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormState(initialHealthCheckState);
    }
  };

  const formStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    margin: '2rem',
    width: '60%'
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      {errorMessage && <h3 style={{color: 'red'}}>{errorMessage}</h3>}
      <AddEntryModal 
        formState={formState} 
        entryType={entryType}
        handleChange={handleChange} 
        handleSelectChange={handleSelectChange}
        handleEntryChange= {handleEntryChange}
      />
    </form>
  );
};

export default AddEntryForm;
