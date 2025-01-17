/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const router = express.Router();

import services from '../services/patientsService';

router.get('/', (_req, res) => {
  res.send(services.getNonSensitivePatiensData());
});

router.post('/', (req, res) => {
  const {name, dateOfBirth, ssn, gender, occupation} = req.body;
  const addedPatient = services.addPatient({
    name, 
    dateOfBirth,
    ssn,
    gender, 
    occupation
  });
  res.json(addedPatient);
});

export default router;
