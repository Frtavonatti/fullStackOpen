import express from 'express';
import cors from 'cors';
const app = express();

import diagnosesRouter from './routes/diagnoses';
import { logger } from './utils/middleware';

// Middleware
app.use(cors());
app.use(logger);

// Routes
app.use('/api/diagnoses', diagnosesRouter);

const PORT: number = 3001;
app.listen(PORT, () => {
  console.log(`PORT is running on port ${PORT}`);
});
