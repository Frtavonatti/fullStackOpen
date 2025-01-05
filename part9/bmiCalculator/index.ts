import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';

const logger: express.RequestHandler = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Body:', req.body);
  console.log('Query:', req.query);
  console.log('---');
  next();
}

app.use(logger);

// Routes
app.get('/hello', (_req: express.Request, res: express.Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: express.Request, res: express.Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight)

  res.json({
    weight,
    height,
    bmi,
  });
});

// Config
const port: number = Number(process.env.PORT) || 3002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});