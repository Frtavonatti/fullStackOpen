import express from 'express';
import diaryRouter from './routes/diaries';
import { logger } from './utils/middleware';
const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/diaries', diaryRouter);

const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});