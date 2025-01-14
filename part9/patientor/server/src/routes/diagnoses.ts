import express from 'express';
const router = express.Router();

import services from '../services/diagnosesService';

router.get('/', (_req, res) => {
  res.send(services.getDiagnoses());
});

export default router;
