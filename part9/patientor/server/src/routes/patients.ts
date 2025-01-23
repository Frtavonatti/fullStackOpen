import express from 'express';
const router = express.Router();
import services from '../services/patientsService';
import toNewPatient from '../utils/patientValidation';
import toNewEntry from '../utils/entriesValidation';

router.get('/', (_req, res) => {
  res.send(services.getNonSensitivePatientsData());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(services.getIndividualPatient(id));
});

// TO-DO: Structure error handling
router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = services.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id/entries', (req, res) => {
  const id = req.params.id;
  const entries = services.getEntries(id);
  res.json(entries);
});

// TO-DO: Structure error handling
router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = services.addEntry(newEntry, id);
    res.json(addedEntry);
  } catch (error) {
    console.log(error);
  }
});

export default router;
