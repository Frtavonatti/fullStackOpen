import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import patientsService from "../../services/patients";
import AddEntryModal from "./AddEntryModal";
import { HealthCheckEntry, Patient } from "../../types";

const initialState: Omit<HealthCheckEntry, 'id'> = {
  description: '',
  date: '',
  specialist: '',
  type: "HealthCheck" as const,
  healthCheckRating: 0,
  diagnosisCodes: [] as string[]
};

interface AddEntryFormProps {
  patient: Patient,
  setPatient: React.Dispatch<React.SetStateAction<Patient | null >>
}

const AddEntryForm = ({ patient, setPatient }: AddEntryFormProps) => {
  const [formState, setFormState] = useState(initialState);
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

  // Fix: Ensure diagnosisCodes are included in the formState
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
    console.log('FRONTEND REQUEST', formState); // Delete log
    
    try {
      const newEntry = await patientsService.addEntry(formState, patient.id);
      if (newEntry.error) {
        setErrorMessage(newEntry.error);
      } else {
        console.log('BACKEND RESPONSE', newEntry); // Delete log
        
        setPatient({
          ...patient,
          entries: patient.entries.concat(newEntry)
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormState(initialState);
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
      <AddEntryModal formState={formState} handleChange={handleChange} handleSelectChange={handleSelectChange}/>
    </form>
  );
};

export default AddEntryForm;
