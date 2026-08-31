import express from 'express';
import './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
});
