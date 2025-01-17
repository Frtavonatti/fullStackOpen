
import express from 'express';
const router = express.Router();

import services from '../services/patientsService';
import toNewPatient from '../utils/utils';

router.get('/', (_req, res) => {
  res.send(services.getNonSensitivePatiensData());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = services.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    console.log(error);
  }
});

export default router;
