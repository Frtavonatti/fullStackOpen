import { useState, useEffect } from "react";
// import { useMatch } from "react-router-dom";
import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { Patient } from "./types";
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientView from "./components/PatientView";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);
  
  // const match = useMatch('/:id');
  // const patient = match
  // ? patients.find((p) => p.id === match.params.id)
  // : null;

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          <Route path="/:id" element={<PatientView/>} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
