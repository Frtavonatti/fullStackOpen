import express from 'express';
const app: express.Application = express();
import { multiplicator } from './multiplier';
import { calculator } from './calculator';

// Middleware
const logger = (_req: express.Request, _res: express.Response, next: express.NextFunction) => {
  console.log('Method:', _req.method);
  console.log('Path:', _req.path);
  console.log('Body:', _req.body);
  console.log('Query: ', _req.query);
  console.log('---');
  next();
}

app.use(express.json());
app.use(logger);

// Routes
app.get('/multiply', (req, res) => {
  const { value1, value2 } = req.query;
  if (!value1 || !value2) {
    res.status(400).send('missing parameters');
  }
  const result = multiplicator(Number(value1), Number(value2), 'Multiplied values are:');
  res.send(String(result));
});

app.get('/calculate', (req, res) => {
  const { value1, value2, op } = req.query;
  if (!value1 || !value2 || !op) {
    res.status(400).send('missing parameters');
  }
  const result: number = calculator(Number(value1), Number(value2), op as 'multiply' | 'add' | 'divide');
  res.send(String(result));
});

app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body; // Acá debería quejarse por no recibir un explicit any

  const result: number = calculator(value1, value2, op);
  res.send({ result });
});

// Config
const PORT: number = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});