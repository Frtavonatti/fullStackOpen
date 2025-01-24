import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const logger: express.RequestHandler = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Body:', req.body);
  console.log('Query:', req.query);
  console.log('---');
  next();
};

const app = express();
app.use(express.json());
app.use(logger);

// Types
interface ExerciseRequest {
  daily_exercises: number[];
  target: number;
}

// Routes
app.get('/bmi', (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);

  res.json({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req: Request, res: Response) => {
  const { daily_exercises, target } = req.body as ExerciseRequest;

  // PENDING: Add return statement so that the function stops executing if an error is found
  // Check for missing parameters
  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  }

  // Validate data types
  if (!Array.isArray(daily_exercises) || 
      daily_exercises.some(n => isNaN(Number(n))) || 
      isNaN(Number(target))) {
      res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, Number(target));
  res.json(result);
});


// Config
const port: number = Number(process.env.PORT) || 3002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});