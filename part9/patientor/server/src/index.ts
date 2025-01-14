import express from 'express';
import cors from 'cors';
const app = express();

import { logger } from './utils/middleware';
import patientsRouter from './routes/patients';
import diagnosesRouter from './routes/diagnoses';

// Middleware
app.use(cors());
app.use(logger);

// Routes
app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnosesRouter);


const PORT: number = 3001;
app.listen(PORT, () => {
  console.log(`PORT is running on port ${PORT}`);
});
