import express from 'express';
const router = express.Router();

import services from '../services/patientsService';

router.get('/', (_req, res) => {
  res.send(services.getNonSensitivePatiensData());
});

export default router;
