import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

const server = 3001;
app.listen(server, () => {
  console.log(`Server is running on http://localhost:${server}`);
});
